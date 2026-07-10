import Link from "next/link";
import { site, nav, areas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-foam/55">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
                <path fill="#E3A63C" d="M16 2c4.6 5.6 8.4 10.2 8.4 15.1A8.4 8.4 0 0 1 16 25.5a8.4 8.4 0 0 1-8.4-8.4C7.6 12.2 11.4 7.6 16 2Z" />
                <path fill="#EEF3F1" d="M4 28.6h24v1.6H4z" />
              </svg>
              <span className="leading-[1.05] text-foam">
                <span className="block text-[15px] font-semibold tracking-[-0.02em]">Elavora</span>
                <span className="eyebrow block opacity-60">Professional cleaning service in Moncton</span>
              </span>
            </div>
            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed">
              Residential and commercial cleaning, and commercial-grade supply, for Greater Moncton.
            </p>
            <a href={site.phoneHref} className="mt-6 block text-2xl font-semibold tracking-[-0.03em] text-marigold">
              {site.phone}
            </a>
          </div>

          <nav aria-label="Services">
            <p className="eyebrow mb-5 text-foam/40">Services</p>
            <ul className="space-y-3 text-[14.5px]">
              {nav.slice(0, 4).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-marigold">{n.label}</Link>
                </li>
              ))}
              <li><Link href="/book" className="hover:text-marigold">Book a clean</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow mb-5 text-foam/40">Company</p>
            <ul className="space-y-3 text-[14.5px]">
              <li><Link href="/about" className="hover:text-marigold">About us</Link></li>
              <li><Link href="/faq" className="hover:text-marigold">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-marigold">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-marigold">Privacy policy</Link></li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5 text-foam/40">Where we clean</p>
            <p className="text-[14.5px] leading-relaxed">{areas.map((a) => a.name).join(" · ")}</p>
            <address className="mt-6 font-mono text-[12px] not-italic leading-relaxed">
              {site.address.street}<br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-8 font-mono text-[11px] uppercase tracking-[0.1em]">
          <span>&copy; {new Date().getFullYear()} {site.legalName}</span>
          <span>Insured &amp; WorkSafeNB covered</span>
        </div>
      </div>
    </footer>
  );
}
