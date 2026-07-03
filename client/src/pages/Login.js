import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() !== "") {

      // Save username
      localStorage.setItem("username", username);

      navigate("/chat");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleLogin}>
        Join Chat
      </button>
    </div>
  );
}

export default Login;