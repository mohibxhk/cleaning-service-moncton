import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { site, areas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${site.phone} or send a message. We reply the same business day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Call, or write. Calling is faster."
        lede="Somebody answers between eight and six on weekdays. Messages sent overnight are replied to before lunch."
      />

      <Section tone="light" className="!pt-4">
        <div className="grid gap-14 lg:grid-cols-[1fr]">
          <Reveal>
            <a
              href={site.phoneHref}
              className="block text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold tracking-[-0.04em] text-tide"
            >
              {site.phone}
            </a>

            <a
              href={`mailto:${site.email}`}
              className="mt-3 block text-[17px] text-slate underline underline-offset-4 hover:text-tide"
            >
              {site.email}
            </a>

            <div className="mt-10">
              <p className="eyebrow mb-3 text-slate">Hours</p>

              <dl className="space-y-2">
                {site.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex justify-between gap-8 border-b border-ink/8 py-2 text-[15.5px]"
                  >
                    <dt className="text-slate">{h.days}</dt>
                    <dd className="font-mono text-[13.5px]">
                      {h.close ? `${h.open} – ${h.close}` : h.open}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-3 text-slate">Service Area</p>

              <p className="text-[15.5px] leading-relaxed text-slate">
                {areas.map((a) => a.name).join(" · ")}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow tone="dark">Write to us</Eyebrow>

            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Tell us what needs doing.
            </h2>

            <p className="mt-6 text-[17px] leading-relaxed text-foam/70">
              Size of the space, how often you want us, and the one thing that
              bothers you most. That is enough for a real answer.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
