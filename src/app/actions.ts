"use server";

import { site } from "@/lib/site";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  reference?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function reference() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `CSM-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

async function deliver(subject: string, lines: string[]) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL ?? site.email;

  // No provider configured: keep the request rather than lose it.
  if (!key) {
    console.info(`[${subject}] (email not configured)\n${lines.join("\n")}`);
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: `${site.name} <bookings@${new URL(site.url).hostname}>`,
      to: [to],
      subject,
      text: lines.join("\n"),
    }),
  });
}

/* ── Booking ─────────────────────────────────────────────── */

export async function submitBooking(_prev: FormState, form: FormData): Promise<FormState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();

  const data = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    date: get("date"),
    time: get("time"),
    service: get("service"),
    property: get("property"),
    bedrooms: get("bedrooms"),
    bathrooms: get("bathrooms"),
    sqft: get("sqft"),
    addons: form.getAll("addons").map(String),
    notes: get("notes"),
    website: get("website"), // honeypot
  };

  if (data.website) return { ok: true, message: "Thanks — we will be in touch." };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Enter the name we should ask for.";
  if (!EMAIL.test(data.email)) errors.email = "Check the email address.";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number.";
  if (!data.date) errors.date = "Pick a preferred date.";
  if (new Date(data.date) < new Date(new Date().toDateString()))
    errors.date = "Pick a date that has not passed.";
  if (!data.service) errors.service = "Choose a service.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "A few fields need attention.", errors };
  }

  const ref = reference();

  await deliver(`New booking — ${data.service} — ${data.name}`, [
    `Reference: ${ref}`,
    ``,
    `Name:      ${data.name}`,
    `Phone:     ${data.phone}`,
    `Email:     ${data.email}`,
    ``,
    `Service:   ${data.service}`,
    `Property:  ${data.property}`,
    `Beds/bath: ${data.bedrooms} / ${data.bathrooms}`,
    `Sq ft:     ${data.sqft || "not given"}`,
    `Add-ons:   ${data.addons.length ? data.addons.join(", ") : "none"}`,
    ``,
    `Requested: ${data.date} at ${data.time || "no preference"}`,
    ``,
    `Notes:`,
    data.notes || "—",
  ]);

  return {
    ok: true,
    reference: ref,
    message:
      "Booked in as a request. We confirm the window by phone within one business day, and the flat price after a short walkthrough.",
  };
}

/* ── Contact ─────────────────────────────────────────────── */

export async function submitContact(_prev: FormState, form: FormData): Promise<FormState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const data = { name: get("name"), email: get("email"), phone: get("phone"), message: get("message"), website: get("website") };

  if (data.website) return { ok: true, message: "Thanks — we will be in touch." };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Check the email address.";
  if (data.message.length < 10) errors.message = "Tell us a little more.";

  if (Object.keys(errors).length) return { ok: false, message: "A few fields need attention.", errors };

  await deliver(`Website enquiry — ${data.name}`, [
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "not given"}`,
    ``,
    data.message,
  ]);

  return { ok: true, message: "Sent. We reply the same business day, usually faster." };
}
