"use client";

import { useEffect, useState } from "react";
import GenreChart from "../../components/stats/GenreChart";
import { getGenreData } from "../../api/series";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreData = await getGenreData();
        setData(genreData);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }
    };

    fetchData();
  }, []);

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
