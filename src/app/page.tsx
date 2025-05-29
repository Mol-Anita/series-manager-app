'use client';

import SeriesCardSection from "../components/SeriesCardSection";
import { useQuery } from "@tanstack/react-query";
import { fetchSeries } from "../lib/services/seriesService";

export default function Home() {
  const { data, isFetching, error, status } = useQuery({
    queryKey: ['series'],
    queryFn: () => fetchSeries(1, 4, {}),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  console.log('Home component - Status:', status);
  console.log('Home component - Data:', data);
  console.log('Home component - IsFetching:', isFetching);
  console.log('Home component - Error:', error);

  if (status === 'error') {
    return <div className="text-white">Error loading series: {error?.message}</div>;
  }

  if (status === 'pending' || isFetching) {
    return <div className="text-white">Loading series...</div>;
  }

  if (!data || data.result.length === 0) {
    return <div className="text-white">No series found</div>;
  }

  return (
    <div>
      <SeriesCardSection heading={"Recently Watched"} seriesList={data.result}/>
    </div>
  );
}