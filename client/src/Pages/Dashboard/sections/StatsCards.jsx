import { useEffect, useState } from "react";
import {
  HiOutlineCollection,
  HiOutlineRefresh,
  HiOutlineClock,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { getMyListings, getMySwaps } from "../../../services/clothingApi";

const StatsCards = () => {
  const [stats, setStats] = useState({
    listings: 0,
    completed: 0,
    pending: 0,
    chats: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [listingsRes, swapsRes] = await Promise.all([
          getMyListings(),
          getMySwaps({ type: "all" }),
        ]);
        const listings = listingsRes.data.listings || [];
        const swaps = swapsRes.data.swaps || [];

        setStats({
          listings: listings.length,
          completed: swaps.filter((s) => s.status === "completed").length,
          pending: swaps.filter((s) =>
            ["pending", "negotiating"].includes(s.status)
          ).length,
          chats: swaps.filter((s) =>
            ["pending", "negotiating", "accepted"].includes(s.status)
          ).length,
        });
      } catch {
        // keep defaults
      }
    };
    load();
  }, []);

  const cards = [
    {
      id: 1,
      title: "My Listings",
      value: stats.listings,
      icon: <HiOutlineCollection className="text-3xl text-moss-800" />,
      bg: "bg-moss-100",
    },
    {
      id: 2,
      title: "Completed Swaps",
      value: stats.completed,
      icon: <HiOutlineRefresh className="text-3xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      id: 3,
      title: "Pending Requests",
      value: stats.pending,
      icon: <HiOutlineClock className="text-3xl text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Active Chats",
      value: stats.chats,
      icon: <HiOutlineChatAlt2 className="text-3xl text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      {cards.map((stat) => (
        <div
          key={stat.id}
          className="premium-surface rounded-3xl p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-ink/55 text-sm">{stat.title}</p>
              <h2 className="font-display text-3xl font-medium mt-2 text-ink">
                {stat.value}
              </h2>
            </div>
            <div
              className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
