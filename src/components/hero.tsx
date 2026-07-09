"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { ButtonLink } from "./ui";

/**
 * Signature: on load, a blurred, streaked pane sits over the hero and is
 * pulled across the screen — a squeegee, using the trade's own instrument.
 * It happens once. Nothing else on the site repeats it.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header className="relative flex min-h-[100svh] items-end overflow-hidden bg-tide-deep pt-36 text-foam">
      {/* depth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 6%, rgba(14,92,85,.6) 0%, transparent 58%)," +
            "radial-gradient(90% 70% at 8% 100%, rgba(227,166,60,.10) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(102deg, rgba(255,255,255,.035) 0 1px, transparent 1px 5px)," +
            "repeating-linear-gradient(97deg, rgba(255,255,255,.02) 0 2px, transparent 2px 11px)",
        }}
      />

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 backdrop-blur-[9px] backdrop-saturate-[.7]"
          style={{
            background:
              "linear-gradient(105deg, rgba(255,255,255,.07), rgba(255,255,255,.015) 40%, rgba(255,255,255,.09))," +
              "repeating-linear-gradient(100deg, rgba(255,255,255,.05) 0 3px, transparent 3px 14px)",
          }}
          initial={{ clipPath: "inset(0 0 0 0%)" }}
          animate={{ clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 1.6, delay: 0.25, ease: [0.72, 0, 0.18, 1] }}
        >
          {/* the blade, and the bead of water riding it */}
          <div
            className="absolute inset-y-0 -right-1 w-9 blur-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.28) 62%, rgba(227,166,60,.5))",
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12"
        initial={reduce ? false : { opacity: 0.35, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow mb-6 text-marigold">
          Moncton · Dieppe · Riverview · Shediac
        </p>

        <h1 className="max-w-[15ch] text-[clamp(2.75rem,7.4vw,6.5rem)] font-semibold leading-[1.03]">
          A clean that holds up to a <span className="text-marigold">Moncton winter.</span>
        </h1>

        <p className="mt-7 max-w-[52ch] text-[clamp(1rem,1.35vw,1.19rem)] leading-relaxed text-foam/75">
          Home and commercial cleaning across Greater Moncton. The same crew every visit, our own
          supplies, and a walkthrough with you before we leave.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <ButtonLink href="/book" variant="gold" size="lg">
            Get a free quote
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="inline-flex h-14 items-center rounded-full border border-white/20 px-8 text-[15px] font-medium transition-colors hover:bg-white/8"
          >
            Call {site.phone}
          </a>
          <span className="ml-1 font-mono text-xs text-foam/45">Most quotes back same day</span>
        </div>

        {/* waterline */}
        <div className="relative mt-16 h-px bg-white/15 sm:mt-20">
          <motion.div
            className="absolute -top-px left-0 h-[3px] bg-marigold"
            initial={reduce ? false : { width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <dl className="flex flex-wrap gap-y-2 gap-x-10 py-5 pb-9 font-mono text-[11px] uppercase tracking-[0.14em] text-foam/55">
          <div>
            <dt className="sr-only">Coverage</dt>
            <dd className="text-foam/90">Insured &amp; WorkSafeNB covered</dd>
          </div>
          <div>
            <dt className="sr-only">Supplies</dt>
            <dd>
              <span className="text-foam/90">Supplies included</span> — or we restock yours
            </dd>
          </div>
          <div>
            <dt className="sr-only">Crew</dt>
            <dd>
              <span className="text-foam/90">Bonded crew</span>, background checked
            </dd>
          </div>
        </dl>
      </motion.div>
    </header>
  );
}
