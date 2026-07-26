import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-moss-800/10 bg-moss-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-lichen">Fashion Swap</p>
          <p className="mt-3 max-w-sm text-sm text-white/65">
            A clothing exchange marketplace for people who prefer swapping over shopping.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
            <Link to="/marketplace" className="hover:text-white">
              Marketplace
            </Link>
            <Link to="/register" className="hover:text-white">
              Join Fashion Swap
            </Link>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Impact
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Every completed swap keeps wearable clothes in circulation and out of landfill.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Fashion Swap. Clothing Exchange & Swap Marketplace.
      </div>
    </footer>
  );
};

export default Footer;
