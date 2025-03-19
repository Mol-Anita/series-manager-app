"use client";

import { ChangeEventHandler } from "react";


const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-80">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="block w-full h-9 rounded-full bg-neutral-900 px-4 py-1.5 text-white text-sm/6 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-neutral-700  focus:outline-2 focus:-outline-offset-2"
      />
    </div>
  );
};

export default SearchBar;
