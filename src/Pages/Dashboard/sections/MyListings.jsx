import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import clothingData from "../../../assets/data/clothingData";

const MyListings = () => {
  // Temporary: show first 3 items as user's listings
  const myListings = clothingData.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Listings</h2>

        <Link
          to="/add-item"
          className="text-green-600 font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-5">
        {myListings.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-5 border rounded-xl p-4 hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 rounded-lg object-cover"
            />

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.title}</h3>

              <p className="text-gray-500 mt-1">{item.category}</p>

              <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Available
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                <HiOutlinePencil />
                Edit
              </button>

              <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                <HiOutlineTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
