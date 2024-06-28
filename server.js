const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    // When a new user sends a message
    socket.on("user-message", (data) => {
        const { username, message } = data;
        // Emit the message along with the username to all connected clients
        io.emit('message', { username, message });
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req,res) => {
    return res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(9000, () => console.log("Server started at 9000"));
