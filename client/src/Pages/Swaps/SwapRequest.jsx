import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiCheckCircle, HiExclamation } from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../services/api";
import {
  getListingById,
  getMyListings,
  createSwap,
} from "../../services/clothingApi";

const EXCHANGE_METHODS = [
  { value: "undecided", label: "Undecided" },
  { value: "local", label: "Local Meetup" },
  { value: "courier", label: "Courier / Shipping" },
];

const compareValues = (valueA, valueB) => {
  const higher = Math.max(valueA, valueB);
  const lower = Math.min(valueA, valueB);
  const difference = higher - lower;
  const percentDiff = higher === 0 ? 0 : Math.round((difference / higher) * 100);
  return { difference, percentDiff, isFair: percentDiff <= 20 };
};

const SwapRequest = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [targetItem, setTargetItem] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [offeredItemId, setOfferedItemId] = useState("");
  const [message, setMessage] = useState("");
  const [exchangeMethod, setExchangeMethod] = useState("undecided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const [itemRes, myListingsRes] = await Promise.all([
          getListingById(itemId),
          getMyListings(),
        ]);
        setTargetItem(itemRes.data.listing);
        setMyListings(
          (myListingsRes.data.listings || []).filter(
            (listing) => listing.status === "available"
          )
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load swap request details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [itemId]);

  const offeredItem = useMemo(
    () => myListings.find((listing) => listing._id === offeredItemId) || null,
    [myListings, offeredItemId]
  );

  const comparison = useMemo(() => {
    if (!targetItem || !offeredItem) return null;
    return compareValues(targetItem.estimatedValue, offeredItem.estimatedValue);
  }, [targetItem, offeredItem]);

  const isOwnItem = targetItem && targetItem.owner?._id === user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!offeredItemId) {
      toast.error("Please select an item to offer.");
      return;
    }

    try {
      setSubmitting(true);
      await createSwap({
        requestedItemId: itemId,
        offeredItemId,
        message,
        exchangeMethod,
      });
      toast.success("Swap request sent!");
      navigate("/swaps");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send swap request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          <Loader />
        </section>
      </MainLayout>
    );
  }

  if (error || !targetItem) {
    return (
      <MainLayout>
        <section className="bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
              {error || "Item not found."}
            </div>
            <Link
              to="/marketplace"
              className="inline-block mt-6 text-moss-800 hover:underline"
            >
              Back to Marketplace
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (isOwnItem) {
    return (
      <MainLayout>
        <section className="bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl px-4 py-3">
              You cannot request a swap on your own item.
            </div>
            <Link
              to={`/item/${itemId}`}
              className="inline-block mt-6 text-moss-800 hover:underline"
            >
              Back to Item
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Request a Swap</h1>
            <p className="text-gray-500 mt-1">
              Choose an item from your closet to offer in exchange.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <p className="text-sm text-gray-400 mb-3">You want to swap for</p>
            <div className="flex items-center gap-4">
              <img
                src={getImageUrl(targetItem.images?.[0])}
                alt={targetItem.title}
                className="w-20 h-20 rounded-xl object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {targetItem.title}
                </h3>
                <p className="text-gray-500">{targetItem.brand}</p>
                <p className="text-moss-800 font-semibold">
                  {targetItem.estimatedValue} pts
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Select Your Item to Offer</h2>

              {myListings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  You have no available listings to offer.{" "}
                  <Link to="/add-item" className="text-moss-800 hover:underline">
                    List an item first.
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {myListings.map((listing) => (
                    <label
                      key={listing._id}
                      className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition ${
                        offeredItemId === listing._id
                          ? "border-moss-800 ring-2 ring-moss-100"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="offeredItem"
                        value={listing._id}
                        checked={offeredItemId === listing._id}
                        onChange={() => setOfferedItemId(listing._id)}
                        className="accent-moss-800"
                      />
                      <img
                        src={getImageUrl(listing.images?.[0])}
                        alt={listing.title}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {listing.title}
                        </p>
                        <p className="text-sm text-moss-800 font-medium">
                          {listing.estimatedValue} pts
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {comparison && (
              <div
                className={`rounded-2xl p-6 border ${
                  comparison.isFair
                    ? "bg-moss-50 border-moss-800/20"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {comparison.isFair ? (
                    <HiCheckCircle className="text-moss-800 text-xl" />
                  ) : (
                    <HiExclamation className="text-yellow-600 text-xl" />
                  )}
                  <h3 className="font-bold text-lg">
                    {comparison.isFair ? "Fair Swap" : "Value Mismatch"}
                  </h3>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Their item value</span>
                  <span className="font-semibold">
                    {targetItem.estimatedValue} pts
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Your item value</span>
                  <span className="font-semibold">
                    {offeredItem.estimatedValue} pts
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Difference</span>
                  <span className="font-semibold">
                    {comparison.difference} pts ({comparison.percentDiff}%)
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
              <div>
                <label className="block mb-2 font-medium">
                  Message (optional)
                </label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself or explain your offer..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700 resize-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Exchange Method</label>
                <select
                  value={exchangeMethod}
                  onChange={(e) => setExchangeMethod(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700 bg-white"
                >
                  {EXCHANGE_METHODS.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting || !offeredItemId}
                className="btn-premium btn-premium-primary flex-1 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending Request..." : "Send Swap Request"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-premium btn-premium-secondary px-6 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default SwapRequest;
