"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ChatInterface from "@/components/chat/ChatInterface";

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

export default function Dashboard() {
  const { data: session } = useSession();
  const sessionData = session as ExtendedSession | null;
  const userRole = sessionData?.user?.role || "";
  const [selectedModel, setSelectedModel] = useState("deepseek/deepseek-r1-0528:free");
  const [availableModels, setAvailableModels] = useState<Array<{id: string, name: string, provider: string}>>([]);

  useEffect(() => {
    // Fetch available models
    const fetchModels = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/models", {
          headers: {
            Authorization: `Bearer ${sessionData?.user?.accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAvailableModels(data);
          if (data.length > 0) {
            setSelectedModel(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    if (sessionData?.user?.accessToken) {
      fetchModels();
    }
  }, [sessionData]);

  return (
    <div className="w-full overflow-hidden" style={{ height: 'calc(90vh - 100px)' }}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-full overflow-hidden">
        <div className="bg-blue-700 text-white p-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">FinSolve Assistant</h2>
          <div className="flex items-center">
            <span className="text-sm mr-2">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-sm bg-blue-800 text-white border border-blue-600 rounded px-2 py-1"
            >
              {availableModels.length > 0 ? (
                availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </option>
                ))
              ) : (
                <option value="deepseek/deepseek-r1-0528:free">DeepSeek R1 (OpenRouter)</option>
              )}
            </select>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatInterface modelId={selectedModel} />
        </div>
      </div>
    </div>
  );
}


  