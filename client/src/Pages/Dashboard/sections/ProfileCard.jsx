import { Link } from "react-router-dom";
import { HiOutlineUserCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";
import { getImageUrl } from "../../../services/api";

const ProfileCard = () => {
  const { user } = useAuth();
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="clay">
      <div className="flex flex-col items-center text-center">
        {user?.avatar ? (
          <img
            src={getImageUrl(user.avatar)}
            alt={user.fullName}
            className="mb-4 h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
          />
        ) : (
          <div className="clay-sm mb-4 flex h-24 w-24 items-center justify-center rounded-full">
            <HiOutlineUserCircle className="text-7xl text-moss-800" />
          </div>
        )}

        <h2 className="max-w-full truncate font-display text-xl font-bold text-ink sm:text-2xl">
          {user?.fullName || "Guest User"}
        </h2>

        <p className="mt-2 max-w-full break-all text-sm text-ink/55">
          {user?.email || "guest@email.com"}
        </p>

        <div className="mt-6 w-full text-left text-sm">
          <div className="detail-row">
            <span className="detail-label">Member since</span>
            <span className="detail-value">{memberSince}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Location</span>
            <span className="detail-value truncate">
              {user?.location || user?.city || "Not set"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Swaps</span>
            <span className="detail-value">{user?.swapCount ?? 0}</span>
          </div>
        </div>

        <Link
          to="/profile"
          className="btn-premium btn-premium-primary mt-6 flex min-h-12 w-full items-center justify-center gap-2 text-sm"
        >
          <HiOutlinePencilAlt />
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
