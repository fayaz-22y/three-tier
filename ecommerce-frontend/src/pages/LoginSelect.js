import { Link } from "react-router-dom";
import "./../style.css";

function LoginSelect() {
  return (
    <div className="login-select-container fade-in">
      <h1 className="login-select-title slide-up">Choose Your Login</h1>
      <p className="login-select-sub slide-up-delayed">
        Select how you want to access your account
      </p>

      <div className="login-card-box">

        {/* CUSTOMER LOGIN */}
        <Link to="/login/customer" className="login-card card-animate">
          <div className="login-icon icon-bounce">👤</div>
          <h3>Customer Login</h3>
          <p>For shopping and tracking your orders</p>
        </Link>

        {/* RETAILER LOGIN */}
        <Link to="/login/retailer" className="login-card card-animate">
          <div className="login-icon icon-bounce">🛍️</div>
          <h3>Retailer Login</h3>
          <p>Manage products, inventory & sales</p>
        </Link>

      </div>
    </div>
  );
}

export default LoginSelect;

