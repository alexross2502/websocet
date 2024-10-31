import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const server = http.createServer(app);
import { WebSocketServer } from "ws";
import { connectDB } from "./db.js";
import router from "./routes/index.js";

connectDB();

app.use(express.json());
app.use("/api", router);

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("Новое соединение WebSocket");

  ws.on("message", (message) => {
    console.log("Сообщение от клиента:", message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Эхо: ${message}`);
      }
    });
  });

  ws.send("Добро пожаловать в WebSocket-сервер!");
});

app.get("/", (req, res) => {
  res.send("WebSocket-сервер работает!");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
