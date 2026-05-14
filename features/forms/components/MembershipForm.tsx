"use client";

import { useState } from "react";
import { membershipForm } from "../../../content/institutional";

export function MembershipForm() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    foundationAcknowledgment: false,
  });
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    city?: string;
    foundationAcknowledgment?: string;
  }>({});
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

    const nextErrors: typeof errors = {};

    if (!values.fullName.trim()) nextErrors.fullName = "This field is required.";
    if (!values.email.trim()) nextErrors.email = "This field is required.";
    if (!values.phone.trim()) nextErrors.phone = "This field is required.";
    if (!values.city.trim()) nextErrors.city = "This field is required.";
    if (!values.foundationAcknowledgment) {
      nextErrors.foundationAcknowledgment = "This acknowledgement is required.";
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
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          location: values.city,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitError(payload.error ?? "Unable to submit membership request.");
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Unable to submit membership request.");
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="intake-success" aria-live="polite">
        <p className="section-kicker">Received</p>
        <h2>{membershipForm.successTitle}</h2>
        <p>{membershipForm.successBody}</p>
      </section>
    );
  }

  return (
    <section className="intake-shell intake-shell--study">
      <div className="intake-shell__intro">
        <p className="section-kicker">Interview Request</p>
        <h2>{membershipForm.title}</h2>
        <p>{membershipForm.description}</p>
      </div>

      <form className="intake-form" noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="membership-full-name">Full Name</label>
          <input
            aria-invalid={errors.fullName ? "true" : "false"}
            id="membership-full-name"
            onChange={(event) => handleChange("fullName", event.target.value)}
            placeholder="Your full name"
            type="text"
            value={values.fullName}
          />
          {errors.fullName ? <p className="form-field__error">{errors.fullName}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="membership-email">Email Address</label>
          <input
            aria-invalid={errors.email ? "true" : "false"}
            id="membership-email"
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="name@example.com"
            type="email"
            value={values.email}
          />
          {errors.email ? <p className="form-field__error">{errors.email}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="membership-phone">Phone Number</label>
          <input
            aria-invalid={errors.phone ? "true" : "false"}
            id="membership-phone"
            onChange={(event) => handleChange("phone", event.target.value)}
            placeholder="+27 ..."
            type="tel"
            value={values.phone}
          />
          {errors.phone ? <p className="form-field__error">{errors.phone}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="membership-city">City/Location</label>
          <input
            aria-invalid={errors.city ? "true" : "false"}
            id="membership-city"
            onChange={(event) => handleChange("city", event.target.value)}
            placeholder="Johannesburg"
            type="text"
            value={values.city}
          />
          {errors.city ? <p className="form-field__error">{errors.city}</p> : null}
        </div>

        <div className="form-field form-field--checkbox">
          <label htmlFor="membership-foundation">
            <input
              checked={values.foundationAcknowledgment}
              id="membership-foundation"
              onChange={(event) => handleChange("foundationAcknowledgment", event.target.checked)}
              type="checkbox"
            />
            <span>I confirm my commitment to the doctrinal foundation of KOI.</span>
          </label>
          {errors.foundationAcknowledgment ? (
            <p className="form-field__error">{errors.foundationAcknowledgment}</p>
          ) : null}
        </div>

        {submitError ? <p className="form-status-error">{submitError}</p> : null}

        <div className="intake-form__footer">
          <button className="intake-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Request Membership Interview"}
          </button>
          <p className="intake-form__note">
            This request will be stored for KOI&apos;s institutional review workflow.
          </p>
        </div>
      </form>
    </section>
  );
}
