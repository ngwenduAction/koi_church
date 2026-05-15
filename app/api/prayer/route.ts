import { NextResponse } from "next/server";
import { db } from "../../../lib/db-client";

export const runtime = "nodejs";

type PrayerPayload = {
  name?: unknown;
  email?: unknown;
  request?: unknown;
  isConfidential?: unknown;
};

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PrayerPayload;

    if (typeof body.request !== "string" || body.request.trim().length === 0) {
      return NextResponse.json({ error: "Prayer request is required." }, { status: 400 });
    }

    if (!isOptionalString(body.name) || !isOptionalString(body.email)) {
      return NextResponse.json({ error: "Invalid prayer request payload." }, { status: 400 });
    }

    if (typeof body.email === "string" && body.email.trim() && !isValidEmail(body.email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const record = await db.prayerRequest.create({
      data: {
        name: typeof body.name === "string" && body.name.trim() ? body.name.trim() : null,
        email: typeof body.email === "string" && body.email.trim() ? body.email.trim().toLowerCase() : null,
        request: body.request.trim(),
        isConfidential: body.isConfidential === undefined ? true : Boolean(body.isConfidential),
      },
    });

    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (error) {
    console.error("Prayer request failed", error);
    return NextResponse.json({ error: "Unable to save prayer request." }, { status: 500 });
  }
}
