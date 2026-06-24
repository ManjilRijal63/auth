import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();

  // Not logged in → go to login
  if (!session) {
    redirect("/login");
  }

  // Logged in but not ADMIN → go to dashboard
  if (session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // At this point we KNOW the user is an ADMIN
  // Safe to load admin-only data
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <p className="text-gray-500 mb-8">
        Only admins can see this page.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-red-700">
          👑 Logged in as <strong>{session.user?.email}</strong> with role{" "}
          <strong>ADMIN</strong>
        </p>
      </div>

      {/* Real users from database */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
          <h2 className="font-semibold text-sm">
            All Users ({allUsers.length})
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Role</th>
              <th className="text-left px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name ?? "—"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}