import React from "react";
import { Link } from "react-router-dom";
import "./../style.css";

function Navbar() {
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

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            <li className="nav-item cart-icon">
              <Link className="nav-link" to="/cart">
                🛒 Cart
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


