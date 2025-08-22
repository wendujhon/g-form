import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const store = await cookies();
    const token = store.get("admin_token")?.value;
    if (!token)
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    await verifyAdminToken(token);
    const db = await getDb();
    const items = await db
      .collection("submissions")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
