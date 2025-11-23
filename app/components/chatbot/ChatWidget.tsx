"use client";
import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="right-0 bottom-0">
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-blue fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all"
      >
        Bot ?
      </button>

      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  );
}
