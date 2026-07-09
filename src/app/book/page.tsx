import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BookingForm } from "@/components/booking-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a clean",
  description:
    "Request a cleaning appointment in Moncton. Pick a date, tell us about the space, and we confirm the window by phone within one business day.",
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book"
        title="Tell us about the space."
        lede={`Four short sections. We confirm the window by phone within one business day and the flat price after a walkthrough. In a hurry, call ${site.phone}.`}
      />

      <Section tone="light" className="!pt-4">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_0.9fr] lg:gap-24">
          <Reveal>
            <BookingForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="sticky top-28 rounded-3xl bg-foam p-8">
              <p className="eyebrow text-tide">What happens next</p>
              <ol className="mt-6 space-y-6">
                {[
                  ["We call", "Within one business day, to confirm your window and ask two or three questions."],
                  ["We walk through", "In person or over video, ten minutes. This is what makes a flat price possible."],
                  ["You get a number", "Written down, held for 90 days, and it does not change unless the scope does."],
                ].map(([h, b], i) => (
                  <li key={h} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-[12px] text-marigold">{`0${i + 1}`}</span>
                    <div>
                      <p className="text-[16px] font-medium tracking-[-0.02em]">{h}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-slate">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-9 border-t border-ink/10 pt-7">
                <p className="text-[14.5px] leading-relaxed text-slate">Rather just talk to someone?</p>
                <a href={site.phoneHref} className="mt-2 block text-[22px] font-semibold tracking-[-0.03em] text-tide">
                  {site.phone}
                </a>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.13em] text-slate">
                  Mon–Fri 8–18 · Sat 9–15
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
