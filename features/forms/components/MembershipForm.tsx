"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function MembershipForm() {
  const t = useTranslations("forms");
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

    if (!values.fullName.trim()) nextErrors.fullName = t("common.required");
    if (!values.email.trim()) nextErrors.email = t("common.required");
    if (!values.phone.trim()) nextErrors.phone = t("common.required");
    if (!values.city.trim()) nextErrors.city = t("common.required");
    if (!values.foundationAcknowledgment) {
      nextErrors.foundationAcknowledgment = t("common.ackRequired");
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
        setSubmitError(payload.error ?? t("membership.submitError"));
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t("membership.submitError"));
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="intake-success" aria-live="polite">
        <p className="section-kicker">{t("common.received")}</p>
        <h2>{t("membership.successTitle")}</h2>
        <p>{t("membership.successBody")}</p>
      </section>
    );
  }

  return (
    <section className="intake-shell intake-shell--study">
      <div className="intake-shell__intro">
        <p className="section-kicker">{t("membership.kicker")}</p>
        <h2>{t("membership.title")}</h2>
        <p>{t("membership.description")}</p>
      </div>

      <form className="intake-form" noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="membership-full-name">{t("membership.fields.fullName.label")}</label>
          <input
            aria-invalid={errors.fullName ? "true" : "false"}
            id="membership-full-name"
            onChange={(event) => handleChange("fullName", event.target.value)}
            placeholder={t("membership.fields.fullName.placeholder")}
            type="text"
            value={values.fullName}
          />
          {errors.fullName ? <p className="form-field__error">{errors.fullName}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="membership-email">{t("membership.fields.email.label")}</label>
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
          <label htmlFor="membership-phone">{t("membership.fields.phone.label")}</label>
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
          <label htmlFor="membership-city">{t("membership.fields.city.label")}</label>
          <input
            aria-invalid={errors.city ? "true" : "false"}
            id="membership-city"
            onChange={(event) => handleChange("city", event.target.value)}
            placeholder={t("membership.fields.city.placeholder")}
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
            <span>{t("membership.fields.foundationAcknowledgment.label")}</span>
          </label>
          {errors.foundationAcknowledgment ? (
            <p className="form-field__error">{errors.foundationAcknowledgment}</p>
          ) : null}
        </div>

        {submitError ? <p className="form-status-error">{submitError}</p> : null}

        <div className="intake-form__footer">
          <button className="intake-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? t("common.submitting") : t("membership.submitLabel")}
          </button>
          <p className="intake-form__note">{t("membership.note")}</p>
        </div>
      </form>
    </section>
  );
}


