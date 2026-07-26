import { Link } from "react-router-dom";
import { HiPlus, HiShoppingBag, HiSwitchHorizontal, HiChatAlt2 } from "react-icons/hi";

const QuickActions = () => {
  const actions = [
    {
      title: "Add New Item",
      icon: <HiPlus className="text-2xl" />,
      link: "/add-item",
      color: "bg-moss-800 hover:bg-moss-700",
    },
    {
      title: "Marketplace",
      icon: <HiShoppingBag className="text-2xl" />,
      link: "/marketplace",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "My Swaps",
      icon: <HiSwitchHorizontal className="text-2xl" />,
      link: "/swaps",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Messages",
      icon: <HiChatAlt2 className="text-2xl" />,
      link: "/chat",
      color: "bg-gray-700 hover:bg-gray-800",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`${action.color} text-white rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition duration-300 hover:scale-105`}
          >
            {action.icon}
            <span className="font-medium text-center">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
