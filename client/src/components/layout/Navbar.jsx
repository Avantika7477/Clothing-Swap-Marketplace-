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
      ? "text-moss-900 font-semibold"
      : "text-ink/60 hover:text-moss-800 transition";

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-moss-800/10 bg-[#f6f4f1]/92 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link
          to="/"
          className="font-display text-[1.35rem] font-medium tracking-tight text-moss-900 md:text-[1.55rem]"
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
                className="rounded-lg bg-moss-800 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-moss-700"
              >
                List item
              </Link>
              <Link
                to="/profile"
                className="px-2 text-sm font-medium text-ink/65 hover:text-moss-800"
              >
                {user?.fullName?.split(" ")[0] || "Profile"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-moss-800/18 px-3.5 py-2 text-sm text-ink/75 transition hover:bg-white/70"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-moss-800 transition hover:bg-white/60"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-moss-800 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-moss-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="text-2xl text-moss-800 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-moss-800/10 bg-[#f1efeb] px-6 py-5 md:hidden">
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
                  className="rounded-lg bg-moss-800 py-2.5 text-center text-sm font-semibold text-white"
                >
                  List item
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-moss-800/15 py-2.5 text-center text-sm"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-red-200/80 py-2.5 text-sm text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-moss-800/20 py-2.5 text-center text-sm font-semibold text-moss-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-moss-800 py-2.5 text-center text-sm font-semibold text-white"
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
