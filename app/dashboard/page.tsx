import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  // Second layer of protection
  // Middleware already blocks unauthenticated users
  // but this is a backup — and also gives us the session data we need
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        You are logged in. This is your personal dashboard.
      </p>

      {/* Real session data */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-blue-800 mb-3">Your Session Info</h2>
        <div className="space-y-2 text-sm text-blue-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {session.user?.name ?? "—"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {session.user?.email ?? "—"}
          </p>
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span
              className={`font-semibold px-2 py-0.5 rounded text-xs ${
                session.user?.role === "ADMIN"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {session.user?.role}
            </span>
          </p>
          <p>
            <span className="font-medium">ID:</span> {session.user?.id ?? "—"}
          </p>
        </div>
      </div>

      {/* Show different content based on role */}
      {session.user?.role === "ADMIN" ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800">
            👑 You are an admin.{" "}
            <a href="/admin" className="underline font-medium">
              Go to Admin Panel →
            </a>
          </p>
        </div>
      ) : null}

      <div className="border rounded-lg p-5">
        <h2 className="font-semibold mb-3">What you can do:</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>View your profile</li>
          <li>Access protected content</li>
          <li>Regular user actions</li>
        </ul>
      </div>
    </div>
  );
}