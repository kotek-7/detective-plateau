import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import * as middlewares from "./middleware.js";
import router from "./routes/index.js";

import { Server } from "socket.io";

const setupRestApiServer = (app: express.Express, io: Server) => {
  const allowedOrigins = ["http://localhost:3000", "https://detective-plateau.pages.dev/"];

  app.use(express.json());
  app.use(pinoHttp());
  app.use(helmet());
  app.use(
    cors({
      origin: allowedOrigins,
    }),
  );

  app.use(router);

  // WebSocket ブロードキャスト用の座標投稿エンドポイント
  app.post("/api/coordinate", (req, res) => {
    io.emit("coordinateReceived", req.body.latitude, req.body.longitude, req.body.user);
    res.status(204).send();
  });

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  return app;
};

// Express.js の設定、ルータの登録、socket.io のイベントリスナ登録をする
export const setupApp = (app: express.Express, io: Server) => {
  setupRestApiServer(app, io);

  return app;
};
