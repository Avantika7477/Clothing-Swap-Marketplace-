import { Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Marketplace from "../Pages/Marketplace/Marketplace";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";

import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import ForgotPassword from "../Pages/auth/ForgotPassword";

import Dashboard from "../Pages/Dashboard/DashBoard";
import Profile from "../Pages/Profile/Profile";
import AddItem from "../Pages/AddItem/AddItem";
import Swaps from "../Pages/Swaps/Swaps";
import SwapRequest from "../Pages/Swaps/SwapRequest";
import Chat from "../Pages/Chat/Chat";
import AdminPanel from "../Pages/Admin/AdminPanel";

import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/item/:id" element={<ItemDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-item"
        element={
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/swaps"
        element={
          <ProtectedRoute>
            <Swaps />
          </ProtectedRoute>
        }
      />
      <Route
        path="/swap-request/:itemId"
        element={
          <ProtectedRoute>
            <SwapRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:swapId"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="font-display text-5xl font-bold text-moss-800 sm:text-6xl">
              404
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">Page Not Found</p>
            <Link to="/" className="btn-premium btn-premium-primary mt-8">
              Back to Home
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
