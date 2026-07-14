import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Marketplace from "../Pages/Marketplace/Marketplace";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
