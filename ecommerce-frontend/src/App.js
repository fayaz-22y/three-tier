import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import LoginSelect from "./pages/LoginSelect";
import CustomerLogin from "./pages/CustomerLogin";
import RetailerLogin from "./pages/RetailerLogin";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
	  <Route path="/about" element={<About />} />

          {/* LOGIN ROUTES FIXED */}
          <Route path="/login" element={<LoginSelect />} />
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route path="/login/retailer" element={<RetailerLogin />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

