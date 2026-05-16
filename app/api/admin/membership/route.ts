import { NextResponse } from "next/server";
import { db } from "../../../../lib/db-client";
import { hasValidAdminAuthorization } from "../../../../lib/adminAuth";

export const runtime = "nodejs";

const allowedStatuses = new Set(["REVIEWED", "ARCHIVED"]);

type MembershipActionPayload = {
  id?: unknown;
  status?: unknown;
};

export async function PATCH(request: Request) {
  if (!hasValidAdminAuthorization(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as MembershipActionPayload;

    if (typeof body.id !== "string" || body.id.trim().length === 0) {
      return NextResponse.json({ error: "Membership request id is required." }, { status: 400 });
    }

    if (typeof body.status !== "string" || !allowedStatuses.has(body.status)) {
      return NextResponse.json({ error: "Invalid membership status." }, { status: 400 });
    }

    const updated = await db.membershipRequest.update({
      where: { id: body.id.trim() },
      data: { status: body.status },
    });

    return NextResponse.json({ ok: true, id: updated.id, status: updated.status });
  } catch (error) {
    console.error("Membership workflow update failed", error);
    return NextResponse.json({ error: "Unable to update membership request." }, { status: 500 });
  }
}
