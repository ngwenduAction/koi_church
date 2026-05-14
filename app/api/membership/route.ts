import { NextResponse } from "next/server";
import { createId, getDatabase } from "../../../lib/database";

export const runtime = "nodejs";

type MembershipPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MembershipPayload;

    if (!isNonEmptyString(body.name) || !isNonEmptyString(body.email) || !isNonEmptyString(body.phone) || !isNonEmptyString(body.location)) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const database = getDatabase();
    const id = createId();

    database
      .prepare(
        `INSERT INTO MembershipRequest (id, name, email, phone, location, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(id, body.name.trim(), body.email.trim().toLowerCase(), body.phone.trim(), body.location.trim(), "pending", new Date().toISOString());

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("Membership request failed", error);
    return NextResponse.json({ error: "Unable to save membership request." }, { status: 500 });
  }
}
