"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { websocketService } from "@/lib/services/websocketService";

const RealTimeChart = ({ statData }) => {
  const [data, setData] = useState(statData || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [error, setError] = useState(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        setError(null);
        await websocketService.connect();
        websocketService.onEntitiesReceived((entities) => {
          setData(entities);
        });
        setConnectionStatus(websocketService.getConnectionState());
      } catch (err) {
        setError('Failed to connect to the server. Please make sure the backend is running.');
        console.error('Connection error:', err);
      }
    };

    connectWebSocket();

    // Check connection status periodically
    const statusInterval = setInterval(() => {
      setConnectionStatus(websocketService.getConnectionState());
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      websocketService.disconnect();
    };
  }, []);

  const toggleUpdate = async () => {
    try {
      setError(null);
      setIsUpdating((prev) => {
        if (!prev) {
          websocketService.startGeneration();
        } else {
          websocketService.stopGeneration();
        }
        return !prev;
      });
    } catch (err) {
      setError('Failed to toggle updates. Please check your connection.');
      console.error('Toggle error:', err);
    }
  };

  const option = {
    backgroundColor: "#1e1e1e",
    title: {
      text: "Real-time Genre Distribution",
      left: "center",
      textStyle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "#ffffff",
      },
      data: data.map((item) => item.name),
    },
    series: [
      {
        name: "Genre",
        type: "pie",
        radius: "60%",
        data: data,
        left: "center",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          color: "#ffffff",
          fontSize: 14,
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={toggleUpdate}
            disabled={connectionStatus !== 'Connected'}
            style={{
              padding: "8px 15px",
              backgroundColor: isUpdating ? "#ff4d4d" : "#4caf50",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: connectionStatus === 'Connected' ? "pointer" : "not-allowed",
              opacity: connectionStatus === 'Connected' ? 1 : 0.6,
            }}
          >
            {isUpdating ? "Stop Updates" : "Start Updates"}
          </button>
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: connectionStatus === 'Connected' ? "#4caf50" : "#ff4d4d",
              color: "#ffffff",
              fontSize: "0.875rem",
            }}
          >
            {connectionStatus}
          </span>
        </div>
        {error && (
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "#ff4d4d20",
              border: "1px solid #ff4d4d",
              borderRadius: "4px",
              color: "#ff4d4d",
              fontSize: "0.875rem",
              marginBottom: "8px",
            }}
          >
            {error}
          </div>
        )}
      </div>

      <ReactECharts option={option} style={{ height: "600px", width: "1000px" }} />
    </div>
  );
};

export default RealTimeChart;
