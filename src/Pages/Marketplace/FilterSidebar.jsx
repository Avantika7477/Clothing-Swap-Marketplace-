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
  const fieldClass =
    "w-full rounded-xl border border-moss-800/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-moss-700";

  return (
    <aside className="surface sticky top-24 rounded-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-medium">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-moss-800 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={fieldClass}
          >
            <option>All</option>
            <option>Jackets</option>
            <option>Hoodies</option>
            <option>Shirts</option>
            <option>Dresses</option>
            <option>Shoes</option>
            <option>T-Shirts</option>
            <option>Jeans</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Size</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className={fieldClass}
          >
            <option>All</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Condition</label>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className={fieldClass}
          >
            <option>All</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Like New</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className={fieldClass}
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

        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Availability</label>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className={fieldClass}
          >
            <option>All</option>
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
