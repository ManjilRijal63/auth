import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth, signOut } from "@/lib/auth";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Learning App",
  description: "Learning authentication and authorization in Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* Navbar */}
          <nav className="bg-gray-800 text-white p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <a href="/" className="font-bold text-lg">
                AuthApp
              </a>

              <div className="flex items-center gap-6">
                <a href="/" className="hover:text-gray-300 text-sm">
                  Home
                </a>
                <a href="/dashboard" className="hover:text-gray-300 text-sm">
                  Dashboard
                </a>

                {/* Only show Admin link if user is ADMIN */}
                {session?.user?.role === "ADMIN" && (
                  <a href="/admin" className="hover:text-gray-300 text-sm">
                    Admin
                  </a>
                )}

                {session ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300">
                      {session.user?.name ?? session.user?.email}
                      <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded">
                        {session.user?.role}
                      </span>
                    </span>

                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                      }}
                    >
                      <button
                        type="submit"
                        className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition-colors"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                ) : (
                  <a
                    href="/login"
                    className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded transition-colors"
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </nav>

          {/* Page content — only rendered ONCE, after the navbar */}
          <main className="max-w-4xl mx-auto p-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}