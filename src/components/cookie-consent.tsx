"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui";

const KEY = "csm.cookie-choice";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setTimeout(() => setShow(true), 1400);
    } catch {
      /* storage blocked — stay quiet */
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed bottom-4 left-4 z-90 hidden max-w-[420px] rounded-2xl border border-ink/10 p-5 shadow-lift sm:block"
        >
          <p className="text-[14.5px] leading-relaxed text-ink">
            We use one analytics cookie to see which pages people actually read. Nothing is sold, and
            nothing follows you off this site.
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <Button size="sm" variant="dark" onClick={() => choose("accepted")}>
              Allow
            </Button>
            <Button size="sm" variant="outline" onClick={() => choose("declined")}>
              Decline
            </Button>
            <Link
              href="/privacy"
              className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate underline underline-offset-4"
            >
              Privacy
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
