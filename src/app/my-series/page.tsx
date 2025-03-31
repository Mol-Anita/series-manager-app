"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSeries, SeriesFilters, deleteSeriesById } from "../../api/series";
import SeriesList from "../../components/SeriesList";
import SeriesListFilters from "../../components/filter-and-sort/SeriesListFilters";
import { useState, useEffect } from "react";
import PaginationSelector from "../../components/PaginationSelector";
import { useSearchParams, useRouter } from "next/navigation";
import PaginationNumberSelector from "@/components/PaginationNumberSelector"
import { set } from "react-hook-form";

const ITEMS_PER_PAGE = 14;

const MySeries = () => {
  const router = useRouter();

  const [search, setSearch] = useState <SeriesFilters["search"] >();
  const [genres, setGenres] = useState <SeriesFilters["genres"] >();
  const [seasonNumber, setSeasonNumber] = useState < SeriesFilters["seasonNumber"] >();
  const [sortBySeasons, setSortBySeasons] = useState <SeriesFilters["sortBySeasons"]>();
  const [itemsPerPage, setItemsPerPage] = useState<number>(14);
  const queryClient = useQueryClient();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['series', genres?.join(','), search, seasonNumber, sortBySeasons],
    queryFn: () => fetchSeries({ genres, search, seasonNumber, sortBySeasons}),
    staleTime: 0,
  });


  const handleFilterChange = (filters: SeriesFilters) =>{
    setGenres(filters.genres);
          setSeasonNumber(filters.seasonNumber);
          setSearch(filters.search);
          setSortBySeasons(filters.sortBySeasons);

    router.push("/my-series");
  }

  const handlePaginationChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  }

  const handleDelete = async (seriesId: number) => {
    await deleteSeriesById(seriesId);
    refetch(); 
  };

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const itemNo = currentPage == 1 ? itemsPerPage : itemsPerPage + 1;
  const startIndex = (currentPage - 1) * itemNo;
  const paginatedData = data ? data.slice(startIndex, startIndex + itemNo) : [];

  return (
    <div>
      <SeriesListFilters
        onChange={handleFilterChange}
      />
      <div>
        {paginatedData && <SeriesList seriesList={paginatedData} onDelete={handleDelete} pageNumber={currentPage}/>}
        {isFetching && <p>Loading...</p>}
      </div>
      <div>
        <PaginationNumberSelector value={itemsPerPage} onChange={handlePaginationChange} />
        <PaginationSelector entryLeft={startIndex + 1} entryRight={data && Math.min(startIndex + itemNo + 1, data?.length)} allEntry={data?.length} />
      </div>
      

    </div>
  );
};

export default MySeries;
