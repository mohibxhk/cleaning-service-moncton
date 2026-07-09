import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/residential-cleaning", priority: 0.9, freq: "monthly" as const },
    { path: "/commercial-cleaning", priority: 0.9, freq: "monthly" as const },
    { path: "/cleaning-products", priority: 0.8, freq: "monthly" as const },
    { path: "/pricing", priority: 0.8, freq: "monthly" as const },
    { path: "/book", priority: 0.9, freq: "yearly" as const },
    { path: "/about", priority: 0.6, freq: "yearly" as const },
    { path: "/faq", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
