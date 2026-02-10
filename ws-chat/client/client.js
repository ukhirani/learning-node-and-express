import { WebSocket } from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = new WebSocket("ws://localhost:8080");

let username = "";

socket.onopen = () => {
  console.log("Connected to the WebSocket server");

  rl.question("What is your name? ", (name) => {
    username = name;

    socket.send(
      JSON.stringify({
        type: "registerUser",
        username: name,
      }),
    );

    console.log("You can now start chatting:");

    rl.setPrompt("> ");
    rl.prompt();
    rl.on("line", (input) => {
      rl.setPrompt("> ");
      rl.prompt();

      if (input.trim().length > 0) {
        socket.send(
          JSON.stringify({
            type: "chatMessage",
            message: input,
          }),
        );
      }
    });
  });
};

socket.onmessage = (message) => {
  const currentLine = rl.line;
  const cursorPos = rl.cursor;

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  console.log(message.data.toString());

  rl.prompt(true);
  readline.cursorTo(process.stdout, rl.getPrompt().length + cursorPos);
};

socket.onclose = () => {
  console.log("Disconnected from the server");
  rl.close();
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
