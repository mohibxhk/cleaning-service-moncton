import type { Metadata } from "next";
import QuoteModal from "@/components/quote-modal";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section, ButtonLink, Eyebrow } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat-rate cleaning prices for Moncton homes and businesses. One-time from $189, biweekly from $149, deep clean from $329. Confirmed after a short walkthrough.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    tag: "Occasional",
    name: "One-time clean",
    price: "$189",
    unit: "/ visit",
    from: "Starting at",
    lines: [
      "Kitchen, bathrooms, floors, dusting",
      "Two cleaners, roughly three hours",
      "Supplies and equipment included",
      "Add-ons priced per item",
    ],
    cta: "Get my price",
    lead: false,
  },
  {
    tag: "Most homes choose this",
    name: "Biweekly",
    price: "$149",
    unit: "/ visit",
    from: "Starting at",
    lines: [
      "Everything in a one-time clean",
      "Same crew, same day of the week",
      "Entryway and salt lines every visit",
      "Free re-clean within 48 hours",
      "Pause any time, no fee",
    ],
    cta: "Get my price",
    lead: true,
  },
  {
    tag: "Business",
    name: "Commercial",
    price: "Sq. ft.",
    unit: "",
    from: "Quoted by",
    lines: [
      "Offices, clinics, salons, retail",
      "Evenings, weekends or overnight",
      "Optional product and paper restocking",
      "Insurance and WorkSafeNB on file",
    ],
    cta: "Request a site visit",
    lead: false,
  },
];

const addons = [
  ["Inside the oven", "$35"],
  ["Inside the fridge", "$30"],
  ["Interior windows", "$4 / pane"],
  ["Laundry, wash and fold", "$25 / load"],
  ["Cabinet interiors", "$45"],
  ["Garage sweep-out", "$40"],
];

export default function PricingPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Flat rates, quoted before we start."
        lede="Prices below are starting points for a standard three-bedroom home. Your number is confirmed after a short walkthrough — in person or over video — and it does not move unless the scope does."
      />

      <Section tone="light" className="!pt-4">
        <RevealGroup className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <RevealItem key={p.name}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-9",
                  p.lead ? "border-tide shadow-deep" : "border-ink/10",
                )}
              >
                <span className={cn("eyebrow", p.lead ? "text-tide" : "text-slate")}>{p.tag}</span>
                <h2 className="mt-4 text-[26px] font-semibold tracking-[-0.03em]">{p.name}</h2>
                <p className="eyebrow mt-6 text-slate">{p.from}</p>
                <p className="mt-1 text-[44px] font-semibold leading-none tracking-[-0.04em]">
                  {p.price}
                  {p.unit && <span className="ml-1 text-[14px] font-normal text-slate">{p.unit}</span>}
                </p>
                <ul className="mt-8 flex-1 space-y-3.5 border-t border-ink/10 pt-7">
                  {p.lines.map((l) => (
                    <li key={l} className="flex gap-3 text-[15px] leading-relaxed text-slate">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-marigold" aria-hidden />
                      {l}
                    </li>
                  ))}
                </ul>
               <button
  onClick={() => setOpen(true)}
  className={cn(
    "mt-9 inline-flex h-14 items-center justify-center rounded-full px-8 text-[15px] font-medium transition",
    p.lead
      ? "bg-marigold text-ink hover:bg-marigold-lift"
      : "border border-ink/15 hover:bg-ink/[.03]"
  )}
>
  Get Free Quote
</button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="foam">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Add-ons</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Cheaper attached to a visit.
            </h2>
            <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
              Added to a booked clean, these are the prices. Called out on their own, there is a
              two-hour minimum.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="border-t border-ink/10">
              {addons.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5">
                  <dt className="text-[18px] font-medium tracking-[-0.02em]">{k}</dt>
                  <dd className="font-mono text-[14px] text-slate">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-[11.5px] text-slate">
              HST not included. Prices held for 90 days from quote.
            </p>
          </Reveal>
        </div>
      </Section>

      <QuoteModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
