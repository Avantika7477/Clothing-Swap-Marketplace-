import { useState } from "react";
import { HiEye, HiEyeOff, HiLockClosed } from "react-icons/hi";

const ChangePasswordCard = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully!");

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const renderInput = (label, name, value, show, setShow) => (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
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

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <HiLockClosed className="text-3xl text-moss-800" />

        <h2 className="text-2xl font-bold">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {renderInput(
          "Current Password",
          "currentPassword",
          passwords.currentPassword,
          showCurrent,
          setShowCurrent,
        )}

        {renderInput(
          "New Password",
          "newPassword",
          passwords.newPassword,
          showNew,
          setShowNew,
        )}

        {renderInput(
          "Confirm Password",
          "confirmPassword",
          passwords.confirmPassword,
          showConfirm,
          setShowConfirm,
        )}

        <button
          type="submit"
          className="bg-moss-800 hover:bg-moss-700 text-white px-8 py-3 rounded-lg transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordCard;
