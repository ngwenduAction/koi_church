"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    PaystackPop?: new () => {
      newTransaction: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        reference: string;
        onSuccess: (transaction: { reference: string }) => void;
        onCancel: () => void;
        onError?: (error: { message?: string }) => void;
      }) => void;
    };
  }
}

const OFFERING_AMOUNT = 10000;
const OFFERING_CURRENCY = "ZAR";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: OFFERING_CURRENCY,
  }).format(amount / 100);
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

function createReference() {
  return `koi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function PaystackButton() {
  const t = useTranslations("giving.paystack");
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "launching" | "verifying" | "success" | "error">("idle");
  const [message, setMessage] = useState(t("idle", { amount: formatCurrency(OFFERING_AMOUNT) }));

  useEffect(() => {
    setMessage(t("idle", { amount: formatCurrency(OFFERING_AMOUNT) }));
  }, [t]);

  useEffect(() => {
    if (document.querySelector('script[data-paystack="koi-v2"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    script.dataset.paystack = "koi-v2";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const isDisabled = useMemo(() => status === "launching" || status === "verifying", [status]);

  async function handleSuccess(reference: string) {
    setStatus("verifying");
    setMessage(t("verifying"));

    try {
      const response = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      });

      const payload = (await response.json()) as { error?: string; amount?: number; currency?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error ?? t("verifyError"));
        return;
      }

      setStatus("success");
      setMessage(t("success", { amount: formatCurrency(payload.amount ?? OFFERING_AMOUNT) }));
    } catch {
      setStatus("error");
      setMessage(t("verifyError"));
    }
  }

  function handleClick() {
    if (!publicKey) {
      setStatus("error");
      setMessage(t("missingKey"));
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage(t("invalidEmail"));
      return;
    }

    const PaystackConstructor = window.PaystackPop;

    if (!PaystackConstructor) {
      setStatus("error");
      setMessage(t("unavailable"));
      return;
    }

    setStatus("launching");
    setMessage(t("launching"));

    const popup = new PaystackConstructor();

    popup.newTransaction({
      key: publicKey,
      email,
      amount: OFFERING_AMOUNT,
      currency: OFFERING_CURRENCY,
      reference: createReference(),
      onSuccess: (transaction) => {
        void handleSuccess(transaction.reference);
      },
      onCancel: () => {
        setStatus("idle");
        setMessage(t("cancelled"));
      },
      onError: (error) => {
        setStatus("error");
        setMessage(error.message ?? t("startError"));
      },
    });
  }

  return (
    <div className="paystack-shell">
      <div className="paystack-shell__intro">
        <p className="section-kicker">{t("kicker")}</p>
        <h3>{t("title", { amount: formatCurrency(OFFERING_AMOUNT) })}</h3>
        <p className="paystack-shell__note">{t("note")}</p>
      </div>

      <div className="paystack-shell__field form-field">
        <label htmlFor="paystack-email">{t("emailLabel")}</label>
        <input
          id="paystack-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
        />
      </div>

      <button className="paystack-button" type="button" onClick={handleClick} disabled={isDisabled}>
        {status === "launching" || status === "verifying" ? t("processing") : t("button")}
      </button>

      <p className={`paystack-shell__status paystack-shell__status--${status}`}>{message}</p>
    </div>
  );
}
