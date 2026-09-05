import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiCheckCircle, HiExclamation, HiSparkles } from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../services/api";
import {
  getListingById,
  getMyListings,
  createSwap,
  createListing,
  estimateValue,
} from "../../services/clothingApi";
import {
  LISTING_CATEGORIES,
  LISTING_CONDITIONS,
  getDisplayCategory,
} from "../../utils/category";

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

const quickItemInitial = {
  title: "",
  brand: "",
  category: "",
  customCategory: "",
  size: "",
  condition: "",
  location: "",
};

const SwapRequest = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const quickImageRef = useRef(null);

  const [targetItem, setTargetItem] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [offeredItemId, setOfferedItemId] = useState("");
  const [message, setMessage] = useState("");
  const [exchangeMethod, setExchangeMethod] = useState("undecided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showQuickList, setShowQuickList] = useState(false);
  const [quickItem, setQuickItem] = useState({
    ...quickItemInitial,
    location: user?.location || "",
  });
  const [quickImage, setQuickImage] = useState(null);
  const [quickPreview, setQuickPreview] = useState("");
  const [quickEstimatedValue, setQuickEstimatedValue] = useState(null);
  const [quickEstimating, setQuickEstimating] = useState(false);
  const [creatingQuickItem, setCreatingQuickItem] = useState(false);

  const loadData = async () => {
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

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  useEffect(() => {
    setQuickItem((prev) => ({
      ...prev,
      location: prev.location || user?.location || "",
    }));
  }, [user]);

  useEffect(() => {
    const { brand, condition, category, customCategory } = quickItem;
    if (!showQuickList || !brand || !condition || !category) {
      setQuickEstimatedValue(null);
      return;
    }
    if (category === "Other" && !customCategory.trim()) {
      setQuickEstimatedValue(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setQuickEstimating(true);
        const { data } = await estimateValue({
          brand,
          condition,
          category,
          customCategory: category === "Other" ? customCategory.trim() : "",
        });
        setQuickEstimatedValue(data.estimatedValue);
      } catch {
        setQuickEstimatedValue(null);
      } finally {
        setQuickEstimating(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [quickItem, showQuickList]);

  const offeredItem = useMemo(
    () => myListings.find((listing) => listing._id === offeredItemId) || null,
    [myListings, offeredItemId]
  );

  const comparison = useMemo(() => {
    if (!targetItem || !offeredItem) return null;
    return compareValues(targetItem.estimatedValue, offeredItem.estimatedValue);
  }, [targetItem, offeredItem]);

  const isOwnItem = targetItem && targetItem.owner?._id === user?._id;

  const handleQuickChange = (e) => {
    const { name, value } = e.target;
    setQuickItem((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "category" && value !== "Other") {
        next.customCategory = "";
      }
      return next;
    });
  };

  const handleQuickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setQuickImage(file);
    setQuickPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    e.target.value = "";
  };

  const handleCreateQuickItem = async () => {
    if (!quickItem.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!quickItem.brand.trim()) {
      toast.error("Brand is required.");
      return;
    }
    if (!quickItem.category) {
      toast.error("Please select a category.");
      return;
    }
    if (quickItem.category === "Other" && !quickItem.customCategory.trim()) {
      toast.error("Please describe your category when selecting Other.");
      return;
    }
    if (!quickItem.size.trim()) {
      toast.error("Size is required.");
      return;
    }
    if (!quickItem.condition) {
      toast.error("Please select a condition.");
      return;
    }
    if (!quickItem.location.trim()) {
      toast.error("Location is required.");
      return;
    }
    if (!quickImage) {
      toast.error("Please upload one photo of your item.");
      return;
    }

    try {
      setCreatingQuickItem(true);
      const formData = new FormData();
      Object.entries(quickItem).forEach(([key, value]) => {
        if (key === "customCategory" && quickItem.category !== "Other") return;
        formData.append(key, value);
      });
      formData.append("images", quickImage);

      const { data } = await createListing(formData);
      const newListing = data.listing;
      setMyListings((prev) => [newListing, ...prev]);
      setOfferedItemId(newListing._id);
      setShowQuickList(false);
      toast.success("Item listed and selected for swap.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to list item.");
    } finally {
      setCreatingQuickItem(false);
    }
  };

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
        <div className="page-shell max-w-4xl py-8 sm:py-10">
          <div className="mb-6 sm:mb-8">
            <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Request a Swap
            </h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
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
                <p className="text-sm text-gray-400">
                  {getDisplayCategory(targetItem)}
                </p>
                <p className="text-moss-800 font-semibold">
                  {targetItem.estimatedValue} pts
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Select Your Item to Offer</h2>
                <button
                  type="button"
                  onClick={() => setShowQuickList((prev) => !prev)}
                  className="text-sm font-semibold text-moss-800 hover:underline"
                >
                  {showQuickList ? "Cancel new item" : "List new item"}
                </button>
              </div>

              {showQuickList && (
                <div className="mb-6 border border-moss-800/15 bg-moss-50 p-5 space-y-4">
                  <p className="text-sm text-gray-600">
                    List a new item to offer in this swap. Choose a category, or
                    select Other and describe it to get points.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="title"
                      value={quickItem.title}
                      onChange={handleQuickChange}
                      placeholder="Item title"
                      className="w-full border rounded-lg px-4 py-3"
                    />
                    <input
                      type="text"
                      name="brand"
                      value={quickItem.brand}
                      onChange={handleQuickChange}
                      placeholder="Brand"
                      className="w-full border rounded-lg px-4 py-3"
                    />
                    <select
                      name="category"
                      value={quickItem.category}
                      onChange={handleQuickChange}
                      className="w-full border rounded-lg px-4 py-3 bg-white"
                    >
                      <option value="">Select category</option>
                      {LISTING_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="size"
                      value={quickItem.size}
                      onChange={handleQuickChange}
                      placeholder="Size"
                      className="w-full border rounded-lg px-4 py-3"
                    />
                    <select
                      name="condition"
                      value={quickItem.condition}
                      onChange={handleQuickChange}
                      className="w-full border rounded-lg px-4 py-3 bg-white"
                    >
                      <option value="">Select condition</option>
                      {LISTING_CONDITIONS.map((cond) => (
                        <option key={cond} value={cond}>
                          {cond}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="location"
                      value={quickItem.location}
                      onChange={handleQuickChange}
                      placeholder="Location"
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>

                  {quickItem.category === "Other" && (
                    <input
                      type="text"
                      name="customCategory"
                      value={quickItem.customCategory}
                      onChange={handleQuickChange}
                      placeholder="Describe your category (e.g. Winter coat)"
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => quickImageRef.current?.click()}
                      className="btn-premium btn-premium-secondary px-4 py-2 text-sm"
                    >
                      Upload photo
                    </button>
                    {quickPreview && (
                      <img
                        src={quickPreview}
                        alt="Preview"
                        className="h-16 w-16 rounded-lg object-cover border"
                      />
                    )}
                    <input
                      ref={quickImageRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleQuickImage}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-moss-800">
                    <HiSparkles />
                    {quickEstimating ? (
                      <span className="text-sm">Calculating points...</span>
                    ) : quickEstimatedValue !== null ? (
                      <span className="text-sm font-semibold">
                        Estimated value: {quickEstimatedValue} pts
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Fill details to see estimated points.
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateQuickItem}
                    disabled={creatingQuickItem}
                    className="btn-premium btn-premium-primary px-5 py-2.5 text-sm disabled:opacity-60"
                  >
                    {creatingQuickItem ? "Listing..." : "List & select item"}
                  </button>
                </div>
              )}

              {myListings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  You have no available listings to offer. Use{" "}
                  <button
                    type="button"
                    onClick={() => setShowQuickList(true)}
                    className="text-moss-800 hover:underline font-semibold"
                  >
                    List new item
                  </button>{" "}
                  above.
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
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {listing.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {getDisplayCategory(listing)}
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

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-premium btn-premium-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !offeredItemId}
                className="btn-premium btn-premium-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending Request..." : "Send Swap Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default SwapRequest;
