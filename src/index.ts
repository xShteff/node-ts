import * as express from "express";
import * as path from "path";
import { Colour, Pickle } from "./model";
import { Grid } from "./utils/grid";

const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);
let http = require("http").Server(app);
let io = require("socket.io")(http);

let grid = Grid.generateGrid(30, 30);
let userCount = 0;
app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./views/index.html"));
});

function notifyUserCount(socket: any) {
  socket.broadcast.emit("userCount", userCount);
  socket.emit("userCount", userCount);
}

io.on("connection", (socket: any) => {
  console.log("a user connected");
  userCount++;
  socket.on("updatePickle", (x: number, y: number, colour: Colour) => {
    grid[x][y] = {
      colour: colour
    } as Pickle;

    socket.broadcast.emit("broadcastGrid", grid); // This notifies everyone...
  });

  socket.emit("broadcastGrid", grid);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    userCount--;
    notifyUserCount(socket);
  });
  notifyUserCount(socket);
});

const server = http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
