import { SeriesFilters } from "@/lib/services/seriesService";
import { useDebounce } from "@/hooks/useDebounce";
import { SetStateAction, useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import GenreSelector from "./GenreSelector";
import MinSeasonSelector from "./MinSeasonSelector";
import SortBySeasonsToggle from "./SortBySeasonToggle"
import { Genre } from "@/types/genre";
import { parse } from "path";


type SeriesListFiltersProps = {
  onChange: (filters: SeriesFilters) => void;
};

const SeriesListFilters = ({ onChange }: SeriesListFiltersProps) => {
  const [search, setSearch] = useState<SeriesFilters["search"]>("");
  const debouncedSearch = useDebounce(search);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [seasonNumber, setSeasonNumber] = useState<SeriesFilters["seasonNumber"]>(0);
  const [sortBySeasons, setSortBySeasons] = useState <SeriesFilters["sortBySeasons"]>(false);

  useEffect(() => {
    onChange({ genres, seasonNumber, search: debouncedSearch, sortBySeasons });
  }, [genres, debouncedSearch, seasonNumber, sortBySeasons]);

  return (
    <section className="flex flex-wrap justify-between gap-4 border-b-[0.05px] border-neutral-800 p-4">
      <SearchBar
        value={search}
        onChange={(e: {
          target: { value: string };
        }) => setSearch(e.target.value)}
      />
      <div className="flex flex-wrap">
        <GenreSelector value={genres || []} onChange={setGenres} />
        <MinSeasonSelector value={seasonNumber || 0} onChange={setSeasonNumber} />
        <SortBySeasonsToggle value={sortBySeasons || false} onChange={setSortBySeasons} />
      </div>
      
    </section>
  );
};

export default SeriesListFilters;
