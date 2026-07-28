import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { getImageUrl } from "../../../services/api";
import { getMyListings, deleteListing } from "../../../services/clothingApi";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await getMyListings();
      setListings((data.listings || []).slice(0, 5));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      setBusyId(id);
      await deleteListing(id);
      toast.success("Listing removed");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete listing");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="premium-surface rounded-3xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-medium">My Listings</h2>
        <Link to="/add-item" className="text-moss-800 text-sm font-semibold hover:underline">
          Add Item
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <p className="text-gray-500">
          No listings yet.{" "}
          <Link to="/add-item" className="text-moss-800 hover:underline">
            List your first item
          </Link>
        </p>
      ) : (
        <div className="space-y-5">
          {listings.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center gap-5 border border-moss-800/10 bg-white/75 rounded-2xl p-4 hover:shadow-md transition"
            >
              <img
                src={getImageUrl(item.images?.[0])}
                alt={item.title}
                className="w-28 h-28 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-ink/55 mt-1">{item.category}</p>
                <span className="inline-block mt-3 bg-moss-100 text-moss-800 px-3 py-1 rounded-full text-sm capitalize">
                  {item.status}
                </span>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/item/${item._id}`}
                  className="btn-premium btn-premium-secondary flex items-center gap-2 px-4 py-2"
                >
                  <HiOutlinePencil />
                  View
                </Link>

                <button
                  type="button"
                  disabled={busyId === item._id}
                  onClick={() => handleDelete(item._id)}
                  className="btn-premium flex items-center gap-2 rounded-2xl border border-red-500 bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:opacity-50"
                >
                  <HiOutlineTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
