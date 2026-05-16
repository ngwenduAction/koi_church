import type { Metadata } from "next";
import { db } from "../../lib/db-client";
import { AdminDashboardClient } from "../../features/admin/components/AdminDashboardClient";
import { Container } from "../../shared/components/Container";

export const metadata: Metadata = {
  title: "Admin | Kingdom of Israel",
  description: "Protected administrative records for Kingdom of Israel.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function formatTimestamp(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatCurrency(amount: number) {
  return `R ${((amount ?? 0) / 100).toFixed(2)}`;
}

export default async function AdminPage() {
  const [membershipRequests, prayerRequests, offeringSummary, ledgerTransactions] = await Promise.all([
    db.membershipRequest.findMany({
      where: {
        status: {
          notIn: ["REVIEWED", "ARCHIVED"],
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.prayerRequest.findMany({
      where: {
        status: {
          notIn: ["INTERCEDED", "ARCHIVED"],
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.offeringTransaction.aggregate({
      where: { status: "success" },
      _sum: { amount: true },
      _count: { _all: true },
    }),
    db.offeringTransaction.findMany({
      where: { status: "success" },
      orderBy: [{ paidAt: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const totalOfferingAmount = offeringSummary._sum.amount ?? 0;
  const totalOfferingCount = offeringSummary._count._all;

  return (
    <section className="admin-dashboard">
      <Container className="admin-dashboard__inner">
        <header className="admin-dashboard__hero">
          <p className="section-kicker">Internal Records Office</p>
          <h1>Institutional records kept in order before the house.</h1>
          <p className="reading-prose">
            This protected view is reserved for active membership interviews, intercession matters, and the treasury
            ledger presently held in KOI&apos;s system of record.
          </p>
        </header>

        <section className="records-metrics" aria-label="Offering totals">
          <article className="records-metric">
            <p className="section-kicker">Offerings Received</p>
            <h2>{formatCurrency(totalOfferingAmount)}</h2>
            <p>Total offerings received across {totalOfferingCount} verified transaction(s).</p>
          </article>
        </section>

        <AdminDashboardClient
          initialMembershipRequests={membershipRequests.map((request) => ({
            id: request.id,
            name: request.name,
            email: request.email,
            phone: request.phone,
            location: request.location,
            status: request.status,
            createdAtLabel: formatTimestamp(request.createdAt),
          }))}
          initialPrayerRequests={prayerRequests.map((request) => ({
            id: request.id,
            name: request.name,
            email: request.email,
            request: request.request,
            isConfidential: request.isConfidential,
            status: request.status,
            createdAtLabel: formatTimestamp(request.createdAt),
          }))}
          ledgerTransactions={ledgerTransactions.map((transaction) => ({
            id: transaction.id,
            email: transaction.email,
            reference: transaction.reference,
            amountLabel: formatCurrency(transaction.amount),
            createdAtLabel: formatTimestamp(transaction.paidAt ?? transaction.createdAt),
          }))}
        />
      </Container>
    </section>
  );
}
