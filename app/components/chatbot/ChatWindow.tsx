"use client";
import { useState } from "react";
import ChatBubble from "./ChatBubble";

interface Message {
  from: "user" | "bot";
  text: string;
}

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);

  const [input, setInput] = useState("");
  const userMessage: Message = {
  from: "user",
  text: input,
};


const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    from: "user",
    text: input,
  };

  setMessages((m) => [...m, userMessage]);
  setInput("");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: input }),
  });

  const data = await res.json();

  setMessages((m) => [
    ...m,
    { from: "bot", text: data.reply },
  ]);
};


  return (
    <div className="fixed bottom-24 right-6 bg-white w-80 shadow-xl rounded-xl border border-gray-200 flex flex-col">
      
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-xl flex justify-between">
        <span>Chat Support</span>
        <button onClick={onClose}>✖</button>
      </div>

      {/* Messages */}
      <div className="p-3 h-80 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <ChatBubble key={i} from={msg.from} text={msg.text} />
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 border-t flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
