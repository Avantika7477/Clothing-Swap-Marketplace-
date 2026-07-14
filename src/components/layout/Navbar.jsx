import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold"
      : "text-gray-700 hover:text-green-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">♻️</span>
          <h1 className="text-2xl font-bold text-green-600">Kaddly Swap</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
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

          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-center border border-green-600 text-green-600 py-2 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-center bg-green-600 text-white py-2 rounded-lg"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
