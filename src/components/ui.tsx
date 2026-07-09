import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Button ──────────────────────────────────────────────── */

type Variant = "gold" | "dark" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  gold: "bg-marigold text-ink hover:bg-marigold-lift shadow-[0_8px_24px_-10px_rgba(227,166,60,.7)]",
  dark: "bg-tide text-white hover:bg-tide-deep",
  ghost: "text-foam border border-white/20 hover:bg-white/8",
  outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[.03]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13.5px]",
  md: "h-12 px-6 text-[14.5px]",
  lg: "h-14 px-8 text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,box-shadow] duration-200 " +
  "hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50 " +
  "disabled:pointer-events-none whitespace-nowrap";

export function Button({
  variant = "dark",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "dark",
  size = "md",
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

/* ── Field primitives ────────────────────────────────────── */

const fieldBase =
  "w-full rounded-xl border bg-transparent px-4 py-3 text-[15px] " +
  "transition-colors placeholder:text-slate/50 focus:outline-none";

export function Input({
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        fieldBase,
        "border-ink/12 focus:border-tide",
        invalid && "border-red-500/60",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-28 resize-y border-ink/12 focus:border-tide", className)}
      {...props}
    />
  );
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        fieldBase,
        "h-[50px] appearance-none border-ink/12 focus:border-tide",
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path fill=%22%235E6E6A%22 d=%22M6 8 2 4h8z%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("eyebrow mb-2 block text-slate", className)}
      {...props}
    />
  );
}

export function Field({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

/* ── Section shell ───────────────────────────────────────── */

export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "foam" | "dark";
}) {
  const tones = {
    light: "bg-paper text-ink",
    foam: "bg-foam text-ink",
    dark: "bg-tide-deep text-foam",
  };
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-36", tones[tone], className)}>
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={cn("eyebrow mb-5", tone === "dark" ? "text-marigold" : "text-tide")}>{children}</p>
  );
}
