import { Link } from "react-router-dom";
import "./../style.css";

function LoginSelect() {
  return (
    <div className="login-select-container fade-in">
      <h1 className="login-select-title">Welcome Back</h1>
      <p className="login-select-sub">
        Choose how you want to access the platform
      </p>

      <div className="login-card-box">

        {/* CUSTOMER */}
        <Link to="/login/customer" className="login-card">
          <div className="login-icon">👤</div>
          <h3>Customer</h3>
          <p>Browse products, add to cart & track orders</p>
        </Link>

        {/* RETAILER */}
        <Link to="/login/retailer" className="login-card">
          <div className="login-icon">🛍️</div>
          <h3>Retailer</h3>
          <p>Manage products, inventory & sales</p>
        </Link>

      </div>
    </div>
  );
}

export default LoginSelect;

