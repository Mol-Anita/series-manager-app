'use client';

import SeriesCardSection from "../components/SeriesCardSection";
import { useQuery } from "@tanstack/react-query";
import { fetchSeries } from "../lib/api/apiCallingFunctions";

export default function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ['series'],
    queryFn: () => fetchSeries({}),
  });

  return (
    <div>
        {data && <SeriesCardSection heading={"Recently Watched"} seriesList={data}/>}
    </div>
  );
}