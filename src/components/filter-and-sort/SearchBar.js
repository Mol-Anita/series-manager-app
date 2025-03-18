'use client';

const SearchBar = ({value, onChange})=> {
    return (
      <div>
        <div className="mt-2">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder=""
            className="block w-12 rounded-full bg-neutral-800 px-4 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
          />
        </div>
      </div>
    )
};

export default SearchBar;
  