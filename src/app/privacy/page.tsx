import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What we collect, why, how long we keep it, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    h: "What we collect",
    p: "Your name, phone number, email address, and whatever you tell us about the property when you book or write to us. If you use the chat assistant, the text of that conversation. Nothing else.",
  },
  {
    h: "Why we collect it",
    p: "To quote the work, schedule the crew, and reach you if something changes. We do not sell it, rent it, or share it with anyone outside the people who will be cleaning your space.",
  },
  {
    h: "The chat assistant",
    p: "Messages you send to the assistant are processed by Anthropic to generate a reply. Do not put payment details, access codes, or health information into it. If you need to share any of that, call us.",
  },
  {
    h: "Cookies",
    p: "One analytics cookie, set only if you allow it, so we can see which pages people read. Declining changes nothing about how the site works. No advertising cookies, no third-party trackers.",
  },
  {
    h: "How long we keep it",
    p: "Enquiries that do not become bookings are deleted after twelve months. Client records are kept for seven years, because Canadian tax law requires it.",
  },
  {
    h: "Your rights",
    p: `Under PIPEDA you can ask what we hold about you, correct it, or have it deleted. Email ${site.email} or call ${site.phone} and we will action it within thirty days.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede="Short, because we collect very little. Last updated when this site was published."
      />

      <Section tone="light" className="!pt-4">
        <div className="max-w-[70ch] space-y-12">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[22px] font-semibold tracking-[-0.03em]">{s.h}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-slate">{s.p}</p>
            </section>
          ))}
          <p className="border-t border-ink/10 pt-8 font-mono text-[12px] text-slate">
            {site.legalName} · {site.address.street}, {site.address.city}, {site.address.region}{" "}
            {site.address.postalCode}
          </p>
        </div>
      </Section>
    </>
  );
}
