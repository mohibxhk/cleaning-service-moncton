"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Mobile-only. Appears once the hero is behind you, sits clear of the
 * chat launcher, and disappears on the booking page where it would be noise.
 */
export function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed inset-x-0 bottom-0 z-70 flex items-center gap-3 border-t border-ink/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <a
            href={site.phoneHref}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink"
            aria-label={`Call ${site.phone}`}
          >
            <Phone className="h-4.5 w-4.5" />
          </a>
          <Link
            href="/book"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-marigold text-[15px] font-medium text-ink"
          >
            Book a clean
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
