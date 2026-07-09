import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial cleaning in Moncton",
  description:
    "Office, clinic, salon and retail cleaning across Greater Moncton. Evenings, weekends and overnight. Insured, WorkSafeNB covered, fixed scope, invoice matches the quote.",
  alternates: { canonical: "/commercial-cleaning" },
};

const sectors = [
  { name: "Offices", note: "Desks, kitchens, washrooms, boardrooms, glass. Nightly, three times weekly, or weekly." },
  { name: "Clinics & dental", note: "Disinfection to DIN-registered product standards. Contact times observed and logged." },
  { name: "Salons & spas", note: "Hair, colour and product residue. Stations, basins, floors, mirrors, laundry." },
  { name: "Retail", note: "Before open or after close. Entrances, fitting rooms, glass, back-of-house." },
  { name: "Restaurants", note: "Front-of-house and washrooms. We work around your kitchen crew, not through them." },
  { name: "Post-construction", note: "Drywall dust, adhesive film, sticker and paint removal. After the last trade." },
];

export default function CommercialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commercial"
        title="Cleaned before anyone arrives."
        lede="Evenings, weekends, overnight. A fixed scope agreed up front, keyed or fob access, and an invoice that matches the quote you signed."
      />

      <Section tone="light" className="!pt-4">
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <RevealItem key={s.name} className="bg-paper p-9">
              <span className="font-mono text-[11px] text-marigold">{String(i + 1).padStart(2, "0")}</span>
              <h2 id={s.name === "Post-construction" ? "construction" : undefined} className="mt-3 text-[21px] font-medium tracking-[-0.02em]">
                {s.name}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow tone="dark">How commercial pricing works</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Square footage, then a site visit.
            </h2>
            <p className="mt-7 text-[17px] leading-relaxed text-foam/70">
              We walk the space, count the washrooms, look at the floor types and the traffic, and
              come back with a monthly number. It does not move unless your scope does. There is no
              minimum contract term, because a contract is not what keeps a client.
            </p>
            <ButtonLink href="/book" variant="gold" size="lg" className="mt-9">
              Request a site visit
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-white/12 border-y border-white/12">
              {[
                ["Insurance", "Commercial general liability, certificate on request"],
                ["WorkSafeNB", "Clearance letter provided with every quote"],
                ["Access", "Key, fob or code. Logged, and returned when service ends"],
                ["Supplies", "Included, or we restock yours on a standing order"],
                ["Reporting", "A signed sheet each visit, if you want one"],
                ["Response", "Site visits booked within two business days"],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 text-foam/45">{k}</dt>
                  <dd className="text-[16px] text-foam/85">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 font-mono text-[12px] text-foam/45">
              Faster by phone — {site.phone}
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
