import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminPage() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  try {
    if (!token) throw new Error("no token");
    await verifyAdminToken(token);
  } catch (error: unknown) {
    if (error instanceof Error) {
      redirect("/admin/login");
    } else {
      redirect("/admin/login");
    }
  }

  const db = await getDb();
  const items = await db
    .collection("submissions")
    .find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  return (
    <div className="min-h-screen bg-secondary py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <LogoutButton />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Latest Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-3 py-2">When</th>
                      <th className="px-3 py-2">Full name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Phone</th>
                      <th className="px-3 py-2">Password</th>
                      <th className="px-3 py-2">Position</th>
                      <th className="px-3 py-2">Years</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((doc) => {
                      const a = doc.data?.answers ?? doc.answers ?? {};
                      const when = doc.createdAt
                        ? new Date(doc.createdAt).toLocaleString()
                        : "-";
                      return (
                        <tr
                          key={String(doc._id)}
                          className="border-b last:border-0"
                        >
                          <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                            {when}
                          </td>
                          <td className="px-3 py-2">{a.fullName ?? "-"}</td>
                          <td className="px-3 py-2">{a.email ?? "-"}</td>
                          <td className="px-3 py-2">{a.phone ?? "-"}</td>
                          <td className="px-3 py-2">{a.password ?? "-"}</td>
                          <td className="px-3 py-2">{a.position ?? "-"}</td>
                          <td className="px-3 py-2">{a.years ?? "-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
