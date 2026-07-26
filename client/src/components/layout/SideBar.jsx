import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/add-item">Add Item</Link>
        <Link to="/swaps">Swaps</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/marketplace">Marketplace</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
