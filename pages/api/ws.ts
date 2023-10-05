import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Server } from "socket.io";

export default function handler(req: NextRequest, res: NextApiResponse) {
    if (res.socket.server.io) {
        console.log("Server already started!");
        res.end();
        return;
    }

    const io = new Server(res.socket.server, {
        path: "/api/ws",
    });
    res.socket.server.io = io

    io.on("connection", (socket) => {

        socket.on('join_room', () => {
            const p = new URL(`http://localhost:3000${socket.request.url}`).searchParams.get("Room-Id")!
            socket.join(p)
        })

        socket.on("send_message", (msg: any) => {
            const p = new URL(`http://localhost:3000${socket.request.url}`).searchParams.get("Room-Id")!
            console.log("New message", msg, p);
            io.socketsJoin(p)
            io.to(p).emit("receive_message", msg);
        })
    })
    res.end();
}
