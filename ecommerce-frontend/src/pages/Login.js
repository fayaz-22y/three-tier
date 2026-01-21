import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../style.css";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // 🔔 Notify navbar immediately
      window.dispatchEvent(new Event("authChanged"));

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role === "retailer") {
        navigate("/retailer/dashboard");
      } else if (payload.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page fade-in">
      <h2 className="login-title">
        {role === "retailer" ? "Retailer Login" : "Customer Login"}
      </h2>

      <p className="login-subtitle">
        {role === "retailer"
          ? "Access your store and manage products"
          : "Shop products and track your orders"}
      </p>

      <div className="login-form">
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginUser} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="login-footer">
        Don’t have an account?{" "}
        {role === "retailer" ? (
          <Link to="/signup/retailer">Sign up as Retailer</Link>
        ) : (
          <Link to="/signup/customer">Sign up as Customer</Link>
        )}
      </p>
    </div>
  );
}

