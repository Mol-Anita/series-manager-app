import { HubConnectionBuilder, HubConnection, LogLevel, HttpTransportType } from '@microsoft/signalr';

class WebSocketService {
  private static instance: WebSocketService;
  private connection: HubConnection | null = null;
  private isConnecting: boolean = false;
  private connectionPromise: Promise<void> | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private eventHandlers: Map<string, ((data: any) => void)[]> = new Map();
  private connectionState: 'Connected' | 'Disconnected' | 'Connecting' = 'Disconnected';

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public getConnectionState(): string {
    return this.connectionState;
  }

  async connect() {
    if (this.connection?.state === 'Connected') {
      return Promise.resolve();
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    try {
      this.connectionState = 'Connecting';
      this.isConnecting = true;
      
      const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/seriesHub', {
          transport: HttpTransportType.WebSockets,
          timeout: 30000 // 30 second timeout
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // First retry immediately, then exponential backoff
            if (retryContext.previousRetryCount === 0) {
              return 0;
            }
            const delay = Math.min(1000 * Math.pow(2, retryContext.previousRetryCount - 1), 30000);
            return delay;
          }
        })
        .configureLogging(LogLevel.Information)
        .build();

      // Set up connection lifecycle handlers
      connection.onclose((error) => {
        console.log('Connection closed:', error);
        this.connectionState = 'Disconnected';
        this.handleDisconnect();
      });

      connection.onreconnecting((error) => {
        console.log('Attempting to reconnect:', error);
        this.connectionState = 'Connecting';
      });

      connection.onreconnected((connectionId) => {
        console.log('Reconnected with connection ID:', connectionId);
        this.connectionState = 'Connected';
        this.resubscribeHandlers();
      });

      // Start the connection
      this.connectionPromise = connection.start().then(() => {
        this.connection = connection;
        this.isConnecting = false;
        this.connectionState = 'Connected';
        console.log('Connected to SignalR Hub');
        this.resubscribeHandlers();
      });

      await this.connectionPromise;
      return this.connectionPromise;
    } catch (error) {
      console.error('Error connecting to SignalR Hub:', error);
      this.connectionState = 'Disconnected';
      this.handleDisconnect();
      throw error;
    } finally {
      this.connectionPromise = null;
      this.isConnecting = false;
    }
  }

  private handleDisconnect() {
    this.connection = null;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimer = setTimeout(() => {
      this.connect().catch(console.error);
    }, 2000);
  }

  private resubscribeHandlers() {
    if (!this.connection) return;

    // Resubscribe all event handlers
    this.eventHandlers.forEach((handlers, event) => {
      handlers.forEach(handler => {
        this.connection!.on(event, handler);
      });
    });
  }

  public on(event: string, handler: (data: any) => void) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);

    if (this.connection && this.connection.state === 'Connected') {
      this.connection.on(event, handler);
    }
  }

  public off(event: string, handler: (data: any) => void) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
      if (this.connection) {
        this.connection.off(event, handler);
      }
    }
  }

  async disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.connection) {
      try {
        await this.connection.stop();
        this.connection = null;
        this.connectionState = 'Disconnected';
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
    }
  }

  async invoke(method: string, ...args: any[]) {
    if (!this.connection || this.connection.state !== 'Connected') {
      await this.connect();
    }
    return this.connection!.invoke(method, ...args);
  }

  async startGeneration() {
    try {
      if (!this.connection || this.connection.state !== 'Connected') {
        await this.connect();
      }
      await this.connection?.invoke('StartGeneration');
    } catch (error) {
      console.error('Error starting generation:', error);
      throw error;
    }
  }

  async stopGeneration() {
    try {
      if (!this.connection || this.connection.state !== 'Connected') {
        await this.connect();
      }
      await this.connection?.invoke('StopGeneration');
    } catch (error) {
      console.error('Error stopping generation:', error);
      throw error;
    }
  }

  onEntitiesReceived(callback: (entities: any[]) => void) {
    const event = 'ReceiveAllEntities';
    
    // Store the handler
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(callback);

    // If we have a connection, subscribe immediately
    if (this.connection) {
      this.connection.on(event, callback);
    }

    // Return unsubscribe function
    return () => {
      const handlers = this.eventHandlers.get(event);
      if (handlers) {
        const index = handlers.indexOf(callback);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
      this.connection?.off(event, callback);
    };
  }

  async getAllEntities() {
    try {
      if (!this.connection || this.connection.state !== 'Connected') {
        await this.connect();
      }
      await this.connection?.invoke('GetAllEntities');
    } catch (error) {
      console.error('Error getting all entities:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const websocketService = WebSocketService.getInstance(); 