import type { Metadata } from "next";
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
    tag: "Residential",
    name: "Standard Home Cleaning",
    price: "Custom Quote",
    unit: "",
    from: "Tailored for your home",
    lines: [
      "Kitchen, bathrooms, floors & dusting",
      "Fully customized to your home's needs",
      "Professional equipment included",
      "Flexible scheduling available",
    ],
    cta: "Get Free Quote",
    lead: false,
  },
  {
    tag: "Most Popular",
    name: "Recurring Cleaning",
    price: "Custom Quote",
    unit: "",
    from: "Weekly • Biweekly • Monthly",
    lines: [
      "Same trusted cleaning team",
      "Personalized cleaning schedule",
      "Priority customer support",
      "Free re-clean guarantee",
      "Pause or reschedule anytime",
    ],
    cta: "Get Free Quote",
    lead: true,
  },
  {
    tag: "Commercial",
    name: "Business Cleaning",
    price: "Custom Quote",
    unit: "",
    from: "Based on your requirements",
    lines: [
      "Offices, clinics, salons & retail",
      "Daytime or after-hours cleaning",
      "Custom cleaning plans",
      "Fully insured & reliable staff",
    ],
    cta: "Get Free Quote",
    lead: false,
  },
];
const addons = [
  ["Kitchen Appliances", "Included in Quote"],
  ["Interior Windows", "Based on Property Size"],
  ["Laundry Service", "Available on Request"],
  ["Cabinet Cleaning", "Customized"],
  ["Garage Cleaning", "Available"],
  ["Special Requests", "Tailored to Your Needs"],
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="We love to clean your space."
        title="Flat rates, quoted before we start."
        lede="Every home and business is different. Tell us about your space, and we'll prepare a personalized, no-obligation quote tailored to your cleaning needs."
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
                <ButtonLink
  href="/book"
  variant={p.lead ? "gold" : "outline"}
  size="lg"
  className="mt-9"
>
  {p.cta}
</ButtonLink>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="foam">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <Eyebrow>What's Included</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Every quote is tailored to your property.
            </h2>
            <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
              Every home and business is different. We provide a personalized quote based on the size of your property, the type of cleaning required, and any additional services you request. No hidden fees—just transparent, customized pricing.
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
              Every quote is free, personalized, and comes with no obligation.
            </p>
          </Reveal>
        </div>
      </Section>

     
    </>
  );
}
