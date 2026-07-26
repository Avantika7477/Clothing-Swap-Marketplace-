import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  HiUserCircle,
  HiCamera,
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiRefresh,
  HiLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../services/api";
import { updateProfile, changePassword } from "../../services/clothingApi";

const Profile = () => {
  const { user, loading: authLoading, updateLocalUser } = useAuth();
  const fileInputRef = useRef(null);

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    city: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        location: user.location || "",
        city: user.city || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleProfileChange = (e) => {
    setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      let payload;

      if (avatarFile) {
        payload = new FormData();
        Object.entries(profileForm).forEach(([key, value]) =>
          payload.append(key, value)
        );
        payload.append("avatar", avatarFile);
      } else {
        payload = profileForm;
      }

      const { data } = await updateProfile(payload);
      updateLocalUser(data.user);
      setAvatarFile(null);
      setAvatarPreview("");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    try {
      setSavingPassword(true);
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const renderPasswordInput = (label, name, value, show, setShow) => (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handlePasswordChange}
          required
          minLength={name === "currentPassword" ? undefined : 6}
          className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-moss-700"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <HiEyeOff /> : <HiEye />}
        </button>
      </div>
    </div>
  );

  if (authLoading) {
    return (
      <MainLayout>
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          <Loader />
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-moss-100 flex items-center justify-center overflow-hidden">
                {avatarPreview || user?.avatar ? (
                  <img
                    src={avatarPreview || getImageUrl(user.avatar)}
                    alt={user?.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <HiUserCircle className="text-6xl text-moss-800" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Profile
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage your personal information and account settings.
                </p>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-moss-800 hover:bg-moss-700 text-white px-6 py-3 rounded-lg transition"
            >
              <HiCamera />
              Change Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Profile Information
                </h2>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <HiUserCircle className="text-moss-800 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <h3 className="font-semibold">
                        {user?.fullName || "-"}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <HiMail className="text-moss-800 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <h3 className="font-semibold">{user?.email || "-"}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <HiLocationMarker className="text-moss-800 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <h3 className="font-semibold">
                        {user?.location || "Not set"}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <HiPhone className="text-moss-800 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <h3 className="font-semibold">
                        {user?.phone || "Not set"}
                      </h3>
                    </div>
                  </div>

                  <hr />

                  <div className="flex justify-between">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-semibold">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-gray-500">
                      <HiRefresh />
                      Total Swaps
                    </span>
                    <span className="font-semibold">
                      {user?.swapCount ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <form
                onSubmit={handleProfileSubmit}
                className="bg-white rounded-2xl shadow-md p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileForm.fullName}
                      onChange={handleProfileChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={profileForm.city}
                      onChange={handleProfileChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Bio</label>
                    <textarea
                      rows="5"
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      placeholder="Tell others something about yourself..."
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="bg-moss-800 hover:bg-moss-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition"
                  >
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={handlePasswordSubmit}
                className="bg-white rounded-2xl shadow-md p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <HiLockClosed className="text-3xl text-moss-800" />
                  <h2 className="text-2xl font-bold">Change Password</h2>
                </div>

                <div className="space-y-5">
                  {renderPasswordInput(
                    "Current Password",
                    "currentPassword",
                    passwords.currentPassword,
                    showCurrent,
                    setShowCurrent
                  )}
                  {renderPasswordInput(
                    "New Password",
                    "newPassword",
                    passwords.newPassword,
                    showNew,
                    setShowNew
                  )}
                  {renderPasswordInput(
                    "Confirm Password",
                    "confirmPassword",
                    passwords.confirmPassword,
                    showConfirm,
                    setShowConfirm
                  )}

                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="bg-moss-800 hover:bg-moss-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition"
                  >
                    {savingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
