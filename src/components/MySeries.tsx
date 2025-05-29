'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSeries, SeriesFilters, deleteSeriesById, FetchSeriesResponse } from "@/lib/services/seriesService";
import SeriesList from "@/components/SeriesList";
import SeriesListFilters from "@/components/filter-and-sort/SeriesListFilters";
import { useMemo, useState } from "react";
import PaginationSelector from "@/components/pagination/PaginationSelector";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationNumberSelector from "@/components/pagination/PaginationNumberSelector";

const MySeries = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [shown, setShown] = useState<number | null>(null);

  const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "14", 10);
  const search = searchParams.get("search") || undefined;
  const genres = searchParams.get("genres")?.split(",").filter(Boolean) || [];
  const seasonNumber = searchParams.get("seasonNumber")
    ? parseInt(searchParams.get("seasonNumber")!, 10)
    : undefined;
  const sortBySeasons = searchParams.get("sortBySeasons") === "true";

  const filters: SeriesFilters = useMemo(
    () => ({
      genres,
      search,
      seasonNumber,
      sortBySeasons,
    }),
    [genres, search, seasonNumber, sortBySeasons]
  );

  const { data, isFetching } = useQuery<FetchSeriesResponse>({
    queryKey: ["series", pageNumber, pageSize, filters],
    queryFn: () => fetchSeries(pageNumber, pageSize, filters),
  });

  const updateQueryParams = (params: Record<string, string | number | boolean | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.push(`/my-series?${newParams.toString()}`);
  };

  const handleFilterChange = (newFilters: SeriesFilters) => {
    updateQueryParams({
      pageNumber: 1,
      search: newFilters.search,
      genres: newFilters.genres?.join(","),
      seasonNumber: newFilters.seasonNumber,
      sortBySeasons: newFilters.sortBySeasons,
    });
  };

  const handlePaginationChange = (newItemsPerPage: number) => {
    updateQueryParams({ pageSize: newItemsPerPage, pageNumber: 1 });
    console.log("Items shown:",newItemsPerPage);
    setShown(newItemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ pageNumber: newPage });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (seriesId: number) => {
    try {
      await deleteSeriesById(seriesId);
      queryClient.invalidateQueries({ queryKey: ["series"] });
    } catch (error) {
      console.error("Error deleting series:", error);
    }
  };

  const seriesList = data?.result ?? [];
  const meta= data?.meta ?? {
    CurrentPage: pageNumber,
    PageSize: 10,
    TotalCount: seriesList.length,
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
          <PaginationNumberSelector value={shown} onChange={handlePaginationChange} />
          <SeriesList seriesList={seriesList} onDelete={handleDelete} pageNumber={meta.CurrentPage} />
          <div className="mt-4 flex justify-center items-center">
            
            <PaginationSelector
              meta = {meta} 
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MySeries;
