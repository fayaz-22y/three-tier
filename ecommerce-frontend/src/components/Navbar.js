import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./../style.css";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { totalQty } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand brand-text" to="/">
          Flozz Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            {/* CART ICON WITH BADGE */}
            <li className="nav-item cart-icon">
              <Link className="nav-link cart-link" to="/cart">
                🛒 Cart
                {totalQty > 0 && (
                  <span className="cart-badge">{totalQty}</span>
                )}
              </Link>
            </li>

            <Link to="/login" className="btn login-btn">Login</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

