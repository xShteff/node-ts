import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as socketIO from "socket.io";
import { Colour, Pickle } from "./model";
import { Grid } from "./utils/grid";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = new http.Server(app);
const io = socketIO(httpServer, {});

let grid = Grid.generateGrid(30, 30);
let userCount = 0;
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve("./views/index.html"));
});

function notifyUserCount(socket: socketIO.Socket) {
  socket.broadcast.emit("userCount", userCount); // This notifies everyone...
  socket.emit("userCount", userCount); // This notifies the connected client...
}

io.on("connection", (socket: socketIO.Socket) => {
  userCount++;
  console.log(`A user connected. Current user count: ${userCount}`);
  socket.on("updatePickle", (x: number, y: number, colour: Colour) => {
    grid[x][y] = {
      colour: colour
    } as Pickle;

    socket.broadcast.emit("broadcastGrid", grid); 
  });

  socket.emit("broadcastGrid", grid);

  socket.on("disconnect", () => {
    userCount--;
    console.log(`A user disconnected. Current user count: ${userCount}`);
    notifyUserCount(socket);
  });
  notifyUserCount(socket);
});

const server = httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
