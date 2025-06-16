"use client";

import Link from "next/link"
import React from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"

// Extend the session user type
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface ExtendedSession {
  user: ExtendedUser;
  expires: string;
}

export default function Header() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const sessionData = session as ExtendedSession | null;

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-yellow-200 text-center py-2 text-sm font-medium text-gray-800">
        Codebasics Challenge: Build a RAG-Based Assistant for FinSolve Technologies!
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="FinSolve Logo" width={32} height={32} />
            <span className="font-bold text-2xl text-blue-900 tracking-tight">FinSolve</span>
          </Link>
        </div>
        <div className="flex gap-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {sessionData?.user?.name}
                {sessionData?.user?.role && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {sessionData.user.role}
                  </span>
                )}
              </span>
              <Link 
                href="/dashboard" 
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/api/auth/signout"
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  )
}
