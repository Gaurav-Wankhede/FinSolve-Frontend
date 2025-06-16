import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Add the secret configuration
  secret: process.env.NEXTAUTH_SECRET || "temporary-fallback-secret-for-development-only",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "text" },
        accessToken: { label: "Access Token", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // If we already have the token (from login page fetch)
        if (credentials.accessToken && credentials.role) {
          console.log("Using provided token:", credentials.accessToken.substring(0, 15) + "...");
          return {
            id: credentials.username,
            name: credentials.username,
            role: credentials.role,
            accessToken: credentials.accessToken,
          };
        }

        // Otherwise get token from backend - updated to use Vercel backend URL
        try {
          console.log("Fetching token from backend for:", credentials.username);
          const res = await fetch("https://fin-solve-backend.vercel.app/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error("Login failed:", await res.text());
            return null;
          }
          
          const user = await res.json();
          console.log("Token received from backend:", user.access_token.substring(0, 15) + "...");
          return {
            id: credentials.username,
            name: credentials.username,
            role: user.role,
            accessToken: user.access_token,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        console.log("Setting token for user:", user.name);
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token?.role) session.user.role = token.role;
      if (token?.accessToken) {
        session.user.accessToken = token.accessToken;
        console.log("Added token to session:", token.accessToken.substring(0, 15) + "...");
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  // Only enable debug in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };