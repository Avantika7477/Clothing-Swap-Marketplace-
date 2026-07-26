import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  HiUsers,
  HiShoppingBag,
  HiSwitchHorizontal,
  HiChatAlt2,
  HiCheckCircle,
  HiTrendingUp,
  HiBan,
} from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import {
  getAdminAnalytics,
  getAdminUsers,
  toggleUserStatus,
  getAdminListings,
  adminRemoveListing,
  getAdminSwaps,
  resolveDispute,
} from "../../services/clothingApi";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "users", label: "Users" },
  { key: "listings", label: "Listings" },
  { key: "swaps", label: "Swaps" },
];

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  negotiating: "bg-purple-100 text-purple-700",
  accepted: "bg-blue-100 text-blue-700",
  completed: "bg-moss-100 text-moss-800",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-200 text-gray-600",
  available: "bg-moss-100 text-moss-800",
  swapped: "bg-blue-100 text-blue-700",
  removed: "bg-gray-200 text-gray-600",
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
    }`}
  >
    {status}
  </span>
);

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-moss-100 flex items-center justify-center">
      <Icon className="text-2xl text-moss-800" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const AdminPanel = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const [analytics, setAnalytics] = useState(null);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [swaps, setSwaps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadOverview = useCallback(async () => {
    const { data } = await getAdminAnalytics();
    setAnalytics(data.analytics);
    setRecentSwaps(data.recentSwaps || []);
  }, []);

  const loadUsers = useCallback(async () => {
    const { data } = await getAdminUsers();
    setUsers(data.users || []);
  }, []);

  const loadListings = useCallback(async () => {
    const { data } = await getAdminListings();
    setListings(data.listings || []);
  }, []);

  const loadSwaps = useCallback(async () => {
    const { data } = await getAdminSwaps();
    setSwaps(data.swaps || []);
  }, []);

  const loadTab = useCallback(
    async (tab) => {
      try {
        setLoading(true);
        setError("");
        if (tab === "overview") await loadOverview();
        else if (tab === "users") await loadUsers();
        else if (tab === "listings") await loadListings();
        else if (tab === "swaps") await loadSwaps();
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load admin data."
        );
      } finally {
        setLoading(false);
      }
    },
    [loadOverview, loadUsers, loadListings, loadSwaps]
  );

  useEffect(() => {
    if (isAdmin) loadTab(activeTab);
  }, [activeTab, isAdmin, loadTab]);

  const handleToggleUser = async (id) => {
    try {
      setBusyId(id);
      const { data } = await toggleUserStatus(id);
      toast.success(data.message);
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user.");
    } finally {
      setBusyId(null);
    }
  };

  const handleRemoveListing = async (id) => {
    try {
      setBusyId(id);
      await adminRemoveListing(id);
      toast.success("Listing removed");
      loadListings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove listing.");
    } finally {
      setBusyId(null);
    }
  };

  const handleResolveSwap = async (id, resolution) => {
    try {
      setBusyId(id);
      const { data } = await resolveDispute(id, { resolution });
      toast.success(data.message);
      loadSwaps();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resolve swap.");
    } finally {
      setBusyId(null);
    }
  };

  if (authLoading) {
    return (
      <MainLayout>
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          <Loader />
        </section>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return (
      <MainLayout>
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-500">
              You need admin privileges to view this page.
            </p>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 mt-1">
              Manage users, listings, and swap disputes across the platform.
            </p>
          </div>

          <div className="flex gap-2 mb-8 bg-white rounded-2xl shadow-sm p-2 w-fit flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-xl font-medium transition ${
                  activeTab === tab.key
                    ? "bg-moss-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
              {error}
            </div>
          ) : (
            <>
              {activeTab === "overview" && analytics && (
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                      icon={HiUsers}
                      label="Total Users"
                      value={analytics.totalUsers}
                    />
                    <StatCard
                      icon={HiUsers}
                      label="Active Users"
                      value={analytics.activeUsers}
                    />
                    <StatCard
                      icon={HiShoppingBag}
                      label="Total Listings"
                      value={analytics.totalListings}
                    />
                    <StatCard
                      icon={HiShoppingBag}
                      label="Available Listings"
                      value={analytics.availableListings}
                    />
                    <StatCard
                      icon={HiSwitchHorizontal}
                      label="Total Swaps"
                      value={analytics.totalSwaps}
                    />
                    <StatCard
                      icon={HiCheckCircle}
                      label="Completed Swaps"
                      value={analytics.completedSwaps}
                    />
                    <StatCard
                      icon={HiChatAlt2}
                      label="Total Messages"
                      value={analytics.totalMessages}
                    />
                    <StatCard
                      icon={HiTrendingUp}
                      label="Conversion Rate"
                      value={`${analytics.conversionRate}%`}
                    />
                  </div>

                  {analytics.listingsByCategory?.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">
                        Listings by Category
                      </h2>
                      <div className="space-y-3">
                        {analytics.listingsByCategory.map((cat) => (
                          <div
                            key={cat._id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-600">{cat._id}</span>
                            <span className="font-semibold">{cat.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Swaps</h2>
                    {recentSwaps.length === 0 ? (
                      <p className="text-gray-500">No recent swaps.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="text-gray-400 border-b">
                              <th className="py-2 pr-4">Requester</th>
                              <th className="py-2 pr-4">Owner</th>
                              <th className="py-2 pr-4">Requested Item</th>
                              <th className="py-2 pr-4">Offered Item</th>
                              <th className="py-2 pr-4">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentSwaps.map((swap) => (
                              <tr key={swap._id} className="border-b last:border-0">
                                <td className="py-3 pr-4">
                                  {swap.requester?.fullName}
                                </td>
                                <td className="py-3 pr-4">{swap.owner?.fullName}</td>
                                <td className="py-3 pr-4">
                                  {swap.requestedItem?.title}
                                </td>
                                <td className="py-3 pr-4">
                                  {swap.offeredItem?.title}
                                </td>
                                <td className="py-3 pr-4">
                                  <StatusBadge status={swap.status} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "users" && (
                <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
                  <h2 className="text-xl font-bold mb-4">Users</h2>
                  {users.length === 0 ? (
                    <p className="text-gray-500">No users found.</p>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-gray-400 border-b">
                          <th className="py-2 pr-4">Name</th>
                          <th className="py-2 pr-4">Email</th>
                          <th className="py-2 pr-4">Location</th>
                          <th className="py-2 pr-4">Swaps</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u._id} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium">{u.fullName}</td>
                            <td className="py-3 pr-4">{u.email}</td>
                            <td className="py-3 pr-4">{u.location || "-"}</td>
                            <td className="py-3 pr-4">{u.swapCount ?? 0}</td>
                            <td className="py-3 pr-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  u.isActive === false
                                    ? "bg-red-100 text-red-600"
                                    : "bg-moss-100 text-moss-800"
                                }`}
                              >
                                {u.isActive === false ? "Inactive" : "Active"}
                              </span>
                            </td>
                            <td className="py-3 pr-4">
                              <button
                                disabled={busyId === u._id}
                                onClick={() => handleToggleUser(u._id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition text-xs font-medium"
                              >
                                <HiBan />
                                Toggle Status
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === "listings" && (
                <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
                  <h2 className="text-xl font-bold mb-4">Listings</h2>
                  {listings.length === 0 ? (
                    <p className="text-gray-500">No listings found.</p>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-gray-400 border-b">
                          <th className="py-2 pr-4">Title</th>
                          <th className="py-2 pr-4">Brand</th>
                          <th className="py-2 pr-4">Owner</th>
                          <th className="py-2 pr-4">Value</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listings.map((listing) => (
                          <tr key={listing._id} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium">
                              {listing.title}
                            </td>
                            <td className="py-3 pr-4">{listing.brand}</td>
                            <td className="py-3 pr-4">
                              {listing.owner?.fullName || "-"}
                            </td>
                            <td className="py-3 pr-4">
                              {listing.estimatedValue} pts
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={listing.status} />
                            </td>
                            <td className="py-3 pr-4">
                              {listing.status !== "removed" && (
                                <button
                                  disabled={busyId === listing._id}
                                  onClick={() => handleRemoveListing(listing._id)}
                                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition text-xs font-medium"
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === "swaps" && (
                <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
                  <h2 className="text-xl font-bold mb-4">Swaps</h2>
                  {swaps.length === 0 ? (
                    <p className="text-gray-500">No swaps found.</p>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-gray-400 border-b">
                          <th className="py-2 pr-4">Requester</th>
                          <th className="py-2 pr-4">Owner</th>
                          <th className="py-2 pr-4">Items</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {swaps.map((swap) => (
                          <tr key={swap._id} className="border-b last:border-0">
                            <td className="py-3 pr-4">
                              {swap.requester?.fullName}
                            </td>
                            <td className="py-3 pr-4">{swap.owner?.fullName}</td>
                            <td className="py-3 pr-4">
                              {swap.requestedItem?.title} ↔ {swap.offeredItem?.title}
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={swap.status} />
                            </td>
                            <td className="py-3 pr-4">
                              {["pending", "negotiating", "accepted"].includes(
                                swap.status
                              ) && (
                                <div className="flex gap-2">
                                  <button
                                    disabled={busyId === swap._id}
                                    onClick={() =>
                                      handleResolveSwap(swap._id, "complete")
                                    }
                                    className="px-3 py-1.5 rounded-lg bg-moss-800 text-white hover:bg-moss-700 disabled:opacity-50 transition text-xs font-medium"
                                  >
                                    Complete
                                  </button>
                                  <button
                                    disabled={busyId === swap._id}
                                    onClick={() =>
                                      handleResolveSwap(swap._id, "cancel")
                                    }
                                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition text-xs font-medium"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminPanel;
