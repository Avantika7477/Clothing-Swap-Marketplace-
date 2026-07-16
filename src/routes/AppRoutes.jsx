import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Marketplace from "../Pages/Marketplace/Marketplace";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";

// Auth Pages
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/item/:id" element={<ItemDetails />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 404 Page (Optional) */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen text-2xl font-bold">
            404 | Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
