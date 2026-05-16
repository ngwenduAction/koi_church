"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type MembershipRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  createdAtLabel: string;
};

type PrayerRecord = {
  id: string;
  name: string | null;
  email: string | null;
  request: string;
  isConfidential: boolean;
  status: string;
  createdAtLabel: string;
};

type LedgerRecord = {
  id: string;
  email: string;
  reference: string;
  amountLabel: string;
  createdAtLabel: string;
};

type AdminDashboardClientProps = {
  initialMembershipRequests: MembershipRecord[];
  initialPrayerRequests: PrayerRecord[];
  ledgerTransactions: LedgerRecord[];
};

async function patchWorkflow(endpoint: string, id: string, status: string) {
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });

  const payload = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(payload.error ?? "Unable to update record.");
  }
}

export function AdminDashboardClient({
  initialMembershipRequests,
  initialPrayerRequests,
  ledgerTransactions,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [membershipRequests, setMembershipRequests] = useState(initialMembershipRequests);
  const [prayerRequests, setPrayerRequests] = useState(initialPrayerRequests);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const membershipCount = membershipRequests.length;
  const prayerCount = prayerRequests.length;

  const totals = useMemo(() => ledgerTransactions.length, [ledgerTransactions]);

  function handleMembershipAction(id: string, status: "REVIEWED" | "ARCHIVED") {
    const previous = membershipRequests;
    setErrorMessage(null);
    setMembershipRequests((current) => current.filter((request) => request.id !== id));

    startTransition(async () => {
      try {
        await patchWorkflow("/api/admin/membership", id, status);
        router.refresh();
      } catch (error) {
        setMembershipRequests(previous);
        setErrorMessage(error instanceof Error ? error.message : "Unable to update membership request.");
      }
    });
  }

  function handlePrayerAction(id: string, status: "INTERCEDED" | "ARCHIVED") {
    const previous = prayerRequests;
    setErrorMessage(null);
    setPrayerRequests((current) => current.filter((request) => request.id !== id));

    startTransition(async () => {
      try {
        await patchWorkflow("/api/admin/prayer", id, status);
        router.refresh();
      } catch (error) {
        setPrayerRequests(previous);
        setErrorMessage(error instanceof Error ? error.message : "Unable to update prayer request.");
      }
    });
  }

  return (
    <>
      {errorMessage ? <p className="records-error">{errorMessage}</p> : null}

      <section className="records-metrics" aria-label="Offering totals">
        <article className="records-metric">
          <p className="section-kicker">Workflow</p>
          <h2>{membershipCount + prayerCount}</h2>
          <p>{membershipCount} membership item(s) and {prayerCount} intercession item(s) remain active.</p>
        </article>
        <article className="records-metric">
          <p className="section-kicker">Ledger Entries</p>
          <h2>{totals}</h2>
          <p>Verified Paystack transactions currently available in the institutional ledger.</p>
        </article>
      </section>

      <div className="admin-dashboard__grid">
        <section className="records-panel" aria-labelledby="admin-membership-title">
          <div className="records-panel__header">
            <p className="section-kicker">Membership</p>
            <h2 id="admin-membership-title">Pending Membership Interviews</h2>
            <p>{membershipCount} request(s) awaiting review.</p>
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
                  <th scope="col">Actions</th>
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
                      <td>{request.createdAtLabel}</td>
                      <td>
                        <div className="records-actions">
                          <button type="button" className="records-action" disabled={isPending} onClick={() => handleMembershipAction(request.id, "REVIEWED")}>
                            Mark Reviewed
                          </button>
                          <button type="button" className="records-action" disabled={isPending} onClick={() => handleMembershipAction(request.id, "ARCHIVED")}>
                            Archive
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="records-table__empty" colSpan={6}>
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
            <p>{prayerCount} request(s) currently in view.</p>
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
                  <th scope="col">Actions</th>
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
                      <td>{request.createdAtLabel}</td>
                      <td>
                        <div className="records-actions">
                          <button type="button" className="records-action" disabled={isPending} onClick={() => handlePrayerAction(request.id, "INTERCEDED")}>
                            Mark Interceded
                          </button>
                          <button type="button" className="records-action" disabled={isPending} onClick={() => handlePrayerAction(request.id, "ARCHIVED")}>
                            Archive
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="records-table__empty" colSpan={6}>
                      No active intercession requests at this time.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="records-panel records-panel--ledger" aria-labelledby="admin-ledger-title">
        <div className="records-panel__header">
          <p className="section-kicker">Treasury</p>
          <h2 id="admin-ledger-title">Financial Ledger (Paystack)</h2>
          <p>Verified offering transactions recorded through the secure gateway.</p>
        </div>

        <div className="records-table-wrap">
          <table className="records-table records-table--ledger">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Giver Email</th>
                <th scope="col">Reference ID</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {ledgerTransactions.length > 0 ? (
                ledgerTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.createdAtLabel}</td>
                    <td>{transaction.email}</td>
                    <td className="records-table__reference">{transaction.reference}</td>
                    <td className="records-table__amount">{transaction.amountLabel}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="records-table__empty" colSpan={4}>
                    No verified offering transactions have been recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
