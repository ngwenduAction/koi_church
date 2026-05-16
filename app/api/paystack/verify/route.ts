import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db-client";

export const runtime = "nodejs";

const EXPECTED_AMOUNT = 10000;
const EXPECTED_CURRENCY = "ZAR";
const SUCCESS_STATUS = "SUCCESS";

type VerifyPayload = {
  reference?: unknown;
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    status?: string;
    reference?: string;
    amount?: number;
    currency?: string;
    paid_at?: string | null;
    customer?: {
      email?: string | null;
    };
  };
};

function isDuplicateReferenceError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Paystack secret key is not configured." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as VerifyPayload;

    if (typeof body.reference !== "string" || body.reference.trim().length === 0) {
      return NextResponse.json({ error: "A transaction reference is required." }, { status: 400 });
    }

    const reference = body.reference.trim();
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      cache: "no-store",
    });

    const payload = (await response.json()) as PaystackVerifyResponse;

    if (!response.ok || !payload.status || !payload.data) {
      return NextResponse.json({ error: payload.message || "Unable to verify transaction." }, { status: 502 });
    }

    const verifiedReference = payload.data.reference?.trim();
    const verifiedEmail = payload.data.customer?.email?.trim().toLowerCase();
    const verifiedStatus = payload.data.status?.toLowerCase();

    if (
      verifiedStatus !== "success" ||
      payload.data.amount !== EXPECTED_AMOUNT ||
      payload.data.currency !== EXPECTED_CURRENCY ||
      !verifiedReference ||
      !verifiedEmail
    ) {
      return NextResponse.json(
        { error: "Transaction verification did not match KOI offering rules." },
        { status: 400 },
      );
    }

    try {
      const transaction = await db.offeringTransaction.create({
        data: {
          reference: verifiedReference,
          email: verifiedEmail,
          amount: payload.data.amount,
          currency: payload.data.currency,
          status: SUCCESS_STATUS,
          provider: "paystack",
          paidAt: payload.data.paid_at ? new Date(payload.data.paid_at) : new Date(),
        },
      });

      return NextResponse.json(
        {
          ok: true,
          reference: transaction.reference,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
        },
        { status: 201 },
      );
    } catch (error) {
      if (isDuplicateReferenceError(error)) {
        return NextResponse.json(
          { error: "This Paystack reference has already been recorded in the treasury ledger." },
          { status: 409 },
        );
      }

      console.error("Paystack transaction persistence failed", error);
      return NextResponse.json({ error: "Verified transaction could not be written to the database." }, { status: 500 });
    }
  } catch (error) {
    console.error("Paystack verification failed", error);
    return NextResponse.json({ error: "Unable to verify offering transaction." }, { status: 500 });
  }
}
