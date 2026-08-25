import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    ...(isAuthenticated
      ? [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Swaps", path: "/swaps" },
          { name: "Chat", path: "/chat" },
        ]
      : []),
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-moss-800 font-bold"
      : "text-ink/55 hover:text-moss-800 transition";

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <nav className="clay-sm mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6">
        <Link
          to="/"
          className="font-display text-[1.35rem] font-bold tracking-tight text-moss-900 md:text-[1.55rem]"
        >
          Fashion Swap
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/add-item"
                className="btn-premium btn-premium-primary min-h-11 px-5 py-2.5 text-sm"
              >
                List item
              </Link>
              <Link
                to="/profile"
                className="max-w-[8rem] truncate px-2 text-sm font-semibold text-ink/65 hover:text-moss-800"
              >
                {user?.fullName?.split(" ")[0] || "Profile"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-premium btn-premium-secondary min-h-11 px-5 py-2.5 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-premium btn-premium-secondary min-h-11 px-5 py-2.5 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-premium btn-premium-primary min-h-11 px-5 py-2.5 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="clay-sm flex h-10 w-10 items-center justify-center text-xl text-moss-800 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {isOpen && (
        <div className="clay mx-4 mt-2 max-w-7xl px-6 py-5 md:hidden xl:mx-auto">
          <div className="flex flex-col gap-3.5">
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
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/add-item"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-primary min-h-12 py-3 text-center text-base"
                >
                  List item
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-secondary min-h-12 py-3 text-center text-base"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-[1.25rem] border-2 border-red-200/80 bg-red-50 py-2.5 text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-secondary min-h-12 py-3 text-center text-base"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium btn-premium-primary min-h-12 py-3 text-center text-base"
                >
                  Register
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
