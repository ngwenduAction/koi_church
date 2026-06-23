"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type BankDetailCardProps = {
  accountHolder: string;
  bank: string;
  accountNumber: string;
  branchCode: string;
};

export function BankDetailCard({ accountHolder, bank, accountNumber, branchCode }: BankDetailCardProps) {
  const t = useTranslations("giving.bank");
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
        <p className="section-kicker">{t("kicker")}</p>
        <h2 id="bank-details-title">{t("title")}</h2>
      </div>

      <dl className="bank-detail-card__grid">
        <div className="bank-detail-card__row">
          <dt>{t("accountHolder")}</dt>
          <dd>{accountHolder}</dd>
        </div>
        <div className="bank-detail-card__row">
          <dt>{t("bank")}</dt>
          <dd>{bank}</dd>
        </div>
        <div className="bank-detail-card__row bank-detail-card__row--account">
          <dt>{t("accountNumber")}</dt>
          <dd>
            <span className="bank-detail-card__mono">{accountNumber}</span>
            <button aria-label={t("copyAccount")} className="bank-detail-card__copy" onClick={handleCopy} type="button">
              {t("copy")}
            </button>
          </dd>
        </div>
        <div className="bank-detail-card__row">
          <dt>{t("branchCode")}</dt>
          <dd>
            <span className="bank-detail-card__mono">{branchCode}</span>
          </dd>
        </div>
      </dl>

      <p className="bank-detail-card__status" aria-live="polite">
        {copied ? t("copied") : t("note")}
      </p>
    </section>
  );
}
