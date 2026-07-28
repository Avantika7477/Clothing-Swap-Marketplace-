import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi";
import { getMySwaps } from "../../../services/clothingApi";

const RecentSwaps = () => {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getMySwaps({ type: "all" });
        setSwaps((data.swaps || []).slice(0, 5));
      } catch {
        setSwaps([]);
      }
    };
    load();
  }, []);

  const getStatus = (status) => {
    if (status === "accepted" || status === "completed") {
      return (
        <span className="flex items-center gap-1 text-moss-800 font-medium capitalize">
          <HiCheckCircle />
          {status}
        </span>
      );
    }
    if (status === "pending" || status === "negotiating") {
      return (
        <span className="flex items-center gap-1 text-yellow-500 font-medium capitalize">
          <HiClock />
          {status}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-red-500 font-medium capitalize">
        <HiXCircle />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Swap Requests</h2>
        <Link to="/swaps" className="text-moss-800 hover:underline font-medium">
          View All
        </Link>
      </div>

      {swaps.length === 0 ? (
        <p className="text-gray-500">No swap activity yet.</p>
      ) : (
        <div className="space-y-4">
          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="flex flex-col md:flex-row justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {swap.requester?.fullName || "User"}
                </h3>
                <p className="text-gray-500">
                  Requested: {swap.requestedItem?.title || "Item"}
                </p>
              </div>
              <div className="mt-3 md:mt-0">{getStatus(swap.status)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSwaps;
