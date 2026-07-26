import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HiChatAlt2,
  HiCheckCircle,
  HiChevronDown,
  HiChevronUp,
  HiClock,
  HiXCircle,
} from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../services/api";
import {
  getMySwaps,
  respondToSwap,
  cancelSwap,
  completeSwap,
} from "../../services/clothingApi";

const TABS = [
  { key: "incoming", label: "Incoming" },
  { key: "outgoing", label: "Outgoing" },
  { key: "all", label: "All" },
];

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  negotiating: "bg-purple-100 text-purple-700",
  accepted: "bg-blue-100 text-blue-700",
  completed: "bg-moss-100 text-moss-800",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-200 text-gray-600",
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
    }`}
  >
    {status}
  </span>
);

const ItemThumb = ({ item, label }) => (
  <div className="flex items-center gap-3">
    <img
      src={getImageUrl(item?.images?.[0])}
      alt={item?.title || "Item"}
      className="w-16 h-16 rounded-xl object-cover border"
    />
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-gray-900">{item?.title || "Deleted item"}</p>
      <p className="text-sm text-moss-800 font-medium">
        {item?.estimatedValue ?? "-"} pts
      </p>
    </div>
  </div>
);

const Swaps = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("incoming");
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const loadSwaps = useCallback(async (type) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await getMySwaps({ type });
      setSwaps(data.swaps || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load swaps. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSwaps(activeTab);
  }, [activeTab, loadSwaps]);

  const runAction = async (action, id) => {
    try {
      setActionLoadingId(id);
      if (action === "accept") {
        await respondToSwap(id, { action: "accept" });
        toast.success("Swap accepted");
      } else if (action === "reject") {
        await respondToSwap(id, { action: "reject" });
        toast.success("Swap rejected");
      } else if (action === "negotiate") {
        await respondToSwap(id, { action: "negotiate" });
        toast.success("Marked as negotiating");
      } else if (action === "cancel") {
        await cancelSwap(id);
        toast.success("Swap cancelled");
      } else if (action === "complete") {
        await completeSwap(id);
        toast.success("Swap marked as completed");
      }
      loadSwaps(activeTab);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Swaps</h1>
            <p className="text-gray-500 mt-1">
              Track and manage your incoming and outgoing swap requests.
            </p>
          </div>

          <div className="flex gap-2 mb-8 bg-white rounded-2xl shadow-sm p-2 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-xl font-medium transition ${
                  activeTab === tab.key
                    ? "bg-moss-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
              {error}
            </div>
          ) : swaps.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
              No {activeTab} swaps yet.
            </div>
          ) : (
            <div className="space-y-5">
              {swaps.map((swap) => {
                const isOwner = swap.owner?._id === user?._id;
                const isRequester = swap.requester?._id === user?._id;
                const counterparty = isOwner ? swap.requester : swap.owner;
                const isExpanded = expandedId === swap._id;
                const isBusy = actionLoadingId === swap._id;

                return (
                  <div
                    key={swap._id}
                    className="bg-white rounded-2xl shadow-md p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <ItemThumb
                          item={swap.requestedItem}
                          label={isOwner ? "Your item" : "Requested"}
                        />
                        <ItemThumb
                          item={swap.offeredItem}
                          label={isOwner ? "Offered to you" : "Your offer"}
                        />
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-2">
                        <StatusBadge status={swap.status} />
                        <p className="text-sm text-gray-500">
                          With <span className="font-medium">{counterparty?.fullName || "Unknown"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-5">
                      {isOwner && swap.status === "pending" && (
                        <>
                          <button
                            disabled={isBusy}
                            onClick={() => runAction("accept", swap._id)}
                            className="px-4 py-2 rounded-lg bg-moss-800 text-white hover:bg-moss-700 disabled:opacity-50 transition text-sm font-medium"
                          >
                            Accept
                          </button>
                          <button
                            disabled={isBusy}
                            onClick={() => runAction("reject", swap._id)}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition text-sm font-medium"
                          >
                            Reject
                          </button>
                          <button
                            disabled={isBusy}
                            onClick={() => runAction("negotiate", swap._id)}
                            className="px-4 py-2 rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50 disabled:opacity-50 transition text-sm font-medium"
                          >
                            Negotiate
                          </button>
                        </>
                      )}

                      {isRequester &&
                        ["pending", "negotiating"].includes(swap.status) && (
                          <button
                            disabled={isBusy}
                            onClick={() => runAction("cancel", swap._id)}
                            className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-50 transition text-sm font-medium"
                          >
                            Cancel Request
                          </button>
                        )}

                      {swap.status === "accepted" && (
                        <button
                          disabled={isBusy}
                          onClick={() => runAction("complete", swap._id)}
                          className="px-4 py-2 rounded-lg bg-moss-800 text-white hover:bg-moss-700 disabled:opacity-50 transition text-sm font-medium"
                        >
                          Mark Completed
                        </button>
                      )}

                      {["pending", "negotiating", "accepted"].includes(
                        swap.status
                      ) && (
                        <Link
                          to={`/chat/${swap._id}`}
                          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-moss-800 text-moss-800 hover:bg-moss-50 transition text-sm font-medium"
                        >
                          <HiChatAlt2 />
                          Chat
                        </Link>
                      )}

                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : swap._id)
                        }
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition text-sm font-medium ml-auto"
                      >
                        Swap Details
                        {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t space-y-3 text-sm">
                        {swap.valueComparison && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              {swap.valueComparison.isFair ? (
                                <HiCheckCircle className="text-moss-800" />
                              ) : (
                                <HiClock className="text-yellow-500" />
                              )}
                              <span className="font-semibold">
                                {swap.valueComparison.isFair
                                  ? "Fair Swap"
                                  : "Value Mismatch"}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {swap.valueComparison.suggestion}
                            </p>
                            <p className="text-gray-500 mt-1">
                              Difference: {swap.valueComparison.difference} pts (
                              {swap.valueComparison.percentDiff}%)
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between text-gray-600">
                          <span>Exchange Method</span>
                          <span className="font-medium capitalize text-gray-800">
                            {swap.exchangeMethod}
                          </span>
                        </div>

                        {swap.message && (
                          <div>
                            <p className="text-gray-500 mb-1">Message</p>
                            <p className="bg-gray-50 rounded-xl p-3 text-gray-700">
                              {swap.message}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between text-gray-500">
                          <span>Requested</span>
                          <span>
                            {new Date(swap.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {swap.status === "rejected" && (
                      <p className="flex items-center gap-1 text-red-500 text-sm mt-3">
                        <HiXCircle /> This swap request was rejected.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Swaps;
