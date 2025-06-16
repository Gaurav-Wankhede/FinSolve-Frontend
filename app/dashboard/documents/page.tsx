"use client";

import { useState, useEffect } from "react";
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

interface Document {
  _id: string;
  title: string;
  uploader: string;
  category: string;
  description?: string;
  allowed_roles: string[];
  document: string;
}

export default function DocumentsPage() {
  const { data: session, status } = useSession();
  const sessionData = session as ExtendedSession | null;
  
  // Document list and state
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is c-level-executive
  useEffect(() => {
    if (status === "authenticated") {
      if (sessionData?.user?.role !== "c-level-executive") {
        redirect("/dashboard");
      } else {
        fetchDocuments();
      }
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status, sessionData]);

  // Filter documents when category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(documents.filter(doc => doc.category === selectedCategory));
    }
  }, [selectedCategory, documents]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const response = await fetch("https://fin-solve-backend.vercel.app/documents", {
        headers: {
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
        setFilteredDocuments(data);
      } else {
        setError("Failed to fetch documents");
        console.error("Failed to fetch documents:", await response.text());
      }
    } catch (error) {
      setError("Error loading documents");
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "hr", name: "HR" },
    { id: "engineering", name: "Engineering" },
    { id: "general", name: "General" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Document Management</h2>
        
        {error && (
          <div className="p-4 mb-6 rounded bg-red-50 text-red-800">
            {error}
          </div>
        )}
        
        {/* Filter by category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Document List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading documents...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No documents found in this category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploader</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowed Roles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploader}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.allowed_roles.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => setSelectedDocument(doc)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Content
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold text-gray-900">{selectedDocument.title}</h2>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Category: <span className="font-medium">{selectedDocument.category}</span> | 
                  Uploader: <span className="font-medium">{selectedDocument.uploader}</span> |
                  Allowed Roles: <span className="font-medium">{selectedDocument.allowed_roles.join(", ")}</span>
                </p>
                {selectedDocument.description && (
                  <p className="mt-2 text-sm text-gray-700">
                    <span className="font-medium">Description:</span> {selectedDocument.description}
                  </p>
                )}
              </div>
              <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap font-mono text-sm">
                {selectedDocument.document}
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedDocument(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 