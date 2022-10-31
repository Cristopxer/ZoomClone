const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  options: {
    cors: "*",
  },
});

const port = 3200;

io.on("connection", (socket) => {
  socket.on("join", (data) => {    
    const roomName = data.roomName;
    socket.join(roomName);
    socket.to(roomName).broadcast.emit("user-connected", data);
    console.log("User connected: ", data);

    socket.on('disconnect', () => {
        socket.to(roomName).broadcast.emit("user-disconnected", data);
    })
  });
});

server.listen(port, () => {
  console.log("SERVER running on port", port);
});
