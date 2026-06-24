export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome to AuthApp</h1>
      <p className="text-gray-500 mb-8">
        A minimal app to learn authentication and authorization.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-5">
          <div className="text-2xl mb-2">🌍</div>
          <h2 className="font-semibold mb-1">Public Page</h2>
          <p className="text-sm text-gray-500">
            This page. No login needed. Everyone sees this.
          </p>
        </div>

        <div className="border rounded-lg p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold mb-1">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Only logged-in users can access this.
          </p>
        </div>

        <div className="border rounded-lg p-5">
          <div className="text-2xl mb-2">👑</div>
          <h2 className="font-semibold mb-1">Admin Panel</h2>
          <p className="text-sm text-gray-500">
            Only users with ADMIN role can access this.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>You are learning:</strong> Authentication = who you are.
          Authorization = what you are allowed to do.
        </p>
      </div>
    </div>
  );
}