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
    <div className="clay mb-8 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">My Listings</h2>
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
              className="clay-sm flex flex-col items-center gap-5 p-4 transition hover:-translate-y-0.5 md:flex-row"
            >
              <img
                src={getImageUrl(item.images?.[0])}
                alt={item.title}
                className="h-28 w-28 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-1 text-ink/55">{item.category}</p>
                <span className="mt-3 inline-block rounded-2xl bg-moss-100 px-3 py-1 text-sm capitalize text-moss-800 shadow-[inset_2px_2px_6px_rgba(163,177,198,0.25)]">
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
