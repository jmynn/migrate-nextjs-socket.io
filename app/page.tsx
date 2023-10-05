"use client";
import { $axios } from "@/interseptors";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io";
import io from "socket.io-client";

let socket: Socket
const rid = 'dialog_'

export default function Home() {
    const [value, setValue] = useState("");
    const [r, sr] = useState("r1");
    const [messages, setMessages] = useState([]);

    const socketInitializer = async () => {
        await $axios("/api/ws");

        socket = io({
            path: "/api/ws",
            query: {
                'Room-Id' : 'r1'
            },
        }).connect()
        

        socket.on("connect", () => {
            console.log('connected')
        });

        socket.on("receive_message", (msg) => { console.log(msg)
            setMessages(prev => [msg, ...prev]);
            console.log('received message')
        });
    };
    const handleJoin = () => {
        console.log('joining')
        socket?.emit('join_room')
    }

    const sendMessageHandler = async () => {
        if (!socket) return;
        console.log('send')
        socket.emit("send_message", {value, r: 'r1'});
    };

    useEffect(() => {
        socketInitializer();
        return () => {
            socket?.disconnect()
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">
            <div>
                <input value={r} onChange={e=>sr(e.target.value)} />
                {/* <button onClick={handleJoin}>ok</button> */}
            </div>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                className="w-full h-12 px-2 mt-auto rounded"
                placeholder="Enter some text and see the syncing of text in another tab"
            />
            <button onClick={sendMessageHandler}>send</button>
            {
                messages.map((msg, i) => <div key={i}>{msg.value}</div>)
            }
        </main>
    );
}
