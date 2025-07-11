import React, { useState } from "react";
import api from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("register/", {
        username,
        password,
        email: `${username}@email.com`
      });
      setMessage("Registered! Now login.");
    } catch {
      setMessage("Username may already exist.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="card p-4 shadow mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-3" >Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="form-control mb-3"/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="form-control mb-3" />
      <button type="submit" className="btn btn-primary w-100" >Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Register;
