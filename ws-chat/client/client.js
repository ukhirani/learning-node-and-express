import { WebSocket } from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("Connected to the WebSocket server");

  let username;
  rl.question("What is your name? ", (name) => {
    username = name;
    socket.send(
      JSON.stringify({
        type: "registerUser",
        username: name,
      }),
    );
    rl.close();
  });
};

socket.onmessage = (message) => {
  console.log("Received from the server:", message.data.toString());
};

socket.onclose = () => {
  console.log("Disconnected from the server");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
