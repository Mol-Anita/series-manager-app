"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SeriesForm from "./SeriesForm";
import { saveSeries } from "@/lib/services/seriesService";

const AddSeriesForm = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const defaultValues = {
    Title: "",
    Genres: "",
    Description: "",
    ImagePath: "",
    TotalSeasons: "",
    Status: "Currently Watching",
  };

  const handleSaveSuccess = () => {
    router.push('/my-series');
  };

  const handleSaveError = (error: string) => {
    console.error('Failed to save series:', error);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <SeriesForm 
      title="Add series" 
      apiCall={saveSeries} 
      defaultValues={defaultValues} 
      isEditForm={false}
      onSuccess={handleSaveSuccess}
      onError={handleSaveError}
    />
  );
};

export default AddSeriesForm;
