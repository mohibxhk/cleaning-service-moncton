import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential cleaning in Moncton",
  description:
    "Recurring, deep, and move-out cleaning for homes across Moncton, Dieppe and Riverview. Same crew every visit, flat rates, 48-hour re-clean guarantee.",
  alternates: { canonical: "/residential-cleaning" },
};

const included = {
  "Every visit": [
    "Kitchen surfaces, sink, taps, appliance exteriors",
    "Bathrooms: toilets, tubs, showers, glass, mirrors",
    "All floors vacuumed, then damp mopped",
    "Dusting high to low — ledges, sills, switches, screens",
    "Entryway, boot tray, salt lines",
    "Bins emptied, liners replaced",
  ],
  "Deep clean, once": [
    "Baseboards and door frames, by hand",
    "Inside the oven and fridge",
    "Window tracks and sills",
    "Vent covers and light fixtures",
    "Grout scrubbed, hard-water film removed",
    "Behind and beneath anything that moves",
  ],
  "Move-in / move-out": [
    "Every cupboard and drawer, inside",
    "Appliances pulled and cleaned behind",
    "Closet shelving and rails",
    "Wall spot-cleaning, adhesive removal",
    "Final photographs for your landlord",
    "Same-week scheduling in most months",
  ],
};

export default function ResidentialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Residential"
        title="Your home, on a schedule you forget about."
        lede="Weekly, biweekly or monthly, with the same two cleaners each time. Most Moncton homes land on biweekly and stop thinking about it."
      />

      <Section tone="light" className="!pt-4">
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 lg:grid-cols-3">
          {Object.entries(included).map(([heading, list], i) => (
            <RevealItem key={heading} className="bg-paper p-9">
              <span className="eyebrow text-marigold">
                {i === 0 ? "Recurring" : i === 1 ? "Reset" : "Empty units"}
              </span>
              <h2 id={i === 1 ? "deep" : i === 2 ? "move" : undefined} className="mt-4 text-[24px] font-semibold tracking-[-0.03em]">
                {heading}
              </h2>
              <ul className="mt-7 space-y-3">
                {list.map((item) => (
                  <li key={item} className="relative pl-6 text-[15.5px] leading-relaxed text-slate">
                    <span className="absolute left-0 top-[0.7em] h-px w-3 bg-marigold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center gap-6 rounded-2xl bg-foam p-8">
            <p className="max-w-[52ch] text-[16.5px] leading-relaxed text-slate">
              A standard three-bedroom home takes two cleaners about three hours. Recurring visits
              run shorter once the deep clean is behind you.
            </p>
            <ButtonLink href="/book" variant="gold" className="ml-auto">
              Get a flat quote
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Section tone="foam">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              The ones people actually ask.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
