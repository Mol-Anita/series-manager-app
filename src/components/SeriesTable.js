"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSeriesById } from "@/api/series";

const SeriesTable = ({ seriesId }) => {
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const data = await getSeriesById(seriesId);
        setSeries(data);
      } catch (error) {
        setError("Failed to fetch series data");
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, [seriesId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-neutral-900 text-white rounded-lg">
        <thead>
          <tr className="border-b border-neutral-700">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Genres</th>
            <th className="p-3 text-left">Seasons</th>
            <th className="p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {series && (
            <tr key={series.id} className="border-b border-neutral-700">
              <td className="p-3">
                <div className="flex justify-center">
                  <Image
                    src={series.img}
                    alt={series.title}
                    width={100}
                    height={150}
                    className="object-cover rounded-lg"
                  />
                </div>
              </td>
              <td className="p-3">{series.title}</td>
              <td className="p-3">{series.genre.join(", ")}</td>
              <td className="p-3">{series.totalSeasons}</td>
              <td className="p-3">{series.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SeriesTable;
