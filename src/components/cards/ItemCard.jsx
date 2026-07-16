import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">
          {item.title}
        </h3>

        <p className="text-gray-500 mt-1">
          {item.brand}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          <div>
            <span className="font-semibold">Size:</span>{" "}
            {item.size}
          </div>

          <div>
            <span className="font-semibold">Condition:</span>{" "}
            {item.condition}
          </div>

          <div>
            <span className="font-semibold">Location:</span>{" "}
            {item.location}
          </div>

          <div>
            <span className="font-semibold text-green-600">
              {item.value} Points
            </span>
          </div>
        </div>

        <Link
          to={`/item/${item.id}`}
          className="block text-center mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;