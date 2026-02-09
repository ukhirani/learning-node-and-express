import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username;
rl.question("What is your name? ", (name) => {
  console.log(`Hello, ${name}!`);
  username = name;
  rl.close();
});
