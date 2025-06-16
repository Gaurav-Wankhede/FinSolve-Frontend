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

interface Role {
  role: string;
  description: string;
  can_view_finance: boolean;
  can_view_marketing: boolean;
  can_view_hr: boolean;
  can_view_engineering: boolean;
  can_view_company_general: boolean;
}

export default function RolesPage() {
  const { data: session, status } = useSession();
  const sessionData = session as ExtendedSession | null;
  
  // Role list and form state
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState({
    can_view_finance: false,
    can_view_marketing: false,
    can_view_hr: false,
    can_view_engineering: false,
    can_view_company_general: true,
  });
  const [editingRole, setEditingRole] = useState<string | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Check if user is c-level-executive
  useEffect(() => {
    if (status === "authenticated") {
      if (sessionData?.user?.role !== "c-level-executive") {
        redirect("/dashboard");
      } else {
        // Default roles from schema
        setRoles([
          {
            role: "finance",
            description: "Finance team members",
            can_view_finance: true,
            can_view_marketing: false,
            can_view_hr: false,
            can_view_engineering: false,
            can_view_company_general: true
          },
          {
            role: "marketing",
            description: "Marketing team members",
            can_view_finance: false,
            can_view_marketing: true,
            can_view_hr: false,
            can_view_engineering: false,
            can_view_company_general: true
          },
          {
            role: "hr",
            description: "HR team members",
            can_view_finance: false,
            can_view_marketing: false,
            can_view_hr: true,
            can_view_engineering: false,
            can_view_company_general: true
          },
          {
            role: "engineering",
            description: "Engineering team members",
            can_view_finance: false,
            can_view_marketing: false,
            can_view_hr: false,
            can_view_engineering: true,
            can_view_company_general: true
          },
          {
            role: "c-level-executive",
            description: "C-level executives with full access",
            can_view_finance: true,
            can_view_marketing: true,
            can_view_hr: true,
            can_view_engineering: true,
            can_view_company_general: true
          },
          {
            role: "employee",
            description: "Regular employees with limited access",
            can_view_finance: false,
            can_view_marketing: false,
            can_view_hr: false,
            can_view_engineering: false,
            can_view_company_general: true
          }
        ]);
      }
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status, sessionData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    
    if (!roleName || !description) {
      setMessage({ text: "Role name and description are required", type: "error" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const endpoint = editingRole 
        ? `http://127.0.0.1:8000/roles/${editingRole}` 
        : "http://127.0.0.1:8000/roles";
      
      const method = editingRole ? "PUT" : "POST";
      
      const roleData = {
        role: roleName,
        description,
        ...permissions
      };
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
        body: JSON.stringify(roleData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessage({ 
          text: editingRole 
            ? "Role updated successfully!" 
            : "Role created successfully!", 
          type: "success" 
        });
        
        // Update local roles list
        if (editingRole) {
          setRoles(roles.map(r => 
            r.role === editingRole ? { ...roleData } : r
          ));
        } else {
          setRoles([...roles, roleData]);
        }
        
        // Reset form
        setRoleName("");
        setDescription("");
        setPermissions({
          can_view_finance: false,
          can_view_marketing: false,
          can_view_hr: false,
          can_view_engineering: false,
          can_view_company_general: true,
        });
        setEditingRole(null);
      } else {
        const errorData = await response.json();
        setMessage({ text: errorData.detail || "Operation failed", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error performing operation", type: "error" });
      console.error("Operation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role.role);
    setRoleName(role.role);
    setDescription(role.description);
    setPermissions({
      can_view_finance: role.can_view_finance,
      can_view_marketing: role.can_view_marketing,
      can_view_hr: role.can_view_hr,
      can_view_engineering: role.can_view_engineering,
      can_view_company_general: role.can_view_company_general,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {editingRole ? `Edit Role: ${editingRole}` : "Create New Role"}
      </h1>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded ${message.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-md p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">
              Role Name *
            </label>
            <input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={!!editingRole}
            />
            {editingRole && (
              <p className="mt-1 text-xs text-gray-500">
                Role name cannot be changed.
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <h3 className="block text-sm font-medium text-gray-700 mb-3">
              Permissions
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="can_view_finance"
                  checked={permissions.can_view_finance}
                  onChange={(e) => setPermissions({
                    ...permissions,
                    can_view_finance: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="can_view_finance" className="ml-2 block text-sm text-gray-700">
                  Can view finance data
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="can_view_marketing"
                  checked={permissions.can_view_marketing}
                  onChange={(e) => setPermissions({
                    ...permissions,
                    can_view_marketing: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="can_view_marketing" className="ml-2 block text-sm text-gray-700">
                  Can view marketing data
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="can_view_hr"
                  checked={permissions.can_view_hr}
                  onChange={(e) => setPermissions({
                    ...permissions,
                    can_view_hr: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="can_view_hr" className="ml-2 block text-sm text-gray-700">
                  Can view HR data
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="can_view_engineering"
                  checked={permissions.can_view_engineering}
                  onChange={(e) => setPermissions({
                    ...permissions,
                    can_view_engineering: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="can_view_engineering" className="ml-2 block text-sm text-gray-700">
                  Can view engineering data
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="can_view_company_general"
                  checked={permissions.can_view_company_general}
                  onChange={(e) => setPermissions({
                    ...permissions,
                    can_view_company_general: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled
                />
                <label htmlFor="can_view_company_general" className="ml-2 block text-sm text-gray-700">
                  Can view general company data (always enabled)
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (editingRole ? "Update Role" : "Create Role")}
            </button>
          </div>
        </form>
      </div>
      
      {/* Role List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Role Management</h2>
        
        {roles.length === 0 ? (
          <p className="text-gray-500">No roles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.role}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <ul className="list-disc list-inside">
                        {role.can_view_finance && <li>Finance data</li>}
                        {role.can_view_marketing && <li>Marketing data</li>}
                        {role.can_view_hr && <li>HR data</li>}
                        {role.can_view_engineering && <li>Engineering data</li>}
                        {role.can_view_company_general && <li>General company data</li>}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEdit(role)}
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