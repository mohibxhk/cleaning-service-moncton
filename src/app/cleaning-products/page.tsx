import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cleaning products supplier, Moncton",
  description:
    "Commercial-grade cleaning product, paper and consumables supplied to Moncton businesses on a standing monthly order. Delivery included in Greater Moncton.",
  alternates: { canonical: "/cleaning-products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Supply"
        title="The same product we clean with."
        lede="We buy commercial-grade because it works, and we sell it to Moncton businesses at the price we pay plus a margin we will tell you out loud."
      />

      <Section tone="light" className="!pt-4">
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <RevealItem key={p.name}>
              <article className="flex h-full flex-col rounded-2xl border border-ink/8 p-7 transition-shadow hover:shadow-lift">
                <div className="mb-6 h-32 rounded-xl bg-gradient-to-br from-tide-soft to-foam" aria-hidden />
                <h2 className="text-[17.5px] font-medium tracking-[-0.02em]">{p.name}</h2>
                <p className="eyebrow mt-1.5 text-slate">{p.size}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate">{p.note}</p>
                <p className="mt-auto pt-6 text-[18px] font-medium text-tide">{p.price}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mt-10 font-mono text-[12px] text-slate">
            Catalogue is a sample. Full price list goes out with your first delivery schedule.
          </p>
        </Reveal>
      </Section>

      <Section tone="foam">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Standing orders</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              Nobody should be buying hand soap on a Friday.
            </h2>
            <p className="mt-7 text-[17px] leading-relaxed text-slate">
              Tell us what you go through in a month. We build the order, deliver it on the same day
              each month across Greater Moncton, and adjust it after the first two cycles once we can
              both see the real burn rate.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-slate">
              Existing cleaning clients get delivery folded into a scheduled visit. Everyone else pays
              nothing for delivery inside the service area.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <ButtonLink href="/contact" variant="dark" size="lg">
                Open an account
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex h-14 items-center rounded-full border border-ink/15 px-8 text-[15px] font-medium hover:border-ink/40"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {[
                ["Minimum order", "$150 for delivery inside Greater Moncton"],
                ["Delivery day", "Fixed, monthly, chosen by you"],
                ["Dispensers", "Loaned free against a standing paper order"],
                ["Safety data", "SDS sheets supplied and kept current"],
                ["Terms", "Net 30 on approved accounts"],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 text-slate">{k}</dt>
                  <dd className="text-[16px]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
