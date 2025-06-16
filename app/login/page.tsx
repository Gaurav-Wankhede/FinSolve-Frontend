"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { status } = useSession();

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Logging in with username:", username);
      
      // First call the backend API to get the token
      const apiResponse = await fetch("https://fin-solve-backend.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("Login failed:", errorText);
        setError("Invalid username or password");
        return;
      }

      const data = await apiResponse.json();
      const { access_token, role } = data;
      
      console.log("Received token:", access_token.substring(0, 15) + "...");
      console.log("User role:", role);

      // Now sign in with NextAuth
      const result = await signIn("credentials", {
        username,
        password,
        accessToken: access_token,
        role,
        redirect: false,
      });

      if (result?.ok) {
        console.log("NextAuth sign-in successful");
        router.push("/dashboard");
      } else {
        console.error("NextAuth sign-in failed:", result?.error);
        setError("An error occurred during login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-blue-900 text-center">Login</h1>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
        >
          Login
        </button>
        
        <div className="text-center text-sm text-gray-600 mt-4">
          <p>Demo accounts:</p>
          <ul className="mt-2 space-y-1">
            <li><strong>engineering:</strong> username: Tony, password: password123</li>
            <li><strong>marketing:</strong> username: Bruce, password: securepass</li>
            <li><strong>finance:</strong> username: Sam, password: financepass</li>
            <li><strong>engineering:</strong> username: Peter, password: pete123</li>
            <li><strong>marketing:</strong> username: Sid, password: sidpass123</li>
            <li><strong>hr:</strong> username: Natasha, password: hrpass123</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
