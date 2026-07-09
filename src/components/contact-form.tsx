"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { submitContact, type FormState } from "@/app/actions";
import { Button, Field, Input, Label, Textarea } from "./ui";

const initial: FormState = { ok: false, message: "" };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gold" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-white/15 p-8">
        <Check className="mt-1 h-5 w-5 shrink-0 text-marigold" />
        <p className="text-foam/85">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field>
          <Label htmlFor="c-name" className="text-foam/55">Name</Label>
          <Input id="c-name" name="name" autoComplete="name"
            className="border-white/20 text-foam focus:border-marigold placeholder:text-foam/30" />
          {e.name && <p className="mt-1.5 text-[13px] text-marigold">{e.name}</p>}
        </Field>
        <Field>
          <Label htmlFor="c-phone" className="text-foam/55">Phone</Label>
          <Input id="c-phone" name="phone" type="tel" autoComplete="tel"
            className="border-white/20 text-foam focus:border-marigold placeholder:text-foam/30" />
        </Field>
        <Field className="sm:col-span-2">
          <Label htmlFor="c-email" className="text-foam/55">Email</Label>
          <Input id="c-email" name="email" type="email" autoComplete="email"
            className="border-white/20 text-foam focus:border-marigold placeholder:text-foam/30" />
          {e.email && <p className="mt-1.5 text-[13px] text-marigold">{e.email}</p>}
        </Field>
        <Field className="sm:col-span-2">
          <Label htmlFor="c-message" className="text-foam/55">How can we help</Label>
          <Textarea id="c-message" name="message"
            placeholder="Size of the space, how often, what is bothering you most…"
            className="border-white/20 text-foam focus:border-marigold placeholder:text-foam/30" />
          {e.message && <p className="mt-1.5 text-[13px] text-marigold">{e.message}</p>}
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Submit />
        {!state.ok && state.message && <p className="text-[14px] text-marigold">{state.message}</p>}
      </div>
    </form>
  );
}
