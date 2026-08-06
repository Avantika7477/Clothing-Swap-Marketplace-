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
      icon: <HiOutlineCollection className="text-2xl text-moss-800" />,
    },
    {
      id: 2,
      title: "Completed Swaps",
      value: stats.completed,
      icon: <HiOutlineRefresh className="text-2xl text-moss-700" />,
    },
    {
      id: 3,
      title: "Pending Requests",
      value: stats.pending,
      icon: <HiOutlineClock className="text-2xl text-moss-700" />,
    },
    {
      id: 4,
      title: "Active Chats",
      value: stats.chats,
      icon: <HiOutlineChatAlt2 className="text-2xl text-moss-700" />,
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((stat) => (
        <div
          key={stat.id}
          className="border border-moss-800/12 bg-white/75 p-5 transition hover:border-moss-800/20 hover:bg-white/90"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-ink/55">{stat.title}</p>
              <h2 className="mt-1.5 font-display text-3xl font-medium text-ink">
                {stat.value}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center border border-moss-800/10 bg-moss-50">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
