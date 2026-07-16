import clothingData from "../../../assets/data/clothingData";

const ItemInformation = () => {
  const item = clothingData[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      {/* Category */}
      <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
        {item.category}
      </span>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-4">{item.title}</h1>

      {/* Brand */}
      <p className="mt-2 text-gray-600">
        Brand:
        <span className="font-semibold ml-2">{item.brand}</span>
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-gray-500">Size</p>
          <p className="font-semibold">{item.size}</p>
        </div>

        <div>
          <p className="text-gray-500">Condition</p>
          <p className="font-semibold">{item.condition}</p>
        </div>

        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-semibold">{item.location}</p>
        </div>

        <div>
          <p className="text-gray-500">Availability</p>

          <span
            className={`font-semibold ${
              item.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.available ? "Available" : "Not Available"}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Description</h3>

        <p className="text-gray-600 leading-7">
          This clothing item is listed for swapping through Kaddly Swap. It is
          well maintained and perfect for giving your wardrobe a fresh look
          while supporting sustainable fashion.
        </p>
      </div>
    </div>
  );
};

export default ItemInformation;
