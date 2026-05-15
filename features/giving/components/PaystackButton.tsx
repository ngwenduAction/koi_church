"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    PaystackPop?: unknown;
  }
}

export function PaystackButton() {
  useEffect(() => {
    if (document.querySelector('script[data-paystack="koi"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.dataset.paystack = "koi";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  function handleClick() {
    window.alert("Connecting to Paystack Secure Gateway...");
  }

  return (
    <div className="paystack-shell">
      <p className="section-kicker">Secure Gateway</p>
      <button className="paystack-button" type="button" onClick={handleClick}>
        Complete Offering
      </button>
      <p className="paystack-shell__note">Placeholder handshake for a later Paystack integration pass.</p>
    </div>
  );
}
