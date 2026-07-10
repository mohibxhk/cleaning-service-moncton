import Link from "next/link";
import { site, nav, areas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-foam/55">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="leading-[1.05] text-foam">
                <span className="block text-[22px] font-semibold tracking-[-0.02em]">
                  ELAVORA
                </span>
                <span className="eyebrow block opacity-60">
                  Professional Home Services
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed">
              Premium residential and commercial cleaning services across
              Greater Moncton.
            </p>

            <a
              href={site.phoneHref}
              className="mt-6 block text-2xl font-semibold tracking-[-0.03em] text-marigold"
            >
              {site.phone}
            </a>
          </div>

          <nav aria-label="Services">
            <p className="eyebrow mb-5 text-foam/40">Services</p>
            <ul className="space-y-3 text-[14.5px]">
              {nav.slice(0, 4).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-marigold">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="hover:text-marigold">
                  Book a Clean
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow mb-5 text-foam/40">Company</p>
            <ul className="space-y-3 text-[14.5px]">
              <li>
                <Link href="/about" className="hover:text-marigold">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-marigold">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-marigold">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-marigold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5 text-foam/40">Service Areas</p>
            <p className="text-[14.5px] leading-relaxed">
              {areas.map((a) => a.name).join(" • ")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-center md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-foam/60">
            © {new Date().getFullYear()} <strong>Elavora Home Services</strong>.
            All Rights Reserved.
          </span>

          <a
            href="https://hubofecom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-marigold hover:underline"
          >
            Website designed & developed by Hubofecom
          </a>
        </div>
      </div>
    </footer>
  );
}
