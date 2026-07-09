"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { submitBooking, type FormState } from "@/app/actions";
import { Button, Field, Input, Label, Select, Textarea } from "./ui";
import { site } from "@/lib/site";

const SERVICES = [
  "Recurring home cleaning",
  "One-time clean",
  "Deep clean",
  "Move-in / move-out",
  "Commercial — office, clinic, retail",
  "Post-construction",
  "Cleaning products & restocking",
];

const PROPERTY = ["House", "Apartment or condo", "Office", "Clinic", "Retail or salon", "New construction"];

const ADDONS = [
  "Inside the oven",
  "Inside the fridge",
  "Interior windows",
  "Laundry, wash and fold",
  "Garage sweep-out",
  "Cabinet interiors",
];

const initial: FormState = { ok: false, message: "" };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gold" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Request this booking"}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[13px] text-red-600">{msg}</p>;
}

export function BookingForm() {
  const [state, action] = useActionState(submitBooking, initial);

  if (state.ok && state.reference) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-tide/20 bg-foam p-8 sm:p-12"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-marigold">
          <Check className="h-6 w-6 text-ink" />
        </div>
        <h2 className="text-3xl font-semibold">Request received.</h2>
        <p className="mt-4 max-w-[46ch] text-slate">{state.message}</p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
          Reference {state.reference}
        </p>
        <p className="mt-8 text-slate">
          In a hurry?{" "}
          <a href={site.phoneHref} className="font-medium text-tide underline underline-offset-4">
            {site.phone}
          </a>
        </p>
      </motion.div>
    );
  }

  const e = state.errors ?? {};

  return (
    <form action={action} className="space-y-12">
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-6 flex items-center gap-3 text-tide">
          <span className="h-px w-8 bg-marigold" /> 1 — The space
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <Label htmlFor="service">Service</Label>
            <Select id="service" name="service" defaultValue={SERVICES[0]}>
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <Err msg={e.service} />
          </Field>

          <Field>
            <Label htmlFor="property">Property type</Label>
            <Select id="property" name="property" defaultValue={PROPERTY[0]}>
              {PROPERTY.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select id="bedrooms" name="bedrooms" defaultValue="3">
              {["Studio", "1", "2", "3", "4", "5+", "N/A"].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select id="bathrooms" name="bathrooms" defaultValue="2">
              {["1", "1.5", "2", "2.5", "3", "4+"].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="sqft">Square footage</Label>
            <Input id="sqft" name="sqft" inputMode="numeric" placeholder="Approximate is fine" />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-6 flex items-center gap-3 text-tide">
          <span className="h-px w-8 bg-marigold" /> 2 — Add-ons
        </legend>
        <p className="mb-5 -mt-2 text-[15px] text-slate">
          Cheaper added to a booked visit than called out on their own. Skip anything you do not need.
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {ADDONS.map((a) => (
            <label
              key={a}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink/10 px-4 py-3.5 text-[15px] transition-colors has-checked:border-tide has-checked:bg-tide/[.04]"
            >
              <input
                type="checkbox"
                name="addons"
                value={a}
                className="h-4 w-4 shrink-0 accent-[#0E5C55]"
              />
              {a}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-6 flex items-center gap-3 text-tide">
          <span className="h-px w-8 bg-marigold" /> 3 — When
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <Label htmlFor="date">Preferred date</Label>
            <Input id="date" name="date" type="date" invalid={!!e.date} />
            <Err msg={e.date} />
          </Field>
          <Field>
            <Label htmlFor="time">Preferred window</Label>
            <Select id="time" name="time" defaultValue="Morning (8:00 – 12:00)">
              {["Morning (8:00 – 12:00)", "Afternoon (12:00 – 17:00)", "Evening (after 17:00)", "No preference"].map(
                (t) => (
                  <option key={t}>{t}</option>
                ),
              )}
            </Select>
          </Field>
        </div>
        <p className="font-mono text-[11.5px] text-slate">
          This is a request, not a locked slot. We confirm the window by phone within one business day.
        </p>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-6 flex items-center gap-3 text-tide">
          <span className="h-px w-8 bg-marigold" /> 4 — You
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoComplete="name" invalid={!!e.name} />
            <Err msg={e.name} />
          </Field>
          <Field>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" invalid={!!e.phone} />
            <Err msg={e.phone} />
          </Field>
          <Field className="sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" invalid={!!e.email} />
            <Err msg={e.email} />
          </Field>
          <Field className="sm:col-span-2">
            <Label htmlFor="notes">Anything we should know</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Pets, parking, stairs, the one room that actually bothers you…"
            />
          </Field>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-5 border-t border-ink/10 pt-8">
        <Submit />
        {!state.ok && state.message && <p className="text-[14px] text-red-600">{state.message}</p>}
      </div>
    </form>
  );
}
