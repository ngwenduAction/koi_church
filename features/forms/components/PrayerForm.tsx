"use client";

import { useState } from "react";
import { prayerForm } from "../../../content/institutional";

export function PrayerForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    requestBody: "",
    confidentiality: true,
  });
  const [errors, setErrors] = useState<{ email?: string; requestBody?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name as keyof typeof current];
      return next;
    });
    setSubmitError(null);
  }

  function validateEmail(value: string) {
    return /.+@.+\..+/.test(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { email?: string; requestBody?: string } = {};

    if (!values.requestBody.trim()) {
      nextErrors.requestBody = "This field is required.";
    }

    if (values.email.trim() && !validateEmail(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/prayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          request: values.requestBody,
          isConfidential: values.confidentiality,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitError(payload.error ?? "Unable to submit prayer request.");
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Unable to submit prayer request.");
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="intake-success" aria-live="polite">
        <p className="section-kicker">Received</p>
        <h2>{prayerForm.successTitle}</h2>
        <p>{prayerForm.successBody}</p>
      </section>
    );
  }

  return (
    <section className="intake-shell intake-shell--study prayer-form-shell">
      <div className="intake-shell__intro">
        <p className="section-kicker">Request</p>
        <h2>{prayerForm.title}</h2>
        <p>{prayerForm.description}</p>
      </div>

      <form className="intake-form prayer-form" noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="prayer-name">Name</label>
          <input
            id="prayer-name"
            name="name"
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Optional"
            type="text"
            value={values.name}
          />
        </div>

        <div className="form-field">
          <label htmlFor="prayer-email">Email</label>
          <input
            aria-invalid={errors.email ? "true" : "false"}
            id="prayer-email"
            name="email"
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="If you wish for a response"
            type="email"
            value={values.email}
          />
          {errors.email ? <p className="form-field__error">{errors.email}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="prayer-request">Prayer Request</label>
          <textarea
            aria-invalid={errors.requestBody ? "true" : "false"}
            id="prayer-request"
            name="requestBody"
            onChange={(event) => handleChange("requestBody", event.target.value)}
            placeholder="Write your request with care and clarity."
            rows={8}
            value={values.requestBody}
          />
          {errors.requestBody ? <p className="form-field__error">{errors.requestBody}</p> : null}
        </div>

        <div className="form-field form-field--checkbox">
          <label htmlFor="prayer-confidentiality">
            <input
              checked={values.confidentiality}
              id="prayer-confidentiality"
              name="confidentiality"
              onChange={(event) => handleChange("confidentiality", event.target.checked)}
              type="checkbox"
            />
            <span>Keep this request confidential (Elder only)</span>
          </label>
        </div>

        {submitError ? <p className="form-status-error">{submitError}</p> : null}

        <div className="intake-form__footer">
          <button className="intake-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
          <p className="intake-form__note">
            This request will be stored for KOI&apos;s intercession workflow and reviewed with care.
          </p>
        </div>
      </form>
    </section>
  );
}
