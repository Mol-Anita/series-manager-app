"use client";

import { useEffect, useState } from "react";
import SeriesForm from "./SeriesForm";
import { updateSeriesById, getSeriesById } from "../../lib/services/seriesService";

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
    Id: seriesId,
    Title: selectedSeries.Title,
    Genres: selectedSeries.Genres.join(", "),
    Description: selectedSeries.Description,
    ImagePath: "",
    TotalSeasons: selectedSeries.TotalSeasons,
    Status: selectedSeries.Status,
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
