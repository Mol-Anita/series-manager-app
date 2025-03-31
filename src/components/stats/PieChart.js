"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { updateChartDataAsync } from "@/api/series";

const RealTimeChart = ({ statData }) => {
  const [data, setData] = useState(statData || []);
  const [isUpdating, setIsUpdating] = useState(true); 

  const handleUpdate = async () => {
    const newData = await updateChartDataAsync(data);
    setData(newData);
  };

  useEffect(() => {
    let isMounted = true;
    let interval = null;

    const updateChart = async () => {
      if (!isUpdating) return; 
      await handleUpdate(); 
    };

    if (isUpdating) {
      updateChart(); 
      interval = setInterval(updateChart, 3000);
    }

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [isUpdating, data]);

  const toggleUpdate = () => {
    setIsUpdating((prev) => !prev); 
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
      <button
        onClick={toggleUpdate}
        style={{
          marginBottom: "10px",
          padding: "8px 15px",
          backgroundColor: isUpdating ? "#ff4d4d" : "#4caf50",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isUpdating ? "Stop Updates" : "Start Updates"}
      </button>

      <ReactECharts option={option} style={{ height: "600px", width: "1000px" }} />
    </div>
  );
};

export default RealTimeChart;
