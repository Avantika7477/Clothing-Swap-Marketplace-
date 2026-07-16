import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Marketplace from "../Pages/Marketplace/Marketplace";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
  );
}

export default AppRoutes;
