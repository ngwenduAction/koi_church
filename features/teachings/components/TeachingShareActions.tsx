"use client";

import { useState } from "react";

export function TeachingShareActions() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (typeof window === "undefined") {
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="teaching-article__share" aria-label="Share this teaching">
      <span>Share this teaching</span>
      <button type="button" onClick={handleCopy}>
        {copied ? "Link copied" : "Copy Link"}
      </button>
      <a href="mailto:?subject=The Law and the Testimony">Email</a>
    </div>
  );
}
