import Button from "../../components/common/Button";

const FilterSidebar = () => {
  return (
    <aside className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Filters</h2>

      {/* Category */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Category</label>

        <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none">
          <option>All Categories</option>
          <option>T-Shirts</option>
          <option>Shirts</option>
          <option>Jeans</option>
          <option>Jackets</option>
          <option>Hoodies</option>
          <option>Dresses</option>
          <option>Shoes</option>
        </select>
      </div>

      {/* Brand */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Brand</label>

        <input
          type="text"
          placeholder="Nike, Adidas..."
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
        />
      </div>

      {/* Size */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Size</label>

        <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none">
          <option>All Sizes</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
      </div>

      {/* Condition */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Condition</label>

        <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none">
          <option>Any</option>
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Used</option>
        </select>
      </div>

      {/* Location */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Location</label>

        <input
          type="text"
          placeholder="Enter city"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
        />
      </div>

      {/* Availability */}

      <div className="mb-8">
        <label className="mb-2 block font-medium">Availability</label>

        <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none">
          <option>All</option>
          <option>Available</option>
          <option>Swapped</option>
        </select>
      </div>

      <Button fullWidth size="lg">
        Apply Filters
      </Button>
    </aside>
  );
};

export default FilterSidebar;
