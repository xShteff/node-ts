import * as express from "express";
import * as path from "path";
import { Colour, Pickle } from "./model";
import { Grid } from './utils/grid';


const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http);

let allMessages: string[] = [];

let grid = Grid.generateGrid(30, 30);

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
    
    socket.broadcast.emit("broadcastGrid", grid); // This notifies everyone...
    socket.emit("broadcastGrid", grid); // This notifies yourself, keeping it here so I dont have to generate the utils again...
  });

  socket.emit("broadcastGrid", grid);
});

const server = http.listen(3000, () => {
  console.log("listening on *:3000");
});