"use client";

import { useState, type FormEvent } from "react";
import { bookingDepartments } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Static booking form. No server: it composes a WhatsApp message with the
 * details and opens the chat, so the clinic receives the request directly.
 */
export function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState(bookingDepartments[0]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setError(null);
    const lines = [
      "Assalam o Alaikum, I would like to book an appointment at Gastro Plus Medical Complex Multan.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Department: ${department}`,
      date ? `Preferred date: ${date}` : null,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
    ].filter(Boolean);
    window.location.href = whatsappLink(lines.join("\n"));
  }

  return (
    <form className="glass glass-pad stack" onSubmit={onSubmit} noValidate aria-describedby="booking-note">
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="b-name">Full name *</label>
          <input id="b-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="b-phone">Phone number *</label>
          <input id="b-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>
      <div className="field-grid field-grid--2">
        <div className="field">
          <label htmlFor="b-dept">Department</label>
          <select id="b-dept" value={department} onChange={(e) => setDepartment(e.target.value)}>
            {bookingDepartments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="b-date">Preferred date</label>
          <input id="b-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="b-notes">Brief note (optional)</label>
        <textarea id="b-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      {error && (
        <p role="alert" style={{ color: "#b42318", margin: 0 }}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--primary btn--block">
        Send booking request on WhatsApp
      </button>
      <p id="booking-note" style={{ fontSize: "0.85rem", margin: 0 }}>
        Your request opens WhatsApp with the details filled in. Nothing is stored on this website.
      </p>
    </form>
  );
}
