import React, { useState } from "react";
import api from "../api";
import { setToken } from "../auth";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", { username, password });
      setToken(res.data.token);
      setError("");
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">Login</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="btn btn-primary w-100">Login</button>
      {error && <p className="text-danger mt-2 text-center">{error}</p>}
    </form>
  );
}

export default Login;
