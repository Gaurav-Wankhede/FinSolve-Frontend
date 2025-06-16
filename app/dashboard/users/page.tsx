"use client";

import { useState, useEffect, FormEvent } from "react";
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

interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const sessionData = session as ExtendedSession | null;
  
  // User list
  const [users, setUsers] = useState<User[]>([]);
  
  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Check if user is c-level-executive
  useEffect(() => {
    if (status === "authenticated") {
      if (sessionData?.user?.role !== "c-level-executive") {
        redirect("/dashboard");
      } else {
        // Fetch users
        fetchUsers();
      }
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status, sessionData]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://fin-solve-backend.vercel.app/user", {
        headers: {
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    
    if (!username || !password || !role) {
      setMessage({ text: "All fields are required", type: "error" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const endpoint = editingUser 
        ? `https://fin-solve-backend.vercel.app/users/${editingUser._id}` 
        : "https://fin-solve-backend.vercel.app/users";
      
      const method = editingUser ? "PUT" : "POST";
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
        body: JSON.stringify({ username, password, role }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ 
          text: editingUser 
            ? "User updated successfully!" 
            : "User created successfully!", 
          type: "success" 
        });
        
        // Reset form
        setUsername("");
        setPassword("");
        setRole("employee");
        setEditingUser(null);
        
        // Refresh user list
        fetchUsers();
      } else {
        setMessage({ text: data.detail || "Operation failed", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error performing operation", type: "error" });
      console.error("Operation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword(""); // Don't populate password for security
    setRole(user.role);
  };

  // Role options
  const roleOptions = [
    { value: "finance", label: "Finance Team" },
    { value: "marketing", label: "Marketing Team" },
    { value: "hr", label: "HR Team" },
    { value: "engineering", label: "Engineering Team" },
    { value: "c-level-executive", label: "C-Level Executive" },
    { value: "employee", label: "Regular Employee" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">
          {editingUser ? "Edit User" : "Create New User"}
        </h2>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded ${message.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required={!editingUser}
              placeholder={editingUser ? "Leave blank to keep current password" : ""}
            />
            {editingUser && (
              <p className="mt-1 text-xs text-gray-500">
                Leave blank to keep the current password.
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : editingUser ? 'Update User' : 'Create User'}
            </button>
            
            {editingUser && (
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setUsername("");
                  setPassword("");
                  setRole("employee");
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* User List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">User Management</h2>
        
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {roleOptions.find(r => r.value === user.role)?.label || user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
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