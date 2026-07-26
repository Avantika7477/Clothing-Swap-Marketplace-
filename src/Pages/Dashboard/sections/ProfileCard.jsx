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
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col items-center text-center">
        {user?.avatar ? (
          <img
            src={getImageUrl(user.avatar)}
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover border mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-moss-100 flex items-center justify-center mb-4">
            <HiOutlineUserCircle className="text-7xl text-moss-800" />
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800">
          {user?.fullName || "Guest User"}
        </h2>

        <p className="text-gray-500 mt-1">{user?.email || "guest@email.com"}</p>

        <div className="mt-5 space-y-2 w-full text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Member Since</span>
            <span className="font-medium">{memberSince}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Location</span>
            <span className="font-medium">
              {user?.location || user?.city || "Not set"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Swaps</span>
            <span className="font-medium">{user?.swapCount ?? 0}</span>
          </div>
        </div>

        <Link
          to="/profile"
          className="mt-6 w-full flex items-center justify-center gap-2 bg-moss-800 hover:bg-moss-700 text-white py-3 rounded-xl transition"
        >
          <HiOutlinePencilAlt />
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
