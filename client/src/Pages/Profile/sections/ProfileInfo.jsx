import {
  HiUser,
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiRefresh,
  HiStar,
} from "react-icons/hi";

const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        Profile Information
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-4">
          <HiUser className="text-moss-800 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <h3 className="font-semibold">
              {user?.fullName || "Guest User"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <HiMail className="text-moss-800 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <h3 className="font-semibold">
              {user?.email || "guest@example.com"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <HiLocationMarker className="text-moss-800 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <h3 className="font-semibold">
              Mohali, Punjab
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <HiPhone className="text-moss-800 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <h3 className="font-semibold">
              +91 98765 43210
            </h3>
          </div>
        </div>

        <hr />

        <div className="flex justify-between">
          <span className="text-gray-500">
            Member Since
          </span>

          <span className="font-semibold">
            July 2026
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-500">
            <HiRefresh />
            Total Swaps
          </span>

          <span className="font-semibold">
            18
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-500">
            <HiStar />
            Rating
          </span>

          <span className="text-yellow-500 font-semibold">
            ⭐ 4.8
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProfileInfo;