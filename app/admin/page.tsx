import type { Metadata } from "next";
import { db } from "../../lib/db-client";
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
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(amount / 100);
}

export default async function AdminPage() {
  const [membershipRequests, prayerRequests, offeringSummary] = await Promise.all([
    db.membershipRequest.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
    }),
    db.prayerRequest.findMany({
      orderBy: { createdAt: "desc" },
    }),
    db.offeringTransaction.aggregate({
      where: { status: "success" },
      _sum: { amount: true },
      _count: { _all: true },
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
            This protected view is reserved for pending membership interviews, active intercession matters, and the
            recorded stewardship presently held in KOI&apos;s system of record.
          </p>
        </header>

        <section className="records-metrics" aria-label="Offering totals">
          <article className="records-metric">
            <p className="section-kicker">Offerings</p>
            <h2>{formatCurrency(totalOfferingAmount)}</h2>
            <p>Total offerings received across {totalOfferingCount} verified transaction(s).</p>
          </article>
        </section>

        <div className="admin-dashboard__grid">
          <section className="records-panel" aria-labelledby="admin-membership-title">
            <div className="records-panel__header">
              <p className="section-kicker">Membership</p>
              <h2 id="admin-membership-title">Pending Membership Interviews</h2>
              <p>{membershipRequests.length} request(s) awaiting review.</p>
            </div>

            <div className="records-table-wrap">
              <table className="records-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Location</th>
                    <th scope="col">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {membershipRequests.length > 0 ? (
                    membershipRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.name}</td>
                        <td>{request.email}</td>
                        <td>{request.phone}</td>
                        <td>{request.location}</td>
                        <td>{formatTimestamp(request.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="records-table__empty" colSpan={5}>
                        No pending membership interviews at this time.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="records-panel" aria-labelledby="admin-prayer-title">
            <div className="records-panel__header">
              <p className="section-kicker">Intercession</p>
              <h2 id="admin-prayer-title">Active Intercession Requests</h2>
              <p>{prayerRequests.length} request(s) currently in view.</p>
            </div>

            <div className="records-table-wrap">
              <table className="records-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Confidentiality</th>
                    <th scope="col">Request</th>
                    <th scope="col">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {prayerRequests.length > 0 ? (
                    prayerRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.name ?? "Anonymous"}</td>
                        <td>{request.email ?? "No reply requested"}</td>
                        <td>{request.isConfidential ? "Elder only" : "Assembly review"}</td>
                        <td className="records-table__request">{request.request}</td>
                        <td>{formatTimestamp(request.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="records-table__empty" colSpan={5}>
                        No active intercession requests at this time.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
}
