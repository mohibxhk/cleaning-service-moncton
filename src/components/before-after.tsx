"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  before: string;
  after: string;
  alt: string;
  caption?: string;
};

/**
 * Keyboard-operable comparison slider. The handle is a real range input,
 * so arrow keys, screen readers and touch all work without extra wiring.
 */
export function BeforeAfter({ before, after, alt, caption }: Props) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);

  const onPointer = useCallback((e: React.PointerEvent) => {
    if (e.buttons !== 1 || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <figure className="group">
      <div
        ref={frame}
        onPointerMove={onPointer}
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl bg-tide-deep select-none"
      >
        <Image
          src={after}
          alt={`${alt} — after cleaning`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={before}
            alt={`${alt} — before cleaning`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale-[.25] brightness-[.82]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foam backdrop-blur-sm">
            Before
          </span>
        </div>

        <span className="absolute right-4 top-4 rounded-full bg-marigold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
          After
        </span>

        {/* the seam */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-marigold"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-marigold text-ink shadow-lg transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
              <path d="M9 6 4 12l5 6zM15 6l5 6-5 6z" />
            </svg>
          </div>
        </div>

        <label className="sr-only" htmlFor={`ba-${alt}`}>
          Reveal the before or after image for {alt}
        </label>
        <input
          id={`ba-${alt}`}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-valuetext={`${Math.round(pos)}% before`}
        />
      </div>

      {caption && (
        <figcaption className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-slate">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
