import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const server = http.createServer(app);
import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { connectDB } from "./db.js";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
import Users from "./models/Users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.use(
  "/uploads",
  express.static(path.join(__dirname.replace(/^\/|\/$/g, ""), "uploads"))
);

const wss = new WebSocketServer({ server });
wss.on("connection", async (ws, req) => {
  const getTokenFromCookies = (cookieString) => {
    const match = cookieString.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  };
  const token = getTokenFromCookies(req.headers.cookie);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userLogin = await Users.findById(decoded.id).select("login");

  ws.userLogin = userLogin;
  ws.on("close", () => {
    //console.log("Клиент отключился");
  });
});

export const sendMessageToClients = (message) => {
  console.log("test");
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("puf");
      const isCurrentUser = client.userLogin.login === message.login;
      client.send(JSON.stringify({ ...message, isCurrentUser }));
    }
  });
};

app.get("/", (req, res) => {
  res.send("WebSocket-сервер работает!");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
