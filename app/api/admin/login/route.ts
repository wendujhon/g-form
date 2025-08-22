import { NextRequest, NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const password: string | undefined = body?.password;
  if (!password) {
    return NextResponse.json(
      { ok: false, error: "Password required" },
      { status: 400 }
    );
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 }
    );
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }
  const token = await signAdminToken({ role: "admin" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
