import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search clothing..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
