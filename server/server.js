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

const avatarsDir = path.join(
  __dirname.replace(/^\/|\/$/g, ""),
  "uploads",
  "avatars"
);
app.use(
  "/uploads",
  express.static(path.join(__dirname.replace(/^\/|\/$/g, ""), "uploads"))
);

console.log("Directory name:", __dirname);
console.log("Avatar directory path:", path.join(__dirname, "uploads"));

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("Клиент подключен");

  ws.on("close", () => {
    console.log("Клиент отключился");
  });
});

export const sendMessageToClients = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
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
