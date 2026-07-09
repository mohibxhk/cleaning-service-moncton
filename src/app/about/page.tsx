import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { site, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "A small, local cleaning crew based on Curry Street in Moncton. No franchise, no call centre — the person who answers is the person who cleans.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small crew, on Curry Street."
        lede="We started cleaning Moncton homes because the alternative was a franchise sending a different stranger every fortnight, with a checklist written somewhere else."
      />

      <Section tone="light" className="!pt-4">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="text-[21px] leading-[1.5] font-medium">
              Cleaning is not complicated. It is just relentless, and most companies solve for volume
              instead of solving for the room.
            </p>
            <p className="mt-6 text-[17px] leading-relaxed text-slate">
              We solve for the room. That means the same two people arrive at your door every visit,
              they already know that the dog stays in the back bedroom and that the guest bathroom is
              the one you actually care about, and they work the space in an order that keeps it clean
              rather than one that finishes fast.
            </p>
            <p className="mt-6 text-[17px] leading-relaxed text-slate">
              We are insured, we carry WorkSafeNB coverage, our crew is background checked, and we
              have been doing this out of {site.address.street} since {site.founded}. If a room falls
              short you call us within 48 hours and we come back. That has cost us a handful of
              Saturdays and no clients at all.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-foam p-9">
              <Eyebrow>What we will not do</Eyebrow>
              <ul className="mt-2 divide-y divide-ink/10">
                {[
                  ["Quote by the hour", "It rewards us for being slow."],
                  ["Send a different crew", "They would start from zero, and you would pay for it."],
                  ["Add to the invoice", "The number you agreed to is the number."],
                  ["Take a job we cannot do well", "Exterior windows, carpets, biohazard. We will name someone who can."],
                ].map(([h, b]) => (
                  <li key={h} className="py-5">
                    <p className="text-[17px] font-medium tracking-[-0.02em]">{h}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <Reveal className="max-w-[46ch]">
          <Eyebrow tone="dark">Method</Eyebrow>
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
            The order is the method.
          </h2>
        </Reveal>
        <div className="mt-14 border-t border-white/12">
          {processSteps.map((s) => (
            <Reveal key={s.title}>
              <div className="grid items-baseline gap-3 border-b border-white/12 py-7 md:grid-cols-[150px_1fr_1.1fr] md:gap-8">
                <p className="font-mono text-[13px] text-marigold">{s.window}</p>
                <h3 className="text-[21px] font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[15.5px] leading-relaxed text-foam/65">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <ButtonLink href="/book" variant="gold" size="lg" className="mt-14">
            Book a clean
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
