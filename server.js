const express = require("express");
const app = express();
const fs = require("fs");
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// const port = process.env.PORT || 80;

const options = {
  key: fs.readFileSync("localhost.key"),
  cert: fs.readFileSync("localhost.crt"),
};

const server = require("https").Server(options, app);
const port = process.env.PORT || 443;
app.use(express.static("public"));

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

const io = require("socket.io")(server);

const clients = {};

io.on("connection", (socket) => {
  clients[socket.id] = { id: socket.id };
  console.log("Socket connected", socket.id);

  socket.on("update", (targetSocketId, data) => {
    if (!clients[targetSocketId]) {
      return;
    }
    console.log(`Command received: ${data.command}`); // Logging the command for debugging
    io.to(targetSocketId).emit("update", data);
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
  });

  socket.on("scoreUpdate", (data) => {
    console.log("Score Update", data);
    io.emit("scoreUpdate", data);
  });
});
