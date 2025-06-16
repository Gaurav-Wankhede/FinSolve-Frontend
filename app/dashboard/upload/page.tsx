"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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

export default function UploadPage() {
  const { data: session, status } = useSession();
  const sessionData = session as ExtendedSession | null;
  
  // Form state
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("general");
  const [description, setDescription] = useState("");
  const [allowedRoles, setAllowedRoles] = useState("c-level-executive");
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [uploadHistory, setUploadHistory] = useState<any[]>([]);

  // Check if user is c-level-executive
  useEffect(() => {
    if (status === "authenticated") {
      if (sessionData?.user?.role !== "c-level-executive") {
        redirect("/dashboard");
      } else {
        // Fetch upload history
        fetchDocuments();
      }
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status, sessionData]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/documents", {
        headers: {
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUploadHistory(data);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    
    if (!file || !title) {
      setMessage({ text: "Title and file are required", type: "error" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      formData.append("category", category);
      
      if (description) {
        formData.append("description", description);
      }
      
      if (allowedRoles) {
        formData.append("allowed_roles", allowedRoles);
      }
      
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: "File uploaded successfully!", type: "success" });
        // Reset form
        setTitle("");
        setFile(null);
        setCategory("general");
        setDescription("");
        setAllowedRoles("c-level-executive");
        // Refresh document list
        fetchDocuments();
      } else {
        setMessage({ text: data.error || "Upload failed", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error uploading file", type: "error" });
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Role options for the select input
  const roleOptions = [
    { value: "finance", label: "Finance Team" },
    { value: "marketing", label: "Marketing Team" },
    { value: "hr", label: "HR Team" },
    { value: "engineering", label: "Engineering Team" },
    { value: "c-level-executive", label: "C-Level Executives" },
    { value: "employee", label: "Regular Employees" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Upload Document</h2>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded ${message.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
              File * (.txt, .md, .csv only)
            </label>
            <input
              type="file"
              id="file"
              accept=".txt,.md,.csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
              <option value="general">General</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="allowedRoles" className="block text-sm font-medium text-gray-700 mb-1">
              Allowed Roles (comma-separated)
            </label>
            <div className="space-y-2">
              {roleOptions.map((role) => (
                <div key={role.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`role-${role.value}`}
                    checked={allowedRoles.includes(role.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Add role if not already included
                        if (!allowedRoles.includes(role.value)) {
                          setAllowedRoles(allowedRoles 
                            ? `${allowedRoles},${role.value}` 
                            : role.value);
                        }
                      } else {
                        // Remove role but ensure c-level-executive remains if this is not that role
                        const roles = allowedRoles.split(",").filter(r => r.trim() !== role.value);
                        if (role.value !== "c-level-executive" && !roles.includes("c-level-executive")) {
                          roles.push("c-level-executive");
                        }
                        setAllowedRoles(roles.join(","));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`role-${role.value}`} className="ml-2 block text-sm text-gray-900">
                    {role.label}
                  </label>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              C-Level Executives will always have access. Category-specific roles will be added automatically.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>
      
      {/* Recent Uploads */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Recent Uploads</h2>
        
        {uploadHistory.length === 0 ? (
          <p className="text-gray-500">No documents have been uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploader</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowed Roles</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uploadHistory.map((doc, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploader}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.allowed_roles?.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 