import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-moss-800/20 bg-white/50 py-20">
      <h2 className="font-display text-3xl font-medium text-ink">No clothing found</h2>
      <p className="mt-3 max-w-md text-center text-ink/55">
        Try a different category, location, or search term — or clear filters and browse everything.
      </p>
      <Link
        to="/marketplace"
        className="mt-8 rounded-xl bg-moss-800 px-6 py-3 text-sm font-semibold text-white hover:bg-moss-700"
      >
        Browse all items
      </Link>
    </div>
  );
};

export default EmptyState;
