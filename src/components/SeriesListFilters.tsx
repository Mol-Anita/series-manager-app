import { SeriesFilters } from "@/api/series";
import { useDebounce } from "@/hooks/useDebounce";
import { SetStateAction, useEffect, useState } from "react";

import SearchBar from "./filter-and-sort/SearchBar";
import GenreSelector from "./filter-and-sort/GenreSelector";
import MinSeasonSelector from "./filter-and-sort/MinSeasonSelector";
import { Genre } from "@/types/genre";
import { parse } from "path";


type SeriesListFiltersProps = {
  onChange: (filters: SeriesFilters) => void;
};

const SeriesListFilters = ({ onChange }: SeriesListFiltersProps) => {
  const [search, setSearch] = useState<SeriesFilters["search"]>("");
  const debouncedSearch = useDebounce(search);

  const [genres, setGenres] = useState<SeriesFilters["genres"]>([]);
  const [seasonNumber, setSeasonNumber] = useState<SeriesFilters["seasonNumber"]>(0);

  useEffect(() => {
    onChange({ genres, seasonNumber, search: debouncedSearch });
  }, [genres, debouncedSearch, seasonNumber]);

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
      </div>
      
    </section>
  );
};

export default SeriesListFilters;
