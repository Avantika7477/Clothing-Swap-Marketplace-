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
    <aside className="border border-moss-800/10 bg-white p-4 sm:p-5 lg:sticky lg:top-36">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-moss-800/10 pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
          Filters
        </h2>
        <button
          type="button"
          onClick={resetFilters}
          className="shrink-0 text-xs font-bold uppercase tracking-wider text-moss-800 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:space-y-0 lg:gap-5">
        <div className="border border-moss-800/10 bg-moss-50 p-4 sm:col-span-2 lg:col-span-1">
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
                Nearby only
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
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/55">
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
