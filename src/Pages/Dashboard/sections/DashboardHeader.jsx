import { HiBell } from "react-icons/hi";

const DashboardHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
          <span className="text-green-600"> {user?.fullName || "User"} 👋</span>
        </h1>

        <p className="text-gray-500 mt-2">{today}</p>
      </div>

      <button className="relative bg-white shadow-md rounded-full p-4 hover:shadow-lg transition">
        <HiBell className="text-2xl text-gray-700" />

        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>
    </div>
  );
};

export default DashboardHeader;
