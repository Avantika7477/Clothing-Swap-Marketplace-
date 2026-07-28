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
      ? "text-moss-800 font-semibold"
      : "text-ink/70 hover:text-moss-800 transition";

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-moss-800/10 bg-[#f7f5f1]/88 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-medium text-moss-800 md:text-2xl">
          Fashion Swap
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/add-item"
                className="rounded-xl bg-moss-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss-700"
              >
                List item
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium text-ink/70 hover:text-moss-800"
              >
                {user?.fullName?.split(" ")[0] || "Profile"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-moss-800/20 px-4 py-2 text-sm transition hover:bg-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-moss-800/25 px-4 py-2 text-sm font-semibold text-moss-800 transition hover:bg-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-moss-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="text-3xl text-moss-800 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-moss-800/10 bg-[#f4f7f5] px-6 py-4 md:hidden">
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
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/add-item"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-moss-800 py-2 text-center text-white"
                >
                  List item
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border py-2 text-center"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-red-200 py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-moss-800/30 py-2 text-center text-moss-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-moss-800 py-2 text-center text-white"
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
