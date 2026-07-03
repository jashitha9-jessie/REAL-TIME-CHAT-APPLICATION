const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let messages = [];

io.on("connection", (socket) => {

  console.log("User connected");

  socket.emit("messageHistory", messages);

  socket.on("sendMessage", (messageData) => {

    messages.push(messageData);

    io.emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});