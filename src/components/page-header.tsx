import { Eyebrow } from "./ui";
import { Reveal } from "./reveal";

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="bg-paper pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,5.6vw,4.5rem)] font-semibold leading-[1.03]">
            {title}
          </h1>
          {lede && (
            <p className="mt-7 max-w-[58ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-slate">
              {lede}
            </p>
          )}
          <div className="rule mt-12 h-[3px] w-full" />
        </Reveal>
      </div>
    </section>
  );
}
