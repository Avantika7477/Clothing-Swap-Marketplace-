import { HiUserCircle } from "react-icons/hi";

const ProfileHeader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-5">
        <div className="w-24 h-24 rounded-full bg-moss-100 flex items-center justify-center">
          <HiUserCircle className="text-6xl text-moss-800" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

          <p className="text-gray-500 mt-1">
            Manage your personal information and account settings.
          </p>
        </div>
      </div>

      <button className="bg-moss-800 hover:bg-moss-700 text-white px-6 py-3 rounded-lg transition">
        Upload Photo
      </button>
    </div>
  );
};

export default ProfileHeader;
