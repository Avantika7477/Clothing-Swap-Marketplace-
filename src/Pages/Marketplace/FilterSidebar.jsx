import Button from "../../components/common/Button";

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  selectedCondition,
  setSelectedCondition,
  selectedLocation,
  setSelectedLocation,
  selectedAvailability,
  setSelectedAvailability,
  resetFilters,
}) => {
  return (
    <aside className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>

        <button
          onClick={resetFilters}
          className="text-sm text-green-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Category */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Category</label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option>All</option>
          <option>Jackets</option>
          <option>Hoodies</option>
          <option>Shirts</option>
          <option>Dresses</option>
          <option>Shoes</option>
          <option>T-Shirts</option>
        </select>
      </div>

      {/* Size */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Size</label>

        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option>All</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>

      {/* Condition */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Condition</label>

        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option>All</option>
          <option>Excellent</option>
          <option>Good</option>
          <option>Like New</option>
        </select>
      </div>

      {/* Location */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Location</label>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option>All</option>
          <option>Mohali</option>
          <option>Chandigarh</option>
          <option>Delhi</option>
          <option>Jaipur</option>
          <option>Mumbai</option>
          <option>Pune</option>
        </select>
      </div>

      {/* Availability */}

      <div>
        <label className="block mb-2 font-medium">Availability</label>

        <select
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option>All</option>
          <option>Available</option>
          <option>Unavailable</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
