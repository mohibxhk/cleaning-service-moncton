import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, faqSchema } from "@/lib/schema";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Access, supplies, pricing, cancellations, insurance, and what happens if a room falls short.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <PageHeader
        eyebrow="FAQ"
        title="Everything people ask before booking."
        lede="If it is not here, ask the assistant in the corner of the screen, or call and ask a person."
      />

      <Section tone="light" className="!pt-4">
        <Reveal className="max-w-[900px]">
          <FaqAccordion items={faqs} />
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-6 rounded-2xl bg-foam p-9">
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-slate">
              Still deciding? Book one clean and judge us on it. No contract, no commitment.
            </p>
            <div className="ml-auto flex flex-wrap gap-3">
              <ButtonLink href="/book" variant="gold">Book a clean</ButtonLink>
              <a href={site.phoneHref} className="inline-flex h-12 items-center rounded-full border border-ink/15 px-6 text-[14.5px] font-medium hover:border-ink/40">
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
