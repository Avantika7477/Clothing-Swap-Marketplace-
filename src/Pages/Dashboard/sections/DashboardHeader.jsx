import { Link } from "react-router-dom";
import { HiBell } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome Back,
          <span className="text-moss-800"> {user?.fullName || "User"}</span>
        </h1>
        <p className="text-gray-500 mt-2">{today}</p>
      </div>

      <Link
        to="/swaps"
        className="relative bg-white shadow-md rounded-full p-4 hover:shadow-lg transition"
      >
        <HiBell className="text-2xl text-gray-700" />
      </Link>
    </div>
  );
};

export default DashboardHeader;
