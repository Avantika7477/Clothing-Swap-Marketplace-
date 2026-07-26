const ItemInformation = ({ listing }) => {
  const available = listing?.status
    ? listing.status === "available"
    : listing?.available;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      <span className="inline-block rounded-lg bg-moss-100 px-3 py-1 text-sm font-medium text-moss-800">
        {listing.category}
      </span>

      <h1 className="mt-4 font-display text-3xl font-medium">{listing.title}</h1>

      <p className="mt-2 text-gray-600">
        Brand:
        <span className="font-semibold ml-2">{listing.brand}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-gray-500">Size</p>
          <p className="font-semibold">{listing.size}</p>
        </div>

        <div>
          <p className="text-gray-500">Condition</p>
          <p className="font-semibold">{listing.condition}</p>
        </div>

        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-semibold">{listing.location}</p>
        </div>

        <div>
          <p className="text-gray-500">Availability</p>
          <span
            className={`font-semibold ${
              available ? "text-moss-800" : "text-red-600"
            }`}
          >
            {available ? "Available" : "Not Available"}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Description</h3>
        <p className="text-gray-600 leading-7">
          {listing.description ||
            "This clothing item is listed for swapping through Fashion Swap. It is well maintained and perfect for supporting sustainable fashion."}
        </p>
      </div>
    </div>
  );
};

export default ItemInformation;
