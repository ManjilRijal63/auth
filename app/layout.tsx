import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Learning App",
  description: "Learning authentication and authorization in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <a href="/" className="font-bold text-lg">
              AuthApp
            </a>
            <div className="flex gap-6">
              <a href="/" className="hover:text-gray-300 text-sm">
                Home
              </a>
              <a href="/dashboard" className="hover:text-gray-300 text-sm">
                Dashboard
              </a>
              <a href="/admin" className="hover:text-gray-300 text-sm">
                Admin
              </a>
              <a href="/login" className="hover:text-gray-300 text-sm">
                Login
              </a>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main className="max-w-4xl mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}