import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../style.css";

export default function RetailerSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        ...form,
        role: "retailer",
      });

      alert("Retailer account created. Please login.");
      navigate("/login/retailer");
    } catch {
      alert("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page fade-in">
      <h2 className="login-title">Create Retailer Account</h2>
      <p className="login-subtitle">
        Manage products, inventory & sales
      </p>

      <form className="login-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Store / Owner Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Business Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="login-footer">
        Already registered?{" "}
        <Link to="/login/retailer">Login</Link>
      </p>
    </div>
  );
}

