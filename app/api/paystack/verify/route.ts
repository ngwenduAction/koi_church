import { NextResponse } from "next/server";
import { db } from "../../../../lib/db-client";

export const runtime = "nodejs";

const EXPECTED_AMOUNT = 10000;
const EXPECTED_CURRENCY = "ZAR";

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

    if (
      payload.data.status !== "success" ||
      payload.data.amount !== EXPECTED_AMOUNT ||
      payload.data.currency !== EXPECTED_CURRENCY ||
      !payload.data.reference ||
      !payload.data.customer?.email
    ) {
      return NextResponse.json({ error: "Transaction verification did not match KOI offering rules." }, { status: 400 });
    }

    const transaction = await db.offeringTransaction.upsert({
      where: { reference: payload.data.reference },
      update: {
        email: payload.data.customer.email,
        amount: payload.data.amount,
        currency: payload.data.currency,
        status: payload.data.status,
        paidAt: payload.data.paid_at ? new Date(payload.data.paid_at) : new Date(),
      },
      create: {
        reference: payload.data.reference,
        email: payload.data.customer.email,
        amount: payload.data.amount,
        currency: payload.data.currency,
        status: payload.data.status,
        paidAt: payload.data.paid_at ? new Date(payload.data.paid_at) : new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      reference: transaction.reference,
      amount: transaction.amount,
      currency: transaction.currency,
    });
  } catch (error) {
    console.error("Paystack verification failed", error);
    return NextResponse.json({ error: "Unable to verify offering transaction." }, { status: 500 });
  }
}
