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
    <div className="border border-moss-800/12 bg-white/75 p-6">
      <div className="flex flex-col items-center text-center">
        {user?.avatar ? (
          <img
            src={getImageUrl(user.avatar)}
            alt={user.fullName}
            className="mb-4 h-24 w-24 rounded-full border border-moss-800/10 object-cover"
          />
        ) : (
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-moss-50">
            <HiOutlineUserCircle className="text-7xl text-moss-800" />
          </div>
        )}

        <h2 className="font-display text-2xl font-medium text-ink">
          {user?.fullName || "Guest User"}
        </h2>

        <p className="mt-1 text-sm text-ink/55">
          {user?.email || "guest@email.com"}
        </p>

        <div className="mt-5 w-full space-y-2.5 text-left text-sm">
          <div className="flex justify-between gap-3 border-b border-moss-800/8 pb-2">
            <span className="text-ink/50">Member since</span>
            <span className="font-medium text-ink">{memberSince}</span>
          </div>

          <div className="flex justify-between gap-3 border-b border-moss-800/8 pb-2">
            <span className="text-ink/50">Location</span>
            <span className="font-medium text-ink">
              {user?.location || user?.city || "Not set"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-ink/50">Swaps</span>
            <span className="font-medium text-ink">{user?.swapCount ?? 0}</span>
          </div>
        </div>

        <Link
          to="/profile"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-moss-800 py-3 text-sm font-semibold text-white transition hover:bg-moss-700"
        >
          <HiOutlinePencilAlt />
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
