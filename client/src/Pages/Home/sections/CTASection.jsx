import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-moss-800 text-white">
      <div className="page-shell home-section text-center">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/60">
          Join the marketplace
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl">
          Turn your wardrobe into a storefront
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
          Create a free account, list your items, and start swapping with
          shoppers near you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/register"
            className="btn-premium min-h-12 border border-white bg-white px-8 text-moss-900 hover:opacity-90"
          >
            Create account
          </Link>
          <Link to="/marketplace" className="btn-ghost min-h-12 px-8">
            Browse shop
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
