import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="store-footer">
      <div className="page-shell py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <p className="font-display text-xl font-bold text-white">
              Fashion Swap
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
              Your sustainable fashion marketplace. Browse, list, and swap
              pre-loved clothing.
            </p>
          </div>

          <div>
            <p className="store-footer-heading">Shop</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/marketplace">All products</Link>
              <Link to="/marketplace" state={{ category: "Jackets" }}>
                Jackets
              </Link>
              <Link to="/marketplace" state={{ category: "Dresses" }}>
                Dresses
              </Link>
              <Link to="/marketplace" state={{ category: "Shoes" }}>
                Shoes
              </Link>
            </div>
          </div>

          <div>
            <p className="store-footer-heading">Account</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/dashboard">My account</Link>
              <Link to="/add-item">Sell an item</Link>
            </div>
          </div>

          <div>
            <p className="store-footer-heading">Help</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/swaps">My swaps</Link>
              <Link to="/chat">Messages</Link>
              <Link to="/marketplace">How swapping works</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Fashion Swap. All rights reserved.</p>
          <p>Swap marketplace · Sustainable fashion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
