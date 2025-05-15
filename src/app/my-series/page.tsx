"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSeries, SeriesFilters, deleteSeriesById } from "../../lib/api/apiCallingFunctions";
import SeriesList from "../../components/SeriesList";
import SeriesListFilters from "../../components/filter-and-sort/SeriesListFilters";
import { useState } from "react";
import PaginationSelector from "../../components/PaginationSelector";
import { useRouter } from "next/navigation";
import PaginationNumberSelector from "@/components/PaginationNumberSelector";

const ITEMS_PER_PAGE = 14;

const MySeries = () => {
  const router = useRouter();
  const [search, setSearch] = useState<SeriesFilters["search"]>();
  const [genres, setGenres] = useState<SeriesFilters["genres"]>();
  const [seasonNumber, setSeasonNumber] = useState<SeriesFilters["seasonNumber"]>();
  const [sortBySeasons, setSortBySeasons] = useState<SeriesFilters["sortBySeasons"]>();
  const [itemsPerPage, setItemsPerPage] = useState<number>(14);
  const queryClient = useQueryClient();

  const { data = [], isFetching, refetch } = useQuery({
    queryKey: ['series', genres?.join(','), search, seasonNumber, sortBySeasons],
    queryFn: () => fetchSeries({ genres, search, seasonNumber, sortBySeasons }),
  });

  const handleFilterChange = (filters: SeriesFilters) => {
    setGenres(filters.genres);
    setSeasonNumber(filters.seasonNumber);
    setSearch(filters.search);
    setSortBySeasons(filters.sortBySeasons);
    router.push("/my-series");
  };

  const handlePaginationChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleDelete = async (seriesId: number) => {
    try {
      await deleteSeriesById(seriesId);
      queryClient.invalidateQueries({ queryKey: ['series'] });
    } catch (error) {
      console.error('Error deleting series:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeriesListFilters onChange={handleFilterChange} />
      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <SeriesList seriesList={data} onDelete={handleDelete} pageNumber={1} />
          <div className="mt-4 flex justify-between items-center">
            <PaginationNumberSelector
              value={itemsPerPage}
              onChange={handlePaginationChange}
            />
            <PaginationSelector
              entryLeft={1}
              entryRight={data.length}
              allEntry={data.length}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MySeries;
