import { setupApp } from "./app.js";
import express from "express";
import { env } from "./env.js";
import { Server } from "socket.io";
import { createServer } from "http";

const allowedOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const port = env.PORT;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

setupApp(app, io);

// Start server
const server = httpServer.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

server.on("error", (err) => {
  if ("code" in err && err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Please choose another port or stop the process using it.`);
  } else {
    console.error("Failed to start server:", err);
  }
  process.exit(1);
});
