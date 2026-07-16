import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../Pages/Home/Home";
import Marketplace from "../Pages/Marketplace/Marketplace";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";

// Authentication Pages
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";

// Protected Pages
import Dashboard from "../Pages/Dashboard/Dashboard";

// Protected Route Component
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/item/:id" element={<ItemDetails />} />

      {/* ---------- Authentication ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* ---------- Protected Routes ---------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------- 404 Page ---------- */}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold text-green-600">
              404
            </h1>

            <p className="mt-4 text-xl text-gray-600">
              Page Not Found
            </p>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;