import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

// Auth Pages
import LoginSelect from "./pages/LoginSelect";
import Login from "./pages/Login";
import CustomerSignup from "./pages/CustomerSignup";
import RetailerSignup from "./pages/RetailerSignup";

// Dashboards
import RetailerDashboard from "./pages/RetailerDashboard";
import CustomerOrders from "./pages/CustomerOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar onSearch={setSearch} />

      <div className="container">
        <Routes>
          {/* ===== PUBLIC ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* ===== CUSTOMER ===== */}
          <Route path="/products" element={<Products search={search} />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerOrders />
              </ProtectedRoute>
            }
          />

          {/* ===== LOGIN / SIGNUP ===== */}
          <Route path="/login" element={<LoginSelect />} />
          <Route path="/login/customer" element={<Login role="customer" />} />
          <Route path="/login/retailer" element={<Login role="retailer" />} />

          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/retailer" element={<RetailerSignup />} />

          {/* ===== RETAILER ===== */}
          <Route
            path="/retailer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["retailer"]}>
                <RetailerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ===== ADMIN ===== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

