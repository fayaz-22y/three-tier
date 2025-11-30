import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      alert("Login successful");
    } catch {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login</h2>
      <input placeholder="Email" className="form-control mt-3" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" className="form-control mt-3" type="password" onChange={(e)=>setPassword(e.target.value)} />
      
      <button className="mt-3" onClick={loginUser}>Login</button>
    </div>
  );
}

