import React, { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (genre: Genre) => {
    if (value.includes(genre)) {
      onChange(value.filter((g) => g !== genre));
    } else {
      onChange([...value, genre]);
    }
  };

  return (
    <div className="relative pr-2.5 inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={toggleDropdown}
        type="button"
        className="text-white bg-transparent hover:bg-stone-900 outline-1 -outline-offset-1 outline-neutral-700 focus:ring-2 focus:outline-none focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 inline-flex items-center justify-between w-full"
      >
        {value.length > 0 ? value.join(", ") : "Select genre"}
        <svg
          className="w-2.5 h-2.5 ml-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-60 bg-stone-900 border border-stone-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <ul className="p-3 space-y-2 text-sm text-white">
            {genres.map((genre) => (
              <li key={genre}>
                <label className="flex items-center cursor-pointer hover:bg-stone-800 rounded px-2 py-1 select-none transition-colors duration-150">
                  <input
                    id={`checkbox-${genre}`}
                    type="checkbox"
                    checked={value.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)}
                    className="w-4 h-4 text-blue-600 bg-stone-800 border-stone-600 rounded-sm focus:ring-blue-500 focus:ring-2 dark:bg-stone-700 dark:border-stone-600"
                  />
                  <span className="ml-2">{genre}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenreSelector;
