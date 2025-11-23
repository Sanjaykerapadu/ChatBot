export default function ChatBubble({
  from,
  text,
}: {
  from: "user" | "bot";
  text: string;
}) {
  const isUser = from === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}
    >
      <div
        className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
