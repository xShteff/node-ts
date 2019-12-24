import * as express from "express";
import * as path from "path";
import { Pickle } from "./model";
import { Colour } from './model/colour';
import { Grid } from './utils/grid';

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http);

let allMessages: string[] = [];

let grid = Grid.generateGrid(10, 10);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./views/index.html"));
});


io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("message", (message: any) => {
    allMessages.push(message);
    console.log(`New message: ${message}`);
    socket.emit("message", message)
  });


  socket.on("updatePickle", (x: number, y: number, colour: Colour) => {
    colour = Grid.generateColour(colour.red, colour.green, colour.blue);
    grid[x][y] = {
      colour: colour
    } as Pickle;
    // socket.emit("pickleUpdated", x, y, colour);
    socket.emit("broadcastGrid", grid);
  });

  socket.emit("broadcastGrid", grid);
});

const server = http.listen(3000, () => {
  console.log("listening on *:3000");
});