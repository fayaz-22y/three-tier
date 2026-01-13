import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode JWT to get role
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role === "retailer") {
        navigate("/retailer/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>{role === "retailer" ? "Retailer Login" : "Customer Login"}</h2>

      <input
        placeholder="Email"
        className="form-control mt-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        className="form-control mt-3"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="mt-3" onClick={loginUser}>
        Login
      </button>

      <p className="mt-3">
        Don't have an account?{" "}
        {role === "retailer" ? (
          <a href="/signup/retailer">Sign up as Retailer</a>
        ) : (
          <a href="/signup/customer">Sign up as Customer</a>
        )}
      </p>
    </div>
  );
}

