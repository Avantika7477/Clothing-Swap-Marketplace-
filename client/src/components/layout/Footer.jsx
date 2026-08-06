import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-moss-800/10 bg-moss-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_0.7fr_1fr] md:items-start">
        <div>
          <p className="font-display text-[1.7rem] tracking-tight text-lichen">
            Fashion Swap
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            A quieter way to refresh your wardrobe — swap wearable clothes, keep
            good pieces circulating.
          </p>
        </div>

        <div>
          <p className="section-kicker text-white/35">Explore</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            <Link to="/marketplace" className="transition hover:text-white">
              Marketplace
            </Link>
            <Link to="/login" className="transition hover:text-white">
              Login
            </Link>
            <Link to="/register" className="transition hover:text-white">
              Register
            </Link>
          </div>
        </div>

        <div>
          <p className="section-kicker text-white/35">Why swap</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Every completed swap keeps clothes in use longer and out of landfill.
          </p>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Fashion Swap
      </div>
    </footer>
  );
};

export default Footer;
