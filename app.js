const { Socket } = require("socket.io");

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const path = require("path");
const port = 8080;

/**
 * @type {Socket}
 */
const io = require("socket.io")(http);

app.use(
  "/bootstrap/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/bootstrap/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "frontend/index.html"));
});
app.get("/games/tic-tac-toe", (req, res, next) => {
  res.sendFile(path.join(__dirname, "frontend/games/tic-tac-toe.html"));
});

http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

const startGame = require("./functions/socket");
startGame(http);
