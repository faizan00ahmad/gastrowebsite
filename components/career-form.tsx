"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/whatsapp";

const GENERAL = "General application";

/** Careers application: no server, so it prepares a WhatsApp message and the applicant attaches their CV there. */
export function CareerForm({ hasVacancies, positions }: { hasVacancies: boolean; positions: string[] }) {
  const options = hasVacancies ? [...positions, GENERAL] : [GENERAL];
  const [form, setForm] = useState({ name: "", phone: "", email: "", position: options[0], qualifications: "", experience: "" });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.qualifications.trim() || !form.experience.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!agreed) {
      setError("Please confirm you have read the CV privacy notice.");
      return;
    }
    setError(null);
    const message = [
      "Assalam o Alaikum, I would like to apply for work at Gastro Plus Medical Complex Multan.",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      `Position: ${form.position}`,
      `Qualifications: ${form.qualifications.trim()}`,
      `Experience: ${form.experience.trim()}`,
      "My CV is attached.",
    ]
      .filter(Boolean)
      .join("\n");
    const url = whatsappLink(message);
    setLink(url);
    window.open(url, "_blank", "noopener");
  }

  return (
    <form className="glass glass-pad stack" onSubmit={onSubmit} noValidate>
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="c-name">Full name *</label>
          <input id="c-name" autoComplete="name" value={form.name} onChange={set("name")} required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Mobile number *</label>
          <input id="c-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} required />
        </div>
      </div>
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="c-email">Email (optional)</label>
          <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} />
        </div>
        <div className="field">
          <label htmlFor="c-position">Position *</label>
          <select id="c-position" value={form.position} onChange={set("position")}>
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-quals">Qualifications *</label>
        <input id="c-quals" value={form.qualifications} onChange={set("qualifications")} placeholder="e.g. BSN, Punjab Nursing Council registered" required />
      </div>
      <div className="field">
        <label htmlFor="c-exp">Experience *</label>
        <input id="c-exp" value={form.experience} onChange={set("experience")} placeholder="e.g. 3 years in an endoscopy unit" required />
      </div>
      <label className="check">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>
          I have read the <Link href="/careers/#cv-privacy">CV privacy notice</Link>. *
        </span>
      </label>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--primary btn--block">
        Prepare application on WhatsApp
      </button>
      {link && (
        <p role="status" className="form-status">
          WhatsApp message prepared. Attach your CV in the chat and press send.{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            Open WhatsApp again
          </a>
        </p>
      )}
    </form>
  );
}
