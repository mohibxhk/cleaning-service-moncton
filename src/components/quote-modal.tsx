"use client";

import { useState } from "react";
import {
  Button,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function QuoteModal({
  open,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    bedrooms: "",
    bathrooms: "",
    frequency: "",
    message: "",
  });

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      console.log(form);

      alert(
        "Thanks! Your quote request has been received."
      );

      onClose();

      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        service: "",
        bedrooms: "",
        bathrooms: "",
        frequency: "",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-5">

      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-3xl text-slate-500 hover:text-black"
        >
          ×
        </button>

        <div className="border-b border-black/10 px-8 py-7">

          <p className="eyebrow text-tide">
            FREE ESTIMATE
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            Request Your Quote
          </h2>

          <p className="mt-4 text-slate">
            Fill out this short form and we'll send you a
            personalized cleaning quote.
          </p>

        </div>

        <form
          onSubmit={submit}
          className="space-y-6 p-8"
        >

          <div className="grid gap-5 md:grid-cols-2">

            <Field>

              <Label>Full Name *</Label>

              <Input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

            </Field>

            <Field>

              <Label>Phone Number *</Label>

              <Input
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

            </Field>

            <Field>

              <Label>Email *</Label>

              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

            </Field>

            <Field>

              <Label>Property Address</Label>

              <Input
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
              />

            </Field>
                        <Field>

              <Label>Cleaning Service *</Label>

              <Select
                required
                value={form.service}
                onChange={(e) =>
                  setForm({
                    ...form,
                    service: e.target.value,
                  })
                }
              >
                <option value="">Select Service</option>
                <option>Residential Cleaning</option>
                <option>Commercial Cleaning</option>
                <option>Move In / Move Out</option>
                <option>Deep Cleaning</option>
                <option>Post Construction</option>
              </Select>

            </Field>

            <Field>

              <Label>Cleaning Frequency *</Label>

              <Select
                required
                value={form.frequency}
                onChange={(e) =>
                  setForm({
                    ...form,
                    frequency: e.target.value,
                  })
                }
              >
                <option value="">Select Frequency</option>
                <option>One Time</option>
                <option>Weekly</option>
                <option>Bi Weekly</option>
                <option>Monthly</option>
              </Select>

            </Field>

            <Field>

              <Label>Bedrooms</Label>

              <Select
                value={form.bedrooms}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bedrooms: e.target.value,
                  })
                }
              >
                <option value="">Bedrooms</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </Select>

            </Field>

            <Field>

              <Label>Bathrooms</Label>

              <Select
                value={form.bathrooms}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bathrooms: e.target.value,
                  })
                }
              >
                <option value="">Bathrooms</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </Select>

            </Field>

          </div>

          <Field>

            <Label>Additional Details</Label>

            <Textarea
              placeholder="Tell us anything important..."
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
            />

          </Field>
                    <div className="flex justify-end">

            <Button
              type="submit"
              size="lg"
              variant="gold"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Request Free Quote"}
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
}
