import { useEffect, useRef } from "react";
import { Bot, BotMessageSquare, User } from "lucide-react";
import TypingIndicator from "../../common/TypingIndicator";

const messages = [
  {
    id: 1,
    sender: "ai",
    text: "👋 Hello! How can I help you today?",
  },
  {
    id: 2,
    sender: "user",
    text: "Show me best gaming accessories.",
  },
  {
    id: 3,
    sender: "ai",
    text: "I recommend the Gaming Mouse and Mechanical Keyboard.",
  },
  {
    id: 4,
    sender: "user",
    text: "Add them to my cart.",
  },
  {
    id: 5,
    sender: "ai",
    text: "Done ✅ Both items have been added.",
  },
];

interface ChatTypes {
  id: number;
  sender: "ai" | "user";
  message: string;
}

interface MessagesPropTypes {
  chat: ChatTypes[];
}

const Messages = ({ chat }: MessagesPropTypes) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5 relative">
      <div className="absolute top-[40%] left-[40%]">
        {!chat.length && <BotMessageSquare size={80} opacity={0.2} />}
      </div>
      {chat.map((message) => (
        <div
          key={message.id}
          className={`flex items-end gap-2 ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* AI ICON (LEFT) */}
          {message.sender === "ai" && (
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
          )}

          {/* MESSAGE BUBBLE */}
          <div
            className={`px-4 py-3 rounded-2xl text-sm shadow-md max-w-[75%] ${
              message.sender === "user"
                ? "bg-blue-600 text-white rounded-br-md"
                : "bg-gray-800 text-gray-100 rounded-bl-md"
            }`}
          >
            <p className="text-xs opacity-70 mb-1">
              {message.sender === "user" ? "You" : "AI Assistant"}
            </p>
            {/* {message.message} */}

            {message.sender === "ai" && !message.message ? (
              <TypingIndicator />
            ) : (
              message.message
            )}
          </div>

          {/* USER ICON (RIGHT) */}
          {message.sender === "user" && (
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          )}
        </div>
      ))}

      {/* 👇 IMPORTANT: scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
