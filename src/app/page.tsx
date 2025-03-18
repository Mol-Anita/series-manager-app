'use client';

import SeriesCardSection from "../components/SeriesCardSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/series";

export default function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ['series'],
    queryFn: () => fetchProducts({}),
  });

  return (
    <div>
        {data && <SeriesCardSection heading={"Recently Watched"} seriesList={data}/>}
    </div>
  );
}