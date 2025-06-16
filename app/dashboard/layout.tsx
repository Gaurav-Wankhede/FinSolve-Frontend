"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  Upload, 
  Users, 
  Shield, 
  FileText,
  LogOut,
  Menu
} from "lucide-react";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";

// Extend session user type to include accessToken and role
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const sessionData = session as ExtendedSession | null;
  const [userRole, setUserRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    } else if (status === "authenticated" && sessionData?.user?.role) {
      setUserRole(sessionData.user.role);
      setIsLoading(false);
    }
  }, [status, sessionData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "finance":
        return "Finance Team";
      case "marketing":
        return "Marketing Team";
      case "hr":
        return "HR Team";
      case "engineering":
        return "Engineering Department";
      case "c-level-executive":
        return "C-Level Executive";
      case "employee":
        return "Employee";
      default:
        return role;
    }
  };

  // Only show admin links for c-level executives
  const isAdmin = userRole === "c-level-executive";

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm h-screen fixed">
        <div className="h-full flex flex-col">
          <div className="px-4 py-2 text-xs font-medium text-gray-600 uppercase">
            Dashboard
          </div>
          <Link 
            href="/dashboard" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Home className="h-4 w-4 mr-3" />
            <span>Home</span>
          </Link>
          
          {isAdmin && (
            <>
              <div className="mt-4 px-4 py-2 text-xs font-medium text-gray-600 uppercase">
                Administration
              </div>
              <Link 
                href="/dashboard/upload" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Upload className="h-4 w-4 mr-3" />
                <span>Upload Documents</span>
              </Link>
              <Link 
                href="/dashboard/users" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Users className="h-4 w-4 mr-3" />
                <span>Manage Users</span>
              </Link>
              <Link 
                href="/dashboard/roles" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Shield className="h-4 w-4 mr-3" />
                <span>Manage Roles</span>
              </Link>
              <Link 
                href="/dashboard/documents" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FileText className="h-4 w-4 mr-3" />
                <span>View Documents</span>
              </Link>
            </>
          )}
          
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 