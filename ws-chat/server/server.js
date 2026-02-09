import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let userMap = new Map();

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    const message = data.toString();
    let jsonData = JSON.parse(message);

    switch (jsonData.type) {
      case "registerUser":
        userMap.set(ws, jsonData.username);
        ws.send("[SERVER] + " + jsonData.username + " joined the chat");
        break;

      default:
        console.log("default case");
        break;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
