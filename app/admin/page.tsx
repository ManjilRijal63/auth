export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <p className="text-gray-500 mb-8">
        This page is for ADMINS only. Regular users will be blocked.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-red-700">
          👑 You are seeing this because you have the <strong>ADMIN</strong>{" "}
          role. Regular users get redirected away from this page.
        </p>
      </div>

      {/* Fake user table — we'll make this real in Phase 5 */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="font-semibold text-sm">All Users (placeholder)</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3">Alice</td>
              <td className="px-4 py-3">alice@example.com</td>
              <td className="px-4 py-3">
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                  ADMIN
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3">Bob</td>
              <td className="px-4 py-3">bob@example.com</td>
              <td className="px-4 py-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                  USER
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3">Carol</td>
              <td className="px-4 py-3">carol@example.com</td>
              <td className="px-4 py-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                  USER
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}