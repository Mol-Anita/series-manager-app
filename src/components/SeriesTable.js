"use client";

import Image from "next/image";

const SeriesTable = ({ series }) => {
  if (!series) return null;

  const imageUrl = series.ImagePath
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/seriesCoverImages/${series.ImagePath}`
    : "/images/mockup.jpg";

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
          <tr key={series.Id} className="border-b border-neutral-700">
            <td className="p-3">
              <div className="flex justify-center">
                <Image
                  src={imageUrl}
                  alt={series.Title}
                  width={100}
                  height={150}
                  className="object-cover rounded-lg"
                />
              </div>
            </td>
            <td className="p-3">{series.Title}</td>
            <td className="p-3">{series.Genres?.join(", ")}</td>
            <td className="p-3">{series.TotalSeasons}</td>
            <td className="p-3">{series.Description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SeriesTable;
