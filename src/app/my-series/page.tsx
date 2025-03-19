"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, SeriesFilters } from "../../api/series";
import SeriesList from "../../components/SeriesList";
import SeriesListFilters from "../../components/filter-and-sort/SeriesListFilters";
import { useState, useEffect } from "react";

const MySeries = () => {
  const [search, setSearch] = useState <SeriesFilters["search"] >();
  const [genres, setGenres] = useState <SeriesFilters["genres"] >();
  const [seasonNumber, setSeasonNumber] = useState < SeriesFilters["seasonNumber"] >();

  const { data, isFetching } = useQuery({
    queryKey: ['series', genres?.join(','), search, seasonNumber],
    queryFn: () => fetchProducts({ genres, search, seasonNumber}),
  });

  useEffect(() => {
    console.log("Query Parameters:", { genres, seasonNumber, search });
    console.log("Fetched Data:", data);
  }, [data, genres, search, seasonNumber]);

  return (
    <div>
      <SeriesListFilters
        onChange={(filters) => {
          setGenres(filters.genres);
          setSeasonNumber(filters.seasonNumber);
          setSearch(filters.search);
        }}
      />
      <div>
        {data && <SeriesList seriesList={data} />}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default MySeries;
