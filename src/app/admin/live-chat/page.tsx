"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

interface Message {
  text: string;
  sender: "user" | "admin";
}

export default function AdminLiveChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      text: message,
      sender: "admin",
    });

    setMessage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">🧑‍💼 Live Customer Support</h1>

      <div className="border rounded-lg h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.sender === "admin" ? "text-right" : "text-left"
              }`}
            >
              <span className="inline-block bg-gray-100 px-3 py-1 rounded">
                <b>{msg.sender}:</b> {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex border-t p-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded px-2 text-sm"
            placeholder="Type reply..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 bg-green-600 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
