"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cFj8NRGZ0OK
 */
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/context/userContext';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import customAxios from '@/lib/axios';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

interface IMessage {
    ownerId: string;
    ownerName: string;
    message: string;
    createdAt?: string;
}

export default function Chat({ params }: { params: { chatId: string } }) {
    const router = useRouter()
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        async function fetchMessages() {
            console.log(params.chatId, user.tokens[0])
            const res = await customAxios.post("/allMessages", { chatId: params.chatId, token: user.tokens[0] });
            console.log(res.data)
            setMessages(res.data);
        }

        if (user != undefined && !user._id) router.push("/signup");
        if (user != undefined && user.tokens[0] != undefined) {
            fetchMessages();
        }
    }, [user]);

    // Create a ref for the chat container
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Use useEffect to scroll to the bottom on component mount and update
    useEffect(() => {
        scrollToBottom();
    }, []); // You can add dependencies here if you want to scroll on update

    useEffect(() => {
        socket = io('http://localhost:8888');

        socket.on('message', (msg) => {
            console.log(msg)
            setMessages((prevMessages: IMessage[]) => [...prevMessages, msg] as IMessage[]);
        });

        joinRoom();

        return () => {
            socket.disconnect();
        };
    }, []);

    const joinRoom = () => {
        if (socket == undefined) return;
        socket.emit('join room', params.chatId);
    };

    const leaveRoom = () => {
        if (socket == undefined) return;
        socket.emit('leave room', params.chatId);
    };

    const sendMessage = () => {
        if (socket == undefined || message == "") return;
        socket.emit('send message', { chatId: params.chatId, message: message, ownerId: user._id, ownerName: user.name, createdAt: formatDate(Date.now()) });
        setMessage("");
    };

    function formatDate(timestamp: number) {
        const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        const date = new Date(timestamp);
      
        const month = months[date.getMonth()];
        const day = date.getDate();
        let hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? 'pm' : 'am';
      
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        const minuteFormatted = minute < 10 ? '0' + minute : minute;
      
        return `${month} ${day}, ${hour}:${minuteFormatted} ${ampm}`;
    }

    return (
        <div key="1" className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="outline" onClick={() => router.push("/chat")}>Back</Button>
                <h1 className="text-xl font-bold">Chat Room</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                    {messages.map((message: IMessage, index: number) => {
                        return (
                            <div className="flex flex-col gap-1" key={index}>
                                <h2 className="font-semibold">{message.ownerName}</h2>
                                <p>{message.message}</p>
                                <span className="text-xs text-gray-500">{message.createdAt || ""}</span>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>
            </main>
            <footer className="p-4 border-t sticky bottom-0">
                <div className="flex items-center gap-2">
                    <Input className="flex-1" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </footer>
        </div>
    )
}

