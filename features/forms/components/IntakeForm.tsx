"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { IntakeConfig, IntakeField } from "../../../content/institutional";

type IntakeValue = string | boolean;

type IntakeFormProps = {
  config: IntakeConfig;
  tone?: "default" | "study";
  translationNamespace?: "visit" | "contact";
};

function buildInitialValues(fields: IntakeField[]) {
  return fields.reduce<Record<string, IntakeValue>>((accumulator, field) => {
    accumulator[field.name] = field.type === "checkbox" ? false : "";
    return accumulator;
  }, {});
}

function validateEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export function IntakeForm({ config, tone = "default", translationNamespace }: IntakeFormProps) {
  const t = useTranslations("forms");
  const initialValues = useMemo(() => buildInitialValues(config.fields), [config.fields]);
  const [values, setValues] = useState<Record<string, IntakeValue>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const shellClassName = tone === "study" ? "intake-shell intake-shell--study" : "intake-shell";

  function translate(key: string, fallback: string) {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  }

  function scoped(key: string, fallback: string) {
    return translationNamespace ? translate(`${translationNamespace}.${key}`, fallback) : fallback;
  }

  function fieldCopy(field: IntakeField, key: "label" | "placeholder" | "helpText", fallback = "") {
    if (!translationNamespace) return fallback;
    return translate(`${translationNamespace}.fields.${field.name}.${key}`, fallback);
  }

  function setFieldValue(name: string, value: IntakeValue) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = config.fields.reduce<Record<string, string>>((accumulator, field) => {
      const value = values[field.name];

      if (field.required) {
        if (field.type === "checkbox" && value !== true) {
          accumulator[field.name] = t("common.ackRequired");
        }

        if (field.type !== "checkbox" && String(value).trim() === "") {
          accumulator[field.name] = t("common.required");
        }
      }

      if (field.type === "email" && String(value).trim() !== "" && !validateEmail(String(value))) {
        accumulator[field.name] = t("common.emailInvalid");
      }

      return accumulator;
    }, {});

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="intake-success" aria-live="polite">
        <p className="section-kicker">{t("common.prepared")}</p>
        <h2>{scoped("successTitle", config.successTitle)}</h2>
        <p>{scoped("successBody", config.successBody)}</p>
      </section>
    );
  }

  return (
    <section className={shellClassName}>
      <div className="intake-shell__intro">
        <p className="section-kicker">{t("common.form")}</p>
        <h2>{scoped("title", config.title)}</h2>
        <p>{scoped("description", config.description)}</p>
      </div>

      <form className="intake-form" noValidate onSubmit={handleSubmit}>
        {config.fields.map((field) => {
          const error = errors[field.name];
          const fieldId = `field-${field.name}`;
          const label = fieldCopy(field, "label", field.label);
          const placeholder = field.placeholder ? fieldCopy(field, "placeholder", field.placeholder) : undefined;
          const helpText = field.helpText ? fieldCopy(field, "helpText", field.helpText) : undefined;

          if (field.type === "checkbox") {
            return (
              <div className="form-field form-field--checkbox" key={field.name}>
                <label htmlFor={fieldId}>
                  <input
                    checked={values[field.name] === true}
                    id={fieldId}
                    name={field.name}
                    onChange={(event) => setFieldValue(field.name, event.target.checked)}
                    type="checkbox"
                  />
                  <span>{label}</span>
                </label>
                {error ? <p className="form-field__error">{error}</p> : null}
              </div>
            );
          }

          return (
            <div className="form-field" key={field.name}>
              <label htmlFor={fieldId}>{label}</label>
              {field.type === "textarea" ? (
                <textarea
                  aria-invalid={error ? "true" : "false"}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={placeholder}
                  rows={6}
                  value={String(values[field.name])}
                />
              ) : field.type === "select" ? (
                <select
                  aria-invalid={error ? "true" : "false"}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  value={String(values[field.name])}
                >
                  {field.options?.map((option) => (
                    <option key={`${field.name}-${option.value}`} value={option.value}>
                      {translationNamespace
                        ? translate(`${translationNamespace}.fields.${field.name}.options.${option.value || "empty"}`, option.label)
                        : option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  aria-invalid={error ? "true" : "false"}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={placeholder}
                  type={field.type}
                  value={String(values[field.name])}
                />
              )}
              {helpText ? <p className="form-field__help">{helpText}</p> : null}
              {error ? <p className="form-field__error">{error}</p> : null}
            </div>
          );
        })}

        <div className="intake-form__footer">
          <button className="intake-submit" type="submit">
            {scoped("submitLabel", config.submitLabel)}
          </button>
          <p className="intake-form__note">{t("common.localNote")}</p>
        </div>
      </form>
    </section>
  );
}
