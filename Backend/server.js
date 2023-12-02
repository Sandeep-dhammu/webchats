import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { connect } from "./database/index.js"
import { SocketInit } from "./socket.js";
const app = express();
const port = 2200;
connect()
app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use('/api' ,router)


const server =  app.listen(port, () => {
  console.log(`Web chat app listing on http://localhost:${port}`);
});
SocketInit(server)
