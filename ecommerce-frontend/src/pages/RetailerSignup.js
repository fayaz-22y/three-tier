import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RetailerSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/api/auth/register", {
      ...form,
      role: "retailer"
    });
    alert("Retailer registered. Please login.");
    navigate("/login/retailer");
  };

  return (
    <form onSubmit={submit}>
      <h2>Retailer Signup</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Signup</button>
    </form>
  );
}

