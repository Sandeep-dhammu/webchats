import { Server } from "socket.io";

export const SocketInit = (app) => {
    console.log(app);
    const io = new Server(app, {
        cors:{
            origin:"http://localhost:4200"
        }
    })
    io.on("connection", (socket) => {
        console.log(io.listenerCount("connection"));
    })
}
