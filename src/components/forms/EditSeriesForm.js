"use client";

import { useEffect, useState } from "react";
import SeriesForm from "./SeriesForm";
import { updateSeriesById, getSeriesById } from "../../lib/api/apiCallingFunctions";

const EditSeriesForm = ({ seriesId }) => {
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    if (!seriesId) return; 
    
    const fetchSeries = async () => {
      const data = await getSeriesById(seriesId);
      setSelectedSeries(data);
    };

    fetchSeries();
  }, [seriesId]);

  if (!selectedSeries) {
    return <p className="text-white">Loading...</p>;
  }

  const defaultValues = {
    title: selectedSeries.title,
    genre: selectedSeries.genre.join(", "),
    description: selectedSeries.description,
    image: "",
    totalSeasons: selectedSeries.totalSeasons,
    status: selectedSeries.status,
  };

  return (
    <SeriesForm
      title="Edit series"
      apiCall={updateSeriesById}
      defaultValues={defaultValues}
      isEditForm={true}
      id={seriesId}
    />
  );
};

export default EditSeriesForm;
