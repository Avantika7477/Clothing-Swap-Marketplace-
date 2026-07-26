import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-moss-800/10 bg-moss-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl text-lichen md:text-3xl">
            Fashion Swap
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            A clothing exchange marketplace for people who prefer swapping over
            shopping — fair value matches, local options, and zero checkout.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Explore
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            <Link to="/marketplace" className="hover:text-white">
              Marketplace
            </Link>
            <Link to="/add-item" className="hover:text-white">
              List an item
            </Link>
            <Link to="/" className="hover:text-white">
              How it works
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Account
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
            <Link to="/register" className="hover:text-white">
              Register
            </Link>
            <Link to="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <Link to="/swaps" className="hover:text-white">
              My swaps
            </Link>
            <Link to="/chat" className="hover:text-white">
              Messages
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Impact
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            Every completed swap keeps wearable clothes in circulation and out
            of landfill — building a community around sustainable fashion.
          </p>
          <p className="mt-6 text-sm text-white/50">
            Phase 1 · Barter-first clothing exchange
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Fashion Swap. Clothing Exchange & Swap
        Marketplace.
      </div>
    </footer>
  );
};

export default Footer;
