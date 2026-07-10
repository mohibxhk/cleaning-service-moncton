import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Repeat, Receipt, RotateCcw } from "lucide-react";

import { Hero } from "@/components/hero";
import { BeforeAfter } from "@/components/before-after";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section, Eyebrow, ButtonLink } from "@/components/ui";
import { JsonLd, faqSchema } from "@/lib/schema";
import { site, services, areas, faqs, testimonials, products, processSteps } from "@/lib/site";

const gallery = [
  {
    before: "/before-bedroom.JPG",
    after: "/after-bedroom.JPG",
    alt: "Bedroom Cleaning",
    caption: "Bedroom • Before & After",
  },
  {
    before: "/before-bathroom.JPG",
    after: "/after-bathroom.JPG",
    alt: "Bathroom Cleaning",
    caption: "Bathroom • Before & After",
  },
  {
    before: "/before-closet.JPG",
    after: "/after-closet.JPG",
    alt: "Closet Organization",
    caption: "Closet • Before & After",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />

      {/* ── Trust ───────────────────────────────────────── */}
      <Section tone="light" className="!py-16 sm:!py-20">
        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title}>
              <Icon className="mb-4 h-5 w-5 text-tide" aria-hidden />
              <h2 className="mb-2 text-[17px] font-medium tracking-[-0.02em]">{title}</h2>
              <p className="text-[14.5px] leading-relaxed text-slate">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Services ────────────────────────────────────── */}
      <Section tone="foam" id="services">
        <Reveal className="max-w-[46ch]">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
            Six ways we show up.
          </h2>
          <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
            Pick what you need. Every job opens with a walkthrough and closes with one, so you are
            never guessing what got done.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.title} className="group bg-paper">
              <Link href={`/${s.slug}`} className="flex h-full flex-col p-8 transition-colors hover:bg-white">
                <span className="eyebrow text-marigold">{s.label}</span>
                <h3 className="mt-4 flex items-start justify-between gap-3 text-[21px] font-medium tracking-[-0.02em]">
                  {s.title}
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tide" />
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.blurb}</p>
                <p className="mt-auto border-t border-ink/8 pt-4 font-mono text-[11.5px] text-slate/70">
                  {s.detail}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Why us ──────────────────────────────────────── */}
      <Section tone="light">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Who you are hiring</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Local, small, and picky about it.
            </h2>
            <p className="mt-7 text-[21px] leading-[1.5] font-medium">
              We are based on Curry Street, a few minutes from downtown, and we clean the city we
              live in.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-slate">
              That means we know what a Maritime February does to a front hall, and that a
              Petitcodiac summer leaves a film on every south-facing window. The visit gets built
              around the rooms that actually get used — not a checklist printed in another province.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-slate">
              Small crew. No franchise fees, no call centre. When you phone, you reach the person who
              will be standing in your kitchen on Thursday.
            </p>
            <ButtonLink href="/about" variant="outline" size="md" className="mt-9">
              More about us
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { n: "94", l: "Curry St, Moncton" },
                { n: `${new Date().getFullYear() - site.founded}`, l: "Years cleaning here" },
                { n: "8", l: "Communities served" },
                { n: "48h", l: "Re-clean guarantee" },
              ].map((stat, i) => (
                <div
                  key={stat.l}
                  className={`rounded-2xl p-8 ${i % 3 === 0 ? "bg-tide-deep text-foam" : "bg-foam"}`}
                >
                  <p className="text-5xl font-semibold tracking-[-0.04em]">{stat.n}</p>
                  <p
                    className={`eyebrow mt-3 ${i % 3 === 0 ? "text-marigold" : "text-slate"}`}
                  >
                    {stat.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Before & after ──────────────────────────────── */}
      <Section tone="foam">
        <Reveal className="max-w-[46ch]">
          <Eyebrow>Before &amp; after</Eyebrow>
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
            Drag the line.
          </h2>
          <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
            Real jobs, same camera position, no staging between the two frames.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2">
          {gallery.map((g) => (
            <RevealItem key={g.alt}>
              <BeforeAfter {...g} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Process ─────────────────────────────────────── */}
      <Section tone="dark">
        <Reveal className="max-w-[46ch]">
          <Eyebrow tone="dark">A standard visit</Eyebrow>
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
            Three hours, in order.
          </h2>
          <p className="mt-6 text-[17.5px] leading-relaxed text-foam/70">
            Wet rooms go first so product has time to work while we are elsewhere. The order is the
            method — nothing is left to memory.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-white/12">
          {processSteps.map((step) => (
            <Reveal key={step.title}>
              <div className="grid items-baseline gap-3 border-b border-white/12 py-8 md:grid-cols-[150px_1fr_1.1fr] md:gap-8">
                <p className="font-mono text-[13px] tracking-[0.05em] text-marigold">{step.window}</p>
                <h3 className="text-[22px] font-medium tracking-[-0.02em]">{step.title}</h3>
                <p className="text-[15.5px] leading-relaxed text-foam/65">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Testimonials ────────────────────────────────── */}
      <Section tone="light">
        <Reveal className="max-w-[46ch]">
          <Eyebrow>Reviews</Eyebrow>
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
            What people say.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.quote}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/8 p-8 shadow-lift">
                <div aria-label={`${t.rating} out of 5`} className="mb-5 tracking-[0.24em] text-[13px] text-marigold">
                  {"★".repeat(t.rating)}
                </div>
                <blockquote className="text-[16.5px] leading-relaxed">{t.quote}</blockquote>
                <figcaption className="eyebrow mt-auto pt-7 text-slate">
                  {t.name} · {t.context}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Areas ───────────────────────────────────────── */}
      <Section tone="foam">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Service area</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Greater Moncton, and the drive out.
            </h2>
            <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
              Measured honestly, from our door at 94 Curry Street. Past Shediac, call us — we will
              tell you plainly whether it makes sense.
            </p>
          </Reveal>

          <RevealGroup className="grid gap-x-16 sm:grid-cols-2" stagger={0.05}>
            {areas.map((a) => (
              <RevealItem key={a.name}>
                <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4">
                  <span className="text-[19px] font-medium tracking-[-0.02em]">{a.name}</span>
                  <span className="font-mono text-[12px] text-slate">{a.minutes} min</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ── Products ────────────────────────────────────── */}
      <Section tone="light">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-[44ch]">
            <Eyebrow>Also from us</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              The products we clean with.
            </h2>
            <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
              Commercial-grade, sold to Moncton businesses and delivered on a standing schedule.
            </p>
          </Reveal>
          <ButtonLink href="/cleaning-products" variant="outline">
            See the catalogue
          </ButtonLink>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <RevealItem key={p.name}>
              <article className="flex h-full flex-col rounded-2xl border border-ink/8 p-7 transition-shadow hover:shadow-lift">
                <div className="mb-6 h-24 rounded-xl bg-gradient-to-br from-tide-soft to-foam" aria-hidden />
                <h3 className="text-[17px] font-medium tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.12em] text-slate">{p.size}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate">{p.note}</p>
                <p className="mt-auto pt-6 text-[17px] font-medium text-tide">{p.price}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <Section tone="foam" id="faq">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Before you book.
            </h2>
            <p className="mt-6 text-[17.5px] leading-relaxed text-slate">
              Anything not here, ask the assistant in the corner — or just call.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <FaqAccordion items={faqs.slice(0, 6)} />
          </Reveal>
        </div>
      </Section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <Section tone="dark">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-[18ch] text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.03]">
            Book the first clean. Judge us on that one.
          </h2>
          <p className="mx-auto mt-7 max-w-[52ch] text-[17.5px] leading-relaxed text-foam/70">
            No contract, no commitment, and a flat price you agree to before anyone picks up a cloth.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/book" variant="gold" size="lg">
              Book a clean
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex h-14 items-center rounded-full border border-white/20 px-8 text-[15px] font-medium transition-colors hover:bg-white/8"
            >
              {site.phone}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
