import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Chat App</h1>

      <p>
        Real-time messaging application using React and Socket.IO
      </p>

      <button onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
}

export default Welcome;