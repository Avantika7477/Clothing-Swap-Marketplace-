import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const SwapAction = ({ listing }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const itemId = listing?._id || listing?.id;
  const isOwnItem = listing?.owner?._id === user?._id;
  const available = listing?.status
    ? listing.status === "available"
    : listing?.available !== false;

  const handleRequestSwap = () => {
    if (!isAuthenticated) {
      toast.error("Please login to request a swap.");
      navigate("/login", { state: { from: `/swap-request/${itemId}` } });
      return;
    }

    if (isOwnItem) {
      toast.error("You cannot swap your own item.");
      return;
    }

    if (!available) {
      toast.error("This item is no longer available.");
      return;
    }

    navigate(`/swap-request/${itemId}`);
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Ready to Swap?</h2>

      <p className="text-gray-600 mb-6">
        Send a swap request to the owner and negotiate through chat.
      </p>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleRequestSwap}
          disabled={isOwnItem || !available}
          className="w-full rounded-xl bg-moss-800 py-3 font-semibold text-white transition hover:bg-moss-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isOwnItem ? "Your Listing" : "Request Swap"}
        </button>

        <Link
          to="/marketplace"
          className="block text-center w-full border py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Back to Marketplace
        </Link>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-moss-50 border border-moss-800/20">
        <p className="text-sm text-moss-800">
          Every successful swap helps reduce textile waste and supports sustainable fashion.
        </p>
      </div>
    </div>
  );
};

export default SwapAction;
