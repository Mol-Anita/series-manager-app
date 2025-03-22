"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSeries, SeriesFilters, deleteSeriesById } from "../../api/series";
import SeriesList from "../../components/SeriesList";
import SeriesListFilters from "../../components/filter-and-sort/SeriesListFilters";
import { useState, useEffect } from "react";

const MySeries = () => {
  const [search, setSearch] = useState <SeriesFilters["search"] >();
  const [genres, setGenres] = useState <SeriesFilters["genres"] >();
  const [seasonNumber, setSeasonNumber] = useState < SeriesFilters["seasonNumber"] >();
  const [sortBySeasons, setSortBySeasons] = useState <SeriesFilters["sortBySeasons"]>();
  
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['series', genres?.join(','), search, seasonNumber, sortBySeasons],
    queryFn: () => fetchSeries({ genres, search, seasonNumber, sortBySeasons}),
  });

  useEffect(() => {
    console.log("Query Parameters:", { genres, seasonNumber, search, sortBySeasons });
    console.log("Fetched Data:", data);
  }, [data, genres, search, seasonNumber, sortBySeasons]);

  const handleDelete = (seriesId: number) => {
    deleteSeriesById(seriesId);
    refetch(); 
  };

  return (
    <div>
      <SeriesListFilters
        onChange={(filters) => {
          setGenres(filters.genres);
          setSeasonNumber(filters.seasonNumber);
          setSearch(filters.search);
          setSortBySeasons(filters.sortBySeasons);
        }}
      />
      <div>
        {data && <SeriesList seriesList={data} onDelete={handleDelete}/>}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default MySeries;
