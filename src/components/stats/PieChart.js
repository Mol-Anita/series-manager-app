"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { updateChartDataAsync } from "@/api/series";

const RealTimeChart = ({ statData }) => {
  const [data, setData] = useState(statData || []);

  useEffect(() => {
    let isMounted = true;

    const updateChart = async () => {
      const newData = await updateChartDataAsync(data);
      if (isMounted) {
        setData(newData);
      }
    };

    updateChart();

    const interval = setInterval(() => {
      updateChart();
    }, 3000); 

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [data]); 

  const option = {
    backgroundColor: "#1e1e1e",
    title: {
      text: "Real-time Genre Distribution",
      left: "center",
      textStyle: {
        color: "#ffffff", 
        fontSize: 18,
        fontWeight: "bold",
      }
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

  return <ReactECharts option={option} style={{height: "600px", width: "1000px"}}/>;
};

export default RealTimeChart;