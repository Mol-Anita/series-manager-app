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
    onChange(selectedOptions); // Pass the updated list to the parent
  };

  return (
    <div>
      <label
        htmlFor="genre-selector"
        className="block mb-2 text-sm font-medium text-white"
      >
        Select Genres
      </label>
      <MultiSelect
        id="genre-selector"
        value={value}
        options={genres}
        onChange={(e) => onChange(e.value)}
        optionLabel="label"
        placeholder="Select Genres"
        display="chip" 
        className="w-full p-multiselect"
      />
    </div>
  );
};

export default GenreSelector;
