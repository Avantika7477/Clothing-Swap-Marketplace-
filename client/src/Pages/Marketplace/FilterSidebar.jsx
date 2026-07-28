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
  nearbyOnly,
  setNearbyOnly,
  nearbyDisabled,
  resetFilters,
}) => {
  const fieldClass =
    "w-full rounded-2xl border border-moss-800/12 bg-white/85 px-3.5 py-2.5 text-sm outline-none shadow-sm transition focus:border-moss-700 focus:ring-2 focus:ring-moss-100";

  return (
    <aside className="premium-surface sticky top-24 rounded-3xl p-6">
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
        <div className="rounded-2xl border border-moss-800/12 bg-moss-50/90 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={nearbyOnly}
              disabled={nearbyDisabled}
              onChange={(e) => setNearbyOnly?.(e.target.checked)}
              className="mt-1 accent-moss-800"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                Nearby swaps only
              </span>
              <span className="mt-1 block text-xs text-ink/55">
                {nearbyDisabled
                  ? "Login and set your location in Profile to use this."
                  : "Match listings near your profile location."}
              </span>
            </span>
          </label>
        </div>

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
            disabled={nearbyOnly}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className={`${fieldClass} disabled:opacity-50`}
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
