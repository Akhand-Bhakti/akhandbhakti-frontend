"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

interface Message {
  text: string;
  sender: "user" | "admin";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
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
      sender: "user",
    });

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">
          <div className="p-3 font-semibold border-b">Live Support</div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-2 text-sm outline-none"
              placeholder="Type message..."
            />
            <button
              onClick={sendMessage}
              className="px-3 text-sm bg-orange-600 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
