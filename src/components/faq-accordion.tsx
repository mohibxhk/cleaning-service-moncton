"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-ink/10">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-8 py-6 text-left"
              >
                <span className="text-[18px] font-medium tracking-[-0.02em] sm:text-[20px]">{item.q}</span>
                <Plus
                  className={cn(
                    "h-5 w-5 shrink-0 text-marigold transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-7 text-[16.5px] leading-relaxed text-slate">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
