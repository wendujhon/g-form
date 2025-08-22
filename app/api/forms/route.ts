import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const db = await getDb();
    const result = await db.collection("submissions").insertOne({
      data,
      createdAt: new Date(),
    });
    return NextResponse.json(
      { ok: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("/api/forms POST error", err);
    return NextResponse.json(
      { ok: false, error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
