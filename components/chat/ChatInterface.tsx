"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

// Extend session user type to include accessToken
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  accessToken?: string;
}

interface ExtendedSession {
  user: ExtendedUser;
  expires: string;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Array<{
    id: string;
    title: string;
    category: string;
  }>;
}

interface ChatResponse {
  answer: string;
  source_documents: Array<{
    id: string;
    title: string;
    category: string;
  }>;
}

interface ChatInterfaceProps {
  modelId: string;
}

export default function ChatInterface({ modelId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const sessionData = session as ExtendedSession | null;

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format request exactly as required by backend
      const requestPayload = {
        query: {
          query: input
        },
        model_request: {
          model: modelId,
          use_history: true
        }
      };

      console.log("Sending request payload:", JSON.stringify(requestPayload, null, 2));

      const response = await fetch("https://fin-solve-backend.vercel.app/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        const data: ChatResponse = await response.json();
        
        // Add bot message with proper handling for empty responses
        const defaultMessage = "I don't have access to that information for your current role. You may not have permission to view this data.";
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.answer && data.answer.trim() ? data.answer : defaultMessage,
          isUser: false,
          timestamp: new Date(),
          sources: data.source_documents,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorData = await response.text();
        console.error("API error:", errorData);
        
        // Add error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Sorry, I encountered an error processing your request. Error: ${response.status} ${errorData}`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages area - scrollable */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">
            <p>Hello! How can I assist you today?</p>
            <p className="text-sm mt-2">Ask me anything about FinSolve Technologies.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                      <p className="font-semibold">Sources:</p>
                      <ul className="list-disc pl-4 mt-1">
                        {message.sources.map((source) => (
                          <li key={source.id}>
                            {source.title} <span className="opacity-75">({source.category})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area - fixed at bottom, not scrollable */}
      <div className="flex-shrink-0">
        <form onSubmit={handleSubmit} className="p-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`bg-blue-700 text-white px-4 py-2 rounded-lg ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-800"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}