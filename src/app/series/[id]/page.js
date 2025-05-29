"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSeriesById } from "../../../lib/services/seriesService";
import SeriesTable from "../../../components/SeriesTable";

const SeriesPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const data = await getSeriesById(id);
        setSeries(data);
      } catch (err) {
        setError("Failed to fetch series data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSeriesData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Series Info</h1>
      <SeriesTable series={series} />
    </div>
  );
};

export default SeriesPage;
