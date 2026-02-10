import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let userMap = new Map();

console.log("WebSocket server running on ws://localhost:8080");

function SendMessageFromUser(username, ws, message) {
  for (const key of userMap.keys()) {
    if (key !== ws) {
      key.send("[" + username + "] " + message);
    }
  }
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    const message = data.toString();
    let jsonData = JSON.parse(message);
    console.log(jsonData);

    switch (jsonData.type) {
      case "registerUser":
        userMap.set(ws, jsonData.username);
        SendMessageFromUser(
          "SERVER",
          ws,
          jsonData.username + " joined the chat",
        );
        break;

      case "chatMessage":
        const user = userMap.get(ws);
        SendMessageFromUser(user, ws, jsonData.message);
        break;
    }
  });

  ws.on("close", () => {
    SendMessageFromUser("SERVER", ws, userMap.get(ws) + " left the chat.");
    console.log("Client disconnected");
  });
});
