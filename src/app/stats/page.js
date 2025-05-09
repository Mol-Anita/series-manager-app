"use client";

import { useEffect, useState } from "react";
import GenreChart from "../../components/stats/GenreChart";
import { websocketService } from "@/lib/services/websocketService";

const Stats = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        setError(null);
        await websocketService.connect();
        websocketService.onEntitiesReceived((entities) => {
          setData(entities);
        });
        await websocketService.getAllEntities();
      } catch (err) {
        setError('Failed to connect to the server. Please make sure the backend is running.');
        console.error('Connection error:', err);
      }
    };

    initializeWebSocket();

    return () => {
      websocketService.disconnect();
    };
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#ff4d4d20",
          border: "1px solid #ff4d4d",
          borderRadius: "8px",
          color: "#ff4d4d",
          margin: "16px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div>
      {data.length > 0 ? (
        <GenreChart data={data} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default Stats;
