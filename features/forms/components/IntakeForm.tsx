"use client";

import { useMemo, useState } from "react";
import type { IntakeConfig, IntakeField } from "../../../content/institutional";

type IntakeValue = string | boolean;

type IntakeFormProps = {
  config: IntakeConfig;
  tone?: "default" | "study";
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

export function IntakeForm({ config, tone = "default" }: IntakeFormProps) {
  const initialValues = useMemo(() => buildInitialValues(config.fields), [config.fields]);
  const [values, setValues] = useState<Record<string, IntakeValue>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const shellClassName = tone === "study" ? "intake-shell intake-shell--study" : "intake-shell";

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
          accumulator[field.name] = "This acknowledgement is required.";
        }

        if (field.type !== "checkbox" && String(value).trim() === "") {
          accumulator[field.name] = "This field is required.";
        }
      }

      if (field.type === "email" && String(value).trim() !== "" && !validateEmail(String(value))) {
        accumulator[field.name] = "Enter a valid email address.";
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
        <p className="section-kicker">Prepared</p>
        <h2>{config.successTitle}</h2>
        <p>{config.successBody}</p>
      </section>
    );
  }

  return (
    <section className={shellClassName}>
      <div className="intake-shell__intro">
        <p className="section-kicker">Form</p>
        <h2>{config.title}</h2>
        <p>{config.description}</p>
      </div>

      <form className="intake-form" noValidate onSubmit={handleSubmit}>
        {config.fields.map((field) => {
          const error = errors[field.name];
          const fieldId = `field-${field.name}`;

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
                  <span>{field.label}</span>
                </label>
                {error ? <p className="form-field__error">{error}</p> : null}
              </div>
            );
          }

          return (
            <div className="form-field" key={field.name}>
              <label htmlFor={fieldId}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  aria-invalid={error ? "true" : "false"}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
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
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  aria-invalid={error ? "true" : "false"}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => setFieldValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={String(values[field.name])}
                />
              )}
              {field.helpText ? <p className="form-field__help">{field.helpText}</p> : null}
              {error ? <p className="form-field__error">{error}</p> : null}
            </div>
          );
        })}

        <div className="intake-form__footer">
          <button className="intake-submit" type="submit">
            {config.submitLabel}
          </button>
          <p className="intake-form__note">
            This phase validates and resolves locally while KOI's delivery workflow is prepared for the next batch.
          </p>
        </div>
      </form>
    </section>
  );
}
