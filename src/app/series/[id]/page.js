"use client"

import SeriesTable from "../../../components/SeriesTable";
import { useParams } from "next/navigation";

const SeriesPage = () => {
    const {id} = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Series Info</h1>
      <SeriesTable seriesId={id} />
    </div>
  );
};

export default SeriesPage;
