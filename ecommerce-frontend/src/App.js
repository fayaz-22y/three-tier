import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

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
import RetailerDashboard from "./pages/RetailerDashboard";


function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />

          {/* Login Selection */}
          <Route path="/login" element={<LoginSelect />} />

          {/* Login based on role */}
          <Route path="/login/customer" element={<Login role="customer" />} />
          <Route path="/login/retailer" element={<Login role="retailer" />} />

          {/* Signup based on role */}
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/retailer" element={<RetailerSignup />} />
	  <Route path="/retailer/dashboard" element={<RetailerDashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

