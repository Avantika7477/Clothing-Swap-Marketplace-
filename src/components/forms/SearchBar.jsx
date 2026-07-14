import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="max-w-5xl mx-auto mt-16 px-6">
      <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search clothes, brands..."
          className="flex-1 p-5 outline-none"
        />

        <button className="bg-green-600 p-5 text-white">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
