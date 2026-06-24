import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

// We extend the built-in Auth.js types to include our custom "role" field
// Without this, TypeScript doesn't know that session.user has a "role"
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "USER" | "ADMIN";
    };
  }

  interface User {
    role: "USER" | "ADMIN";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // The adapter connects Auth.js to your database via Prisma
  // It automatically saves users, accounts, sessions to your DB
  adapter: PrismaAdapter(prisma),

  // We use JWT strategy — session info is stored in an encrypted cookie
  // The alternative is "database" sessions but JWT is simpler to start with
  session: {
    strategy: "jwt",
  },

  // Where Auth.js should redirect for login
  pages: {
    signIn: "/login",
  },

  // Providers = ways a user can log in
  providers: [
    // ---- GOOGLE PROVIDER ----
    // Auth.js handles everything for Google login automatically
    // When a Google user logs in for the first time, Auth.js creates
    // a User + Account record in your DB automatically
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // ---- CREDENTIALS PROVIDER ----
    // This is for email + password login
    // We manually handle the logic here
    Credentials({
      // These define what fields the login form needs
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // This function runs when someone tries to login with email/password
      // If you return a user object = login success
      // If you return null = login failed
      async authorize(credentials) {
        // Safety check — make sure email and password were provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Look up the user in the database by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // If no user found, return null (login fails)
        if (!user || !user.password) {
          return null;
        }

        // Compare the entered password with the hashed password in DB
        // bcrypt.compare handles the hashing comparison for us
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        // If passwords don't match, return null (login fails)
        if (!passwordMatch) {
          return null;
        }

        // If everything is good, return the user
        // Auth.js will create a session for them
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  // ---- CALLBACKS ----
  // Callbacks are functions that run at specific moments in the auth flow
  // They let you customize what gets stored in the token/session

  callbacks: {
    // jwt() runs when a JWT token is created or updated
    // "token" = the encrypted cookie data
    // "user" = only available right after login
    async jwt({ token, user }) {
      // Right after login, "user" exists — grab the role and id
      // and store them inside the token
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },

    // session() runs when you call auth() or useSession()
    // It takes data from the token and puts it in the session object
    // This is what your frontend components actually read
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
});