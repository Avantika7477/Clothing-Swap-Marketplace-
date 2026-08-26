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
    <div className="clay">
      <h2 className="font-display text-xl font-bold text-ink">Ready to Swap?</h2>

      <p className="mt-3 leading-relaxed text-ink/60">
        Send a swap request to the owner and negotiate through chat.
      </p>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleRequestSwap}
          disabled={isOwnItem || !available}
          className="btn-premium btn-premium-primary min-h-12 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isOwnItem ? "Your Listing" : "Request Swap"}
        </button>

        <Link
          to="/marketplace"
          className="btn-premium btn-premium-secondary min-h-12 w-full text-center"
        >
          Back to Marketplace
        </Link>
      </div>

      <div className="clay-inset mt-6">
        <p className="text-sm leading-relaxed text-moss-800">
          Every successful swap helps reduce textile waste and supports
          sustainable fashion.
        </p>
      </div>
    </div>
  );
};

export default SwapAction;
