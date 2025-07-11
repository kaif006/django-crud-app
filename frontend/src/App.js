import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import { getToken, removeToken } from "./auth";

function App() {
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setAuthenticated(!!getToken());
  }, []);

  const handleLogout = () => {
    removeToken();
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <div className="container mt-5 text-center">
        {showRegister ? (
          <>
            <Register />
            <button
              className="btn btn-link mt-3"
              onClick={() => setShowRegister(false)}
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <Login onLogin={() => setAuthenticated(true)} />
            <button
              className="btn btn-link mt-3"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark justify-content-between px-4">
        <span className="navbar-brand mb-0 h1">Task App</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <TaskList /> {/* ✅ This was missing */}
    </>
  );
}

export default App;
