import {
  HiOutlineCollection,
  HiOutlineRefresh,
  HiOutlineClock,
  HiOutlineHeart,
} from "react-icons/hi";

const StatsCards = () => {
  const stats = [
    {
      id: 1,
      title: "My Listings",
      value: 12,
      icon: <HiOutlineCollection className="text-3xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      id: 2,
      title: "Completed Swaps",
      value: 8,
      icon: <HiOutlineRefresh className="text-3xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      id: 3,
      title: "Pending Requests",
      value: 4,
      icon: <HiOutlineClock className="text-3xl text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Saved Items",
      value: 15,
      icon: <HiOutlineHeart className="text-3xl text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>

              <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
            </div>

            <div
              className={`${stat.bg} w-14 h-14 rounded-full flex items-center justify-center`}
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
