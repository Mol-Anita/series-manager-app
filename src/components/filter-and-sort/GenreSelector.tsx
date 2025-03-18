import React, { ChangeEvent } from "react";
import { Genre } from "@/types/genre";

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
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value as Genre);
    onChange(selectedGenres); 
  };

  return (
    <div>
      <select multiple value={value} onChange={handleChange}>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
