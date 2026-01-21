import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const syncAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRole(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } catch {
      setRole(null);
    }
  };

  useEffect(() => {
    // initial load
    syncAuth();

    // listen to login/logout changes
    window.addEventListener("authChanged", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authChanged", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const logout = () => {
    localStorage.clear();

    // 🔥 notify navbar immediately
    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="logo">MyStore</Link>

          {/* Guest */}
          {!role && (
            <>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
            </>
          )}

          {/* Customer */}
          {role === "customer" && (
            <>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
            </>
          )}

          {/* Retailer */}
          {role === "retailer" && (
            <Link to="/retailer/dashboard">Retailer Dashboard</Link>
          )}

          {/* Admin */}
          {role === "admin" && (
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {!role && (
            <Link className="btn-login" to="/login">Login</Link>
          )}

          {role === "customer" && (
            <>
              <Link to="/cart">Cart</Link>
              <Link to="/my-orders">My Orders</Link>
              <button className="btn-logout" onClick={logout}>Logout</button>
            </>
          )}

          {(role === "retailer" || role === "admin") && (
            <button className="btn-logout" onClick={logout}>Logout</button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

