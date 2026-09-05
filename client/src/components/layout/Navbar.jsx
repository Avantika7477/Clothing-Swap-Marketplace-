import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiOutlineSearch, HiOutlineUser, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/marketplace" },
    ...(isAuthenticated
      ? [
          { name: "My Account", path: "/dashboard" },
          { name: "Swaps", path: "/swaps" },
        ]
      : []),
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const linkClasses = ({ isActive }) =>
    `store-nav-link ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <header className="store-header sticky top-0 z-50">
      <div className="announcement-bar">
        Free local swaps · Sustainable fashion exchange
      </div>

      <div className="page-shell">
        <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-2 py-3 sm:gap-3 sm:py-4 lg:grid-cols-[1fr_auto_1fr]">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-xl text-moss-800 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink key={link.name} to={link.path} className={linkClasses}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <Link
            to="/"
            className="justify-self-center text-center font-display text-lg font-bold tracking-tight text-moss-900 sm:text-2xl"
          >
            Fashion Swap
          </Link>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-11 w-11 items-center justify-center text-xl text-moss-800"
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <HiOutlineSearch />
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/chat"
                  className="hidden h-11 w-11 items-center justify-center text-xl text-moss-800 sm:flex"
                  aria-label="Messages"
                >
                  <HiOutlineSwitchHorizontal />
                </Link>
                <Link
                  to="/profile"
                  className="flex h-11 w-11 items-center justify-center text-xl text-moss-800"
                  aria-label="Account"
                >
                  <HiOutlineUser />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="flex h-11 w-11 items-center justify-center text-xl text-moss-800"
                aria-label="Login"
              >
                <HiOutlineUser />
              </Link>
            )}

            <Link
              to={isAuthenticated ? "/add-item" : "/register"}
              className="btn-premium btn-premium-primary ml-1 hidden min-h-10 px-3 py-2 text-[10px] sm:inline-flex sm:px-4 sm:text-xs"
            >
              {isAuthenticated ? "Sell item" : "Join"}
            </Link>
          </div>
        </nav>

        {searchOpen && (
          <form onSubmit={handleSearch} className="border-t border-moss-800/10 py-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="field-input flex-1 rounded-none"
                autoFocus
              />
              <button
                type="submit"
                className="btn-premium btn-premium-primary w-full px-5 sm:w-auto"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </div>

      {isOpen && (
        <div className="border-t border-moss-800/10 bg-white px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink to="/chat" className={linkClasses} onClick={() => setIsOpen(false)}>
                Messages
              </NavLink>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-moss-800/10 pt-5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/add-item"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-primary w-full text-center"
                >
                  Sell item
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-premium btn-premium-secondary w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-secondary w-full text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-primary w-full text-center"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
