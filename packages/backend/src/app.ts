import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import * as middlewares from "./middleware.js";
import { env } from "./env.js";
import router from "./routes/index.js";

import { Server } from "socket.io";

const setupRestApiServer = (app: express.Express, io: Server) => {
  app.use(express.json());
  app.use(pinoHttp());
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
    }),
  );
  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  app.use("/", router);
};

// Express.js の設定、ルータの登録、socket.io のイベントリスナ登録をする
export const setupApp = (app: express.Express, io: Server) => {
  setupRestApiServer(app, io);

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("coordinate", (latitude, longitude) => {
      console.log(`Received coordinate from ${socket.id}:`, latitude, longitude);
      socket.emit("coordinateReceived", latitude, longitude);
    });
  });

  return app;
};
