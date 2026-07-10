"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, ArrowUp, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const OPENER: Msg = {
  role: "assistant",
  content: "Hi — what do you need cleaned?",
};

const PROMPTS = [
  "What does a biweekly clean cost?",
  "Do you clean offices after hours?",
  "Do you do move-out cleans?",
];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([OPENER]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const feed = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;

    const next = [...msgs, { role: "user" as const, content: clean }];
    setMsgs(next);
    setDraft("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== OPENER) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? `Call us at ${site.phone}.` },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: `The connection dropped. Call ${site.phone} and we will pick up.` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Cleaning Service Moncton"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-4 z-90 flex max-h-[72svh] flex-col overflow-hidden rounded-3xl border border-white/10 bg-tide-deep shadow-deep sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[14.5px] font-medium text-foam">Elavora</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-foam/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-marigold" />
                  Answers in seconds
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 text-foam/60 hover:text-foam">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={feed} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[86%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "ml-auto bg-marigold text-ink"
                      : "bg-white/8 text-foam/90",
                  )}
                >
                  {m.content}
                </div>
              ))}

              {busy && (
                <div className="flex w-fit gap-1 rounded-2xl bg-white/8 px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-foam/60"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16 }}
                    />
                  ))}
                </div>
              )}

              {msgs.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="rounded-full border border-white/15 px-3.5 py-2 text-[13px] text-foam/70 transition-colors hover:border-marigold hover:text-marigold"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-full border border-white/15 pl-4 pr-1.5 py-1.5 focus-within:border-marigold">
                <input
                  ref={input}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(draft)}
                  placeholder="Ask about pricing, areas, bookings…"
                  aria-label="Message"
                  className="flex-1 bg-transparent py-1.5 text-[14.5px] text-foam placeholder:text-foam/35 focus:outline-none"
                />
                <button
                  onClick={() => send(draft)}
                  disabled={!draft.trim() || busy}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marigold text-ink transition disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <a
                href={site.phoneHref}
                className="mt-2.5 flex items-center justify-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-foam/40 hover:text-marigold"
              >
                <Phone className="h-3 w-3" />
                Rather talk to someone — {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className={cn(
          "fixed right-5 bottom-5 z-80 flex h-14 w-14 items-center justify-center rounded-full bg-tide text-foam shadow-deep transition-transform hover:scale-105 sm:right-6 sm:bottom-6",
          open && "scale-0 opacity-0",
        )}
      >
        <MessageSquare className="h-5 w-5" />
      </button>
    </>
  );
}
