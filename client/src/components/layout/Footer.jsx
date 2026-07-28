import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-moss-800/10 bg-moss-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:items-start">
        <div>
          <p className="font-display text-2xl text-lichen">Fashion Swap</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Swap wearable clothes, reduce waste, and refresh your wardrobe.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
            <Link to="/marketplace" className="hover:text-white">
              Marketplace
            </Link>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
            <Link to="/register" className="hover:text-white">
              Register
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Impact
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Every completed swap keeps clothes in circulation and out of landfill.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Fashion Swap
      </div>
    </footer>
  );
};

export default Footer;
