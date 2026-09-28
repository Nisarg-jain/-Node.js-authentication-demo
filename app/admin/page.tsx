import { clerkClient } from "@clerk/nextjs/server";
import { setRole, removeRole } from "./actions";

export default async function AdminPage() {
  const client = await clerkClient();
  const response = await client.users.getUserList();
  const users = response.data;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2 text-neutral-100">
        Admin Dashboard
      </h1>
      <p className="text-sm text-neutral-400 mb-8">
        Manage user roles and system privileges with Server Actions.
      </p>

      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-neutral-800/60 text-xs uppercase text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {users.map((user) => {
              const currentRole =
                (user.publicMetadata?.role as string) || "None";

              return (
                <tr
                  key={user.id}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-neutral-100">
                    {user.firstName || "Anonymous"} {user.lastName || ""}
                  </td>
                  <td className="px-6 py-4 text-neutral-400">
                    {user.emailAddresses[0]?.emailAddress}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                        currentRole === "admin"
                          ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                          : currentRole === "moderator"
                          ? "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                          : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                      }`}
                    >
                      {currentRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <form action={setRole}>
                        <input type="hidden" name="id" value={user.id} />
                        <input type="hidden" name="role" value="admin" />
                        <button
                          type="submit"
                          className="text-xs px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 cursor-pointer transition-colors"
                        >
                          Make Admin
                        </button>
                      </form>

                      <form action={setRole}>
                        <input type="hidden" name="id" value={user.id} />
                        <input type="hidden" name="role" value="moderator" />
                        <button
                          type="submit"
                          className="text-xs px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 cursor-pointer transition-colors"
                        >
                          Make Mod
                        </button>
                      </form>

                      <form action={removeRole}>
                        <input type="hidden" name="id" value={user.id} />
                        <button
                          type="submit"
                          className="text-xs px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 cursor-pointer transition-colors"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}