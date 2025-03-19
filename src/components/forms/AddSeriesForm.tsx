"use client";

import { Genre } from "@/types/genre";
import { SeriesStatus } from "@/types/seriesStatus";
import { useForm, SubmitHandler } from "react-hook-form";
import SeriesForm from "./SeriesForm";
import { saveSeries } from "@/api/series"

type Inputs = {
  id: number;
  genre: string;
  title: string;
  description: string;
  image: string;
  totalSeasons: number;
  status: SeriesStatus;
};

const AddSeriesForm = () => {
  

  return (
    <SeriesForm
      title="Add series"
      apiCall={saveSeries}
    />
  );
};

export default AddSeriesForm;
