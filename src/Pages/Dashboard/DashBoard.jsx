import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-600">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Welcome to your Kaddly Swap dashboard.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome 👋
          </h2>

          <p className="text-gray-600">
            Authentication is working successfully.
          </p>

          <p className="mt-3 text-gray-600">
            In the next steps, this page will contain:
          </p>

          <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
            <li>Profile Overview</li>
            <li>My Listings</li>
            <li>Swap Requests</li>
            <li>Saved Items</li>
            <li>Statistics Cards</li>
            <li>Recent Activity</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;