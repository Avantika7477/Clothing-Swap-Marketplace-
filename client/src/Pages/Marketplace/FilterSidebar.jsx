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
  return (
    <aside className="clay lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="shrink-0 text-sm font-semibold text-moss-800 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <div className="clay-inset">
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
              <span className="mt-1 block text-xs leading-relaxed text-ink/55">
                {nearbyDisabled
                  ? "Login and set your location in Profile to use this."
                  : "Match listings near your profile location."}
              </span>
            </span>
          </label>
        </div>

        {[
          {
            label: "Category",
            value: selectedCategory,
            onChange: setSelectedCategory,
            options: [
              "All",
              "Jackets",
              "Hoodies",
              "Shirts",
              "Dresses",
              "Shoes",
              "T-Shirts",
              "Jeans",
            ],
          },
          {
            label: "Size",
            value: selectedSize,
            onChange: setSelectedSize,
            options: ["All", "S", "M", "L", "XL"],
          },
          {
            label: "Condition",
            value: selectedCondition,
            onChange: setSelectedCondition,
            options: ["All", "Excellent", "Good", "Like New"],
          },
          {
            label: "Location",
            value: selectedLocation,
            onChange: setSelectedLocation,
            options: [
              "All",
              "Mohali",
              "Chandigarh",
              "Delhi",
              "Jaipur",
              "Mumbai",
              "Pune",
            ],
            disabled: nearbyOnly,
          },
          {
            label: "Availability",
            value: selectedAvailability,
            onChange: setSelectedAvailability,
            options: ["All", "Available", "Unavailable"],
          },
        ].map((field) => (
          <div key={field.label}>
            <label className="mb-1.5 block text-sm font-medium text-ink/65">
              {field.label}
            </label>
            <select
              value={field.value}
              disabled={field.disabled}
              onChange={(e) => field.onChange(e.target.value)}
              className="field-input disabled:opacity-50"
            >
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
