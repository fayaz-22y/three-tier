import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../style.css";

export default function CustomerSignup() {
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
        role: "customer",
      });

      alert("Account created successfully. Please login.");
      navigate("/login/customer");
    } catch {
      alert("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page fade-in">
      <h2 className="login-title">Create Customer Account</h2>
      <p className="login-subtitle">
        Join us and start shopping your favorite products
      </p>

      <form className="login-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email Address"
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
        Already have an account?{" "}
        <Link to="/login/customer">Login</Link>
      </p>
    </div>
  );
}

