"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function PrayerForm() {
  const t = useTranslations("forms");
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
      nextErrors.requestBody = t("common.required");
    }

    if (values.email.trim() && !validateEmail(values.email)) {
      nextErrors.email = t("common.emailInvalid");
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
        setSubmitError(payload.error ?? t("prayer.submitError"));
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t("prayer.submitError"));
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="intake-success" aria-live="polite">
        <p className="section-kicker">{t("common.received")}</p>
        <h2>{t("prayer.successTitle")}</h2>
        <p>{t("prayer.successBody")}</p>
      </section>
    );
  }

  return (
    <section className="intake-shell intake-shell--study prayer-form-shell">
      <div className="intake-shell__intro">
        <p className="section-kicker">{t("prayer.kicker")}</p>
        <h2>{t("prayer.title")}</h2>
        <p>{t("prayer.description")}</p>
      </div>

      <form className="intake-form prayer-form" noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="prayer-name">{t("prayer.fields.name.label")}</label>
          <input
            id="prayer-name"
            name="name"
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder={t("prayer.fields.name.placeholder")}
            type="text"
            value={values.name}
          />
        </div>

        <div className="form-field">
          <label htmlFor="prayer-email">{t("prayer.fields.email.label")}</label>
          <input
            aria-invalid={errors.email ? "true" : "false"}
            id="prayer-email"
            name="email"
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder={t("prayer.fields.email.placeholder")}
            type="email"
            value={values.email}
          />
          {errors.email ? <p className="form-field__error">{errors.email}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="prayer-request">{t("prayer.fields.requestBody.label")}</label>
          <textarea
            aria-invalid={errors.requestBody ? "true" : "false"}
            id="prayer-request"
            name="requestBody"
            onChange={(event) => handleChange("requestBody", event.target.value)}
            placeholder={t("prayer.fields.requestBody.placeholder")}
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
            <span>{t("prayer.fields.confidentiality.label")}</span>
          </label>
        </div>

        {submitError ? <p className="form-status-error">{submitError}</p> : null}

        <div className="intake-form__footer">
          <button className="intake-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? t("common.submitting") : t("prayer.submitLabel")}
          </button>
          <p className="intake-form__note">{t("prayer.note")}</p>
        </div>
      </form>
    </section>
  );
}
