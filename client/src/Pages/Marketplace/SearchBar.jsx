import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value = "", onChange }) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search by title, brand, or category..."
        className="field-input py-3.5 pl-11"
      />
    </div>
  );
};

export default SearchBar;
