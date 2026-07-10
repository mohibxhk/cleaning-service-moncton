import Image from "next/image";
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "./ui";
import { cn } from "@/lib/utils";

function Wordmark({ dark }: { dark: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
      <Image
  src="/elavora-logo.png"
  alt="Elavora Home Services"
  width={60}
  height={60}
  className="h-12 w-12 shrink-0 object-contain"
/>
      <span className="sr-only">
  Elavora Home Services
</span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (onHome ? window.innerHeight - 100 : 20));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => void (document.body.style.overflow = "");
  }, [open]);

  // On interior pages the header sits over white from the first pixel.
  const solid = scrolled || !onHome;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-foam"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 transition-[background,box-shadow,padding] duration-300",
          solid ? "glass py-3 shadow-[0_1px_0_rgba(11,31,28,.08)]" : "py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Wordmark dark={solid} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[14.5px] font-medium transition-colors",
                  solid ? "text-slate hover:text-tide" : "text-foam/80 hover:text-marigold",
                  pathname === item.href && (solid ? "text-tide" : "text-marigold"),
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={site.phoneHref}
              className={cn(
                "hidden font-mono text-[13.5px] transition-colors md:inline-flex md:items-center md:gap-2",
                solid ? "text-ink hover:text-tide" : "text-foam hover:text-marigold",
              )}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {site.phone}
            </a>

            <ButtonLink href="/book" variant="gold" size="sm" className="hidden sm:inline-flex">
              Book a clean
            </ButtonLink>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn("p-1 lg:hidden", solid ? "text-ink" : "text-foam")}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70 bg-tide-deep px-6 py-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <Wordmark dark={false} />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1 text-foam">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-2" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/10 py-4 text-3xl font-semibold tracking-[-0.03em] text-foam"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10 flex flex-col gap-3">
              <ButtonLink href="/book" variant="gold" size="lg">
                Book a clean
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="text-center font-mono text-sm text-foam/70"
              >
                or call {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
