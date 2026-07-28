import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("join_user", (userId) => {
    if (userId) socket.join(`user:${userId}`);
  });

  socket.on("join_swap", (swapId) => {
    if (swapId) socket.join(`swap:${swapId}`);
  });

  socket.on("leave_swap", (swapId) => {
    if (swapId) socket.leave(`swap:${swapId}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
