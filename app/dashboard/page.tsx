export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        This page is protected. Only logged-in users can see it.
      </p>

      {/* User info card — we'll fill this with real data in Phase 4 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-blue-800 mb-3">Your Session Info</h2>
        <div className="space-y-1 text-sm text-blue-700">
          <p>Name: —</p>
          <p>Email: —</p>
          <p>Role: —</p>
        </div>
        <p className="text-xs text-blue-400 mt-3">
          (Real data will show here after we add auth in Phase 4)
        </p>
      </div>

      <div className="border rounded-lg p-5">
        <h2 className="font-semibold mb-3">What logged-in users can do:</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>View their own profile</li>
          <li>Access protected content</li>
          <li>Perform regular user actions</li>
        </ul>
      </div>
    </div>
  );
}