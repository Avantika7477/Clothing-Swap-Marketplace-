import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="page-shell pb-8 pt-4">
      <div className="clay-accent px-8 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_1fr] md:items-start">
          <div>
            <p className="font-display text-[1.7rem] font-bold tracking-tight text-white">
              Fashion Swap
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              A quieter way to refresh your wardrobe — swap wearable clothes, keep
              good pieces circulating.
            </p>
          </div>

          <div>
            <p className="section-kicker text-lichen">Explore</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/80">
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
            <p className="section-kicker text-lichen">Why swap</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Every completed swap keeps clothes in use longer and out of landfill.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Fashion Swap
        </div>
      </div>
    </footer>
  );
};

export default Footer;
