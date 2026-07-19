import { HiOutlineUserCircle, HiOutlinePencilAlt } from "react-icons/hi";

const ProfileCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col items-center text-center">

        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <HiOutlineUserCircle className="text-7xl text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {user?.fullName || "Guest User"}
        </h2>

        <p className="text-gray-500 mt-1">
          {user?.email || "guest@email.com"}
        </p>

        <div className="mt-5 space-y-2 w-full text-left">

          <div className="flex justify-between">
            <span className="text-gray-500">Member Since</span>
            <span className="font-medium">July 2026</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Location</span>
            <span className="font-medium">Mohali</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-semibold">
              Active
            </span>
          </div>

        </div>

        <button className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition">
          <HiOutlinePencilAlt />
          Edit Profile
        </button>

      </div>
    </div>
  );
};

export default ProfileCard;