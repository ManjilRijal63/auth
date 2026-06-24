import { auth } from "@/lib/auth";

// This is a SERVER component — it runs on the server
// We can directly call auth() to get the session
export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        You are logged in. This is your personal dashboard.
      </p>

      {/* Real session data */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-blue-800 mb-3">Your Session Info</h2>
        <div className="space-y-1 text-sm text-blue-700">
          <p>Name: {session?.user?.name ?? "—"}</p>
          <p>Email: {session?.user?.email ?? "—"}</p>
          <p>
            Role:{" "}
            <span className="font-semibold">{session?.user?.role ?? "—"}</span>
          </p>
          <p>ID: {session?.user?.id ?? "—"}</p>
        </div>
      </div>

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