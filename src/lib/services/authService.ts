import { AuthFormData } from "@/types/AuthFormTypes";
import axiosInstance from '../axios';

interface AuthResponse {
  Token: string;
  RefreshToken: string | null;
  User: {
    Id: number;
    Username: string;
    Email: string;
    IsTwoFactorEnabled: boolean;
  };
  RequiresTwoFactor?: boolean;
}

interface TwoFactorSetupResponse {
  Secret: string;
  QrCodeUrl: string;
}

const updateAuthState = (data: AuthResponse) => {
  localStorage.setItem("accessToken", data.Token);
  localStorage.setItem("refreshToken", data.RefreshToken || '');
  localStorage.setItem("tokenExpiry", ''); // This will be handled by the backend
  localStorage.setItem("username", data.User.Username);
  localStorage.setItem("email", data.User.Email);
};

export const loginUser = async (data: { Email: string; Password: string }): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/login', data);
    const result = response.data;
    
    console.log('Login response:', result);
    
    // Validate the response data
    if (!result || (typeof result !== 'object')) {
      console.error('Invalid response structure:', result);
      throw new Error('Invalid response from server');
    }

    // If 2FA is required, we should have a token
    if (result.RequiresTwoFactor && !result.Token) {
      console.error('2FA required but no token:', result);
      throw new Error('2FA is required but no temporary token was provided');
    }

    // Only update auth state if 2FA is not required
    if (!result.RequiresTwoFactor) {
      if (!result.Token || !result.User) {
        console.error('Missing required data:', { 
          hasToken: !!result.Token, 
          hasUser: !!result.User,
          response: result 
        });
        throw new Error('Invalid login response: missing required data');
      }
      updateAuthState(result);
    }
    
    return result;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid email or password');
    }
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async (data: AuthFormData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/register', data);
    const result = response.data;
    updateAuthState(result);
    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axiosInstance.post<AuthResponse>('/api/auth/refresh-token', { refreshToken });
    const result = response.data;
    updateAuthState(result);
    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Token refresh failed');
  }
};

export const logoutUser = () => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const expiry = localStorage.getItem("tokenExpiry");
  if (!token || !expiry) return false;
  
  return new Date(expiry) > new Date();
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

export const verify2FA = async (tempToken: string, code: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/verify-2fa', {
      tempToken,
      code
    });
    const result = response.data;
    updateAuthState(result);
    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || '2FA verification failed');
  }
};

export const setup2FA = async (): Promise<TwoFactorSetupResponse> => {
  try {
    const response = await axiosInstance.post<TwoFactorSetupResponse>('/api/auth/setup-2fa');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || '2FA setup failed');
  }
};

export const enable2FA = async (code: string): Promise<void> => {
  try {
    console.log('Sending enable2FA request with code:', code);
    const response = await axiosInstance.post('/api/auth/enable-2fa', { Code: code });
    console.log('Enable2FA response:', response.data);
  } catch (error: any) {
    console.error('Enable2FA error:', error.response?.data || error);
    throw new Error(error.response?.data?.error || 'Failed to enable 2FA');
  }
};

export const disable2FA = async (password: string): Promise<void> => {
  try {
    await axiosInstance.post('/api/auth/disable-2fa', { password });
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to disable 2FA');
  }
};

export const get2FAStatus = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get<{ IsEnabled: boolean }>('/api/auth/2fa-status');
    console.log('2FA status response:', response.data);
    return response.data.IsEnabled;
  } catch (error: any) {
    console.error('Failed to get 2FA status:', error);
    throw new Error(error.response?.data?.error || 'Failed to get 2FA status');
  }
};
