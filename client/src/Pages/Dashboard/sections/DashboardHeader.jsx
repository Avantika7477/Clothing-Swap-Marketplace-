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
    <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
      <div>
        <p className="section-kicker">Dashboard</p>
        <h1 className="mt-2 font-display text-3xl font-medium text-ink md:text-4xl">
          Welcome back,{" "}
          <span className="text-moss-800">{user?.fullName || "User"}</span>
        </h1>
        <p className="mt-2 text-sm text-ink/55">{today}</p>
      </div>

      <Link
        to="/swaps"
        className="inline-flex items-center justify-center border border-moss-800/12 bg-white/75 p-3 text-moss-800 transition hover:bg-white"
        aria-label="Open swaps"
      >
        <HiBell className="text-xl" />
      </Link>
    </div>
  );
};

export default DashboardHeader;
