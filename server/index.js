import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import colors from "colors";
import usersRouter from "./routes/users.js";

dotenv.config();

//dotenv and other variables

const { BACKEND_PORT, FRONTEND_URL } = process.env;

const app = express();

// app.use
app.use(express.json({ limit: "100mb" }));
app.use("/api/users", usersRouter);

app.get('/', (req, res) => {
  res.send('Server is running!');
})

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
  maxHttpBufferSize: 1e9,
});

io.on("connection", (socket) => {
  console.info(socket.id.yellow);
});

server.listen(BACKEND_PORT, () => {
  console.log(
    `Backend application is listening on PORT: ${BACKEND_PORT}`.yellow
  );
});
