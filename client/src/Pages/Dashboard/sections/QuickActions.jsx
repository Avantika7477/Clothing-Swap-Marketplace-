import { Link } from "react-router-dom";
import {
  HiPlus,
  HiShoppingBag,
  HiSwitchHorizontal,
  HiChatAlt2,
} from "react-icons/hi";

const QuickActions = () => {
  const actions = [
    {
      title: "Add New Item",
      icon: <HiPlus className="text-xl" />,
      link: "/add-item",
      primary: true,
    },
    {
      title: "Marketplace",
      icon: <HiShoppingBag className="text-xl" />,
      link: "/marketplace",
    },
    {
      title: "My Swaps",
      icon: <HiSwitchHorizontal className="text-xl" />,
      link: "/swaps",
    },
    {
      title: "Messages",
      icon: <HiChatAlt2 className="text-xl" />,
      link: "/chat",
    },
  ];

  return (
    <div className="clay mb-8 p-5">
      <h2 className="font-display text-xl font-bold text-ink">Quick actions</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`flex flex-col items-center justify-center gap-2.5 p-4 text-center transition hover:-translate-y-1 ${
              action.primary
                ? "btn-premium btn-premium-primary"
                : "clay-sm text-moss-900"
            }`}
          >
            {action.icon}
            <span className="text-sm font-bold">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
