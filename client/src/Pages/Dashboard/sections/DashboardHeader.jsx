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
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
          Welcome back,{" "}
          <span className="text-moss-800">{user?.fullName || "User"}</span>
        </h1>
        <p className="mt-2 text-sm text-ink/55">{today}</p>
      </div>

      <Link
        to="/swaps"
        className="clay-sm inline-flex items-center justify-center p-3 text-moss-800 transition hover:-translate-y-0.5"
        aria-label="Open swaps"
      >
        <HiBell className="text-xl" />
      </Link>
    </div>
  );
};

export default DashboardHeader;
