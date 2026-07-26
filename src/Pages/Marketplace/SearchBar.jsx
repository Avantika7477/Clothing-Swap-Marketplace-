import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value = "", onChange }) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-ink/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search by title, brand, or category..."
        className="w-full rounded-2xl border border-moss-800/15 bg-white/80 py-3.5 pl-12 pr-4 outline-none transition focus:border-moss-700"
      />
    </div>
  );
};

export default SearchBar;
