import express from "express";
import connectionDb from "./utils/connection";
import todoRouter from "./routes/ToDo";
import cors from "cors";
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const PORT = 5000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
  
connectionDb();

app.use("/task", todoRouter);
io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  socket.emit("hello", "world");
  socket.on("taskAdded",(arg)=>{
    io.emit("taskAdded")
    console.log(arg)
  })
  socket.on("taskEdited",(arg)=>{
    io.emit("taskEdited")
    console.log(arg)
  })
  socket.on("taskDeleted",(arg)=>{
    io.emit("taskDeleted")
    console.log(arg)
  })
});

// app.listen(PORT, () => {
//   console.log("app is listening on :", PORT);
// });
server.listen(PORT,()=>{
  console.log("server is listening on:",PORT)
})
 