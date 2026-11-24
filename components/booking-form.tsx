"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { bookingDepartments, findDepartment, specialists } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

const TIMES = ["Any time", "3:00 – 5:00 PM", "5:00 – 7:00 PM", "7:00 – 9:00 PM"];
const VISIT_TYPES = ["New consultation", "Follow-up"];

/** Pakistani mobile or landline: 10–13 digits after removing spaces, dashes and a leading +. */
function validPhone(v: string): boolean {
  const digits = v.replace(/[\s\-()]/g, "").replace(/^\+/, "");
  return /^\d{10,13}$/.test(digits);
}

/**
 * The one shared Appointment Request form (Roadmap §5). No backend: it validates
 * the fields, then prepares a WhatsApp message to the verified GPMC number.
 * A request is never shown as a confirmed booking.
 */
export function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIMES[0]);
  const [visit, setVisit] = useState("");
  const [reason, setReason] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentLink, setSentLink] = useState<string | null>(null);
  const [today, setToday] = useState<string>();

  // Preselect the department / specialist the visitor came from (?department=…&specialist=…).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const dep = q.get("department");
    const doc = q.get("specialist");
    if (dep && bookingDepartments.some((d) => d.value === dep)) setDepartment(dep);
    const match = specialists.find((s) => s.slug === doc);
    if (match) {
      setSpecialist(match.slug);
      if (!dep) setDepartment(match.department);
    }
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  // Specialists filtered by the chosen department; OPD, or a unit with no listed clinicians, shows everyone.
  const listed = findDepartment(department)?.specialists;
  const doctorOptions = listed?.length
    ? specialists.filter((s) => listed.includes(s.slug))
    : specialists;
  useEffect(() => {
    if (specialist && !doctorOptions.some((s) => s.slug === specialist)) setSpecialist("");
  }, [department]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter the patient's name.";
    if (!validPhone(phone)) next.phone = "Please enter a valid mobile number, e.g. 0300 1234567.";
    if (!department) next.department = "Please choose a department.";
    if (!visit) next.visit = "Please choose the visit type.";
    if (!agreed) next.agreed = "Please confirm you have read the privacy notice.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`b-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    const dept = bookingDepartments.find((d) => d.value === department)?.label ?? department;
    const doc = specialists.find((s) => s.slug === specialist)?.name;
    const message = [
      "Assalam o Alaikum, I would like to request an appointment at Gastro Plus Medical Complex Multan.",
      `Patient name: ${name.trim()}`,
      `Mobile: ${phone.trim()}`,
      `Department: ${dept}`,
      doc ? `Preferred specialist: ${doc}` : null,
      date ? `Preferred date: ${date}` : null,
      time !== TIMES[0] ? `Preferred time: ${time}` : null,
      `Visit type: ${visit}`,
      reason.trim() ? `Reason for visit: ${reason.trim()}` : null,
      "Please contact me to confirm.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = whatsappLink(message);
    setSentLink(url);
    window.open(url, "_blank", "noopener");
  }

  const err = (k: string) =>
    errors[k] ? (
      <span id={`e-${k}`} className="field-error">
        {errors[k]}
      </span>
    ) : null;

  return (
    <form className="glass glass-pad stack" onSubmit={onSubmit} noValidate aria-describedby="booking-note">
      <p className="notice notice--strong" id="booking-note" style={{ margin: 0 }}>
        Your request is not confirmed until our team contacts you.
      </p>
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="b-name">Patient name *</label>
          <input id="b-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="b-phone">Mobile number *</label>
          <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
          {err("phone")}
        </div>
      </div>
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="b-department">Department *</label>
          <select id="b-department" value={department} onChange={(e) => setDepartment(e.target.value)} aria-invalid={!!errors.department} aria-describedby={errors.department ? "e-department" : undefined}>
            <option value="">Choose a department</option>
            {bookingDepartments.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          {err("department")}
        </div>
        <div className="field">
          <label htmlFor="b-specialist">Preferred specialist (optional)</label>
          <select id="b-specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)}>
            <option value="">No preference</option>
            {doctorOptions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} – {s.roles[0]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="b-date">Preferred date (optional)</label>
          <input id="b-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="b-time">Preferred time (optional)</label>
          <select id="b-time" value={time} onChange={(e) => setTime(e.target.value)}>
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="field-hint">Date and time are preferences; the actual slot is confirmed by our team.</p>
      <fieldset className="field" aria-describedby={errors.visit ? "e-visit" : undefined}>
        <legend>Visit type *</legend>
        <div className="radio-row">
          {VISIT_TYPES.map((v, i) => (
            <label key={v} className="check">
              <input type="radio" name="visit" id={i === 0 ? "b-visit" : undefined} value={v} checked={visit === v} onChange={() => setVisit(v)} />
              <span>{v}</span>
            </label>
          ))}
        </div>
        {err("visit")}
      </fieldset>
      <div className="field">
        <label htmlFor="b-reason">Reason for visit (optional)</label>
        <input id="b-reason" maxLength={120} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. stomach pain, endoscopy advised" />
        <span className="field-hint">Keep it short. Please do not include your full medical history.</span>
      </div>
      <label className="check">
        <input id="b-agreed" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} aria-invalid={!!errors.agreed} />
        <span>
          I have read the <Link href="/privacy-policy/">privacy notice</Link>. *
        </span>
      </label>
      {err("agreed")}
      <button type="submit" className="btn btn--primary btn--block">
        Send Appointment Request on WhatsApp
      </button>
      {sentLink ? (
        <p role="status" className="form-status">
          <strong>WhatsApp message prepared.</strong> Press send in WhatsApp to submit your request. Our team will
          contact you to confirm the date and time.{" "}
          <a href={sentLink} target="_blank" rel="noopener noreferrer">
            Open WhatsApp again
          </a>
        </p>
      ) : (
        <p className="field-hint" style={{ margin: 0 }}>
          This form opens WhatsApp with your details filled in. Nothing is stored on this website.
        </p>
      )}
    </form>
  );
}
