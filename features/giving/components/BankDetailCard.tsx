"use client";

import { useState } from "react";

type BankDetailCardProps = {
  accountHolder: string;
  bank: string;
  accountNumber: string;
  branchCode: string;
};

export function BankDetailCard({ accountHolder, bank, accountNumber, branchCode }: BankDetailCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="bank-detail-card" aria-labelledby="bank-details-title">
      <div className="bank-detail-card__header">
        <p className="section-kicker">Bank Details</p>
        <h2 id="bank-details-title">Orderly support for the work</h2>
      </div>

      <dl className="bank-detail-card__grid">
        <div className="bank-detail-card__row">
          <dt>Account holder</dt>
          <dd>{accountHolder}</dd>
        </div>
        <div className="bank-detail-card__row">
          <dt>Bank</dt>
          <dd>{bank}</dd>
        </div>
        <div className="bank-detail-card__row bank-detail-card__row--account">
          <dt>Account number</dt>
          <dd>
            <span className="bank-detail-card__mono">{accountNumber}</span>
            <button
              aria-label="Copy account number"
              className="bank-detail-card__copy"
              onClick={handleCopy}
              type="button"
            >
              Copy
            </button>
          </dd>
        </div>
        <div className="bank-detail-card__row">
          <dt>Branch code</dt>
          <dd>
            <span className="bank-detail-card__mono">{branchCode}</span>
          </dd>
        </div>
      </dl>

      <p className="bank-detail-card__status" aria-live="polite">
        {copied ? "Account number copied." : "Use these details plainly and with care."}
      </p>
    </section>
  );
}
