import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  // 1. Fast auth context (userId, sessionId)
  const authObj = await auth();

  // 2. Full backend user details
  const userObj = await currentUser();

  console.log("Server auth():", authObj);
  console.log("Server currentUser():", userObj);

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-neutral-100">
        Dashboard (Server Component)
      </h1>

      <div className="grid gap-6">
        {/* User Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-400 mb-3">
            Authenticated User Data
          </h2>
          <div className="space-y-2 text-sm text-neutral-300">
            <p>
              <strong className="text-neutral-100">Name:</strong>{" "}
              {userObj?.firstName || "N/A"} {userObj?.lastName || ""}
            </p>
            <p>
              <strong className="text-neutral-100">Email:</strong>{" "}
              {userObj?.emailAddresses[0]?.emailAddress}
            </p>
            <p>
              <strong className="text-neutral-100">User ID:</strong>{" "}
              <code className="bg-neutral-800 px-2 py-0.5 rounded text-xs text-neutral-300">
                {authObj.userId}
              </code>
            </p>
          </div>
        </div>

        {/* Auth Object Details */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-400 mb-3">
            Session Details (`auth()`)
          </h2>
          <pre className="bg-neutral-950 p-4 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-neutral-800">
            {JSON.stringify(
              {
                userId: authObj.userId,
                sessionId: authObj.sessionId,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}