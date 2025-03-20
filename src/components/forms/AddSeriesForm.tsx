"use client";

import SeriesForm from "./SeriesForm";
import { saveSeries } from "@/api/series";

const AddSeriesForm = () => {
  const defaultValues = {
    title: "",
    genre: "",
    description: "",
    image: "",
    totalSeasons: "",
    status: "Currently Watching",
  };

  return <SeriesForm title="Add series" apiCall={saveSeries} defaultValues={defaultValues} isEditForm={false}/>;
};

export default AddSeriesForm;
