import { Section, ButtonLink, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <Section tone="light" className="!pt-44">
      <Eyebrow>404</Eyebrow>
      <h1 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.03]">
        That page is not here.
      </h1>
      <p className="mt-6 max-w-[50ch] text-[17.5px] leading-relaxed text-slate">
        The link may be old, or we may have moved it. Start again from the top, or call and we will
        tell you what you were looking for.
      </p>
      <div className="mt-9 flex flex-wrap gap-3.5">
        <ButtonLink href="/" variant="gold" size="lg">Back to the start</ButtonLink>
        <a href={site.phoneHref} className="inline-flex h-14 items-center rounded-full border border-ink/15 px-8 text-[15px] font-medium hover:border-ink/40">
          {site.phone}
        </a>
      </div>
    </Section>
  );
}
