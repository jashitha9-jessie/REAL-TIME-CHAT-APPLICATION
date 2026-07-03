import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../App.css";

const socket = io("http://localhost:5000");

function Chat() {

  const username = localStorage.getItem("username");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    // Receive old messages
    socket.on("messageHistory", (history) => {

      setMessages(history);

    });

    // Receive new message
    socket.on("receiveMessage", (msg) => {

      setMessages((prev) => [...prev, msg]);

    });

    return () => {

      socket.off("messageHistory");
      socket.off("receiveMessage");

    };

  }, []);

  const sendMessage = () => {

    if (message.trim() === "") return;

    const msgData = {

      user: username,
      text: message

    };

    socket.emit("sendMessage", msgData);

    setMessage("");

  };

  return (

    <div className="chat-container">

      <h2>Welcome, {username}</h2>

      <div className="chat-box">

        {messages.map((msg, index) => (

          <div key={index} className="message">

            {
              typeof msg === "string"
              ? msg
              : (
                <>
                  <strong>{msg.user}: </strong>
                  {msg.text}
                </>
              )
            }

          </div>

        ))}

      </div>

      <div className="input-area">

        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );
}

export default Chat;