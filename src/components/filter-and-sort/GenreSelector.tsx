import React, { ChangeEvent } from "react";
import { Genre } from "@/types/genre";
import { MultiSelect } from 'primereact/multiselect';

type GenreSelectorProps = {
  value: Genre[];
  onChange: (genres: Genre[]) => void;
};

const genres: Genre[] = [
  "Crime",
  "Drama",
  "Thriller",
  "Sci-Fi",
  "Horror",
  "Mystery",
  "Fantasy",
  "Adventure",
  "Action",
  "Comedy",
  "Romance",
  "Dark Comedy",
  "Animation",
  "Anthology",
  "Biography",
  "Anime",
];

const GenreSelector: React.FC<GenreSelectorProps> = ({ value, onChange }) => {
  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value as Genre
    );
    onChange(selectedOptions);
  };

  return (
    <div className="pr-2.5">
      <div className="inline-flex rounded-full w-60 h-9 bg-transparent px-3 py-1.5 text-white font-light text-sm/6 outline-1 -outline-offset-1 outline-neutral-700">
      <MultiSelect
        id="genre-selector"
        value={value}
        options={genres}
        onChange={(e) => onChange(e.value)}
        placeholder="Select genre"
        display="chip" 
        className="w-full p-multiselect"
        panelClassName="bg-neutral-900 px-3 py-2 border rounded-lg text-gray-400 "
        checkboxIcon="none"
      />
    </div>
    </div>
    
  );
};

export default GenreSelector;
