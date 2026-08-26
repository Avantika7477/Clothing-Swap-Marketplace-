import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="page-shell pb-6 pt-4 sm:pb-8">
      <div className="clay-accent px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr_1fr] md:items-start md:gap-10">
          <div className="min-w-0">
            <p className="font-display text-xl font-bold tracking-tight text-white sm:text-[1.7rem]">
              Fashion Swap
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              A quieter way to refresh your wardrobe — swap wearable clothes, keep
              good pieces circulating.
            </p>
          </div>

          <div>
            <p className="section-kicker text-white/50">Explore</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
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
            <p className="section-kicker text-white/50">Why swap</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Every completed swap keeps clothes in use longer and out of landfill.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/45 sm:mt-10">
          © {new Date().getFullYear()} Fashion Swap
        </div>
      </div>
    </footer>
  );
};

export default Footer;
