import * as express from "express";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./views/index.html"));
});


io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("message", (message: any) => {
    console.log(message);
    socket.emit("message", message)
  });
});

const server = http.listen(3000, () => {
  console.log("listening on *:3000");
});