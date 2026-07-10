export const site = {
  name: "Cleaning Service Moncton",
  legalName: "Cleaning Service Moncton",
  tagline: "A clean that holds up to a Moncton winter.",
  description:
    "Residential and commercial cleaning across Greater Moncton, plus commercial-grade cleaning products delivered on a schedule. Same crew every visit, flat quotes, walkthrough before we leave.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningservicemoncton.ca",
  phone: "+1 (506) 269-4775",
  phoneHref: "tel:+15062694775",
  email: "hello@cleaningservicemoncton.ca",
  address: {
    street: "94 Curry St",
    city: "Moncton",
    region: "NB",
    postalCode: "E1A 3V5",
    country: "CA",
  },
  geo: { lat: 46.1097, lng: -64.7508 },
  hours: [
    { days: "Monday – Friday", open: "08:00", close: "18:00" },
    { days: "Saturday", open: "09:00", close: "15:00" },
    { days: "Sunday", open: "Closed", close: "" },
  ],
  founded: 2019,
} as const;

export const nav = [
  { label: "Residential", href: "/residential-cleaning" },
  { label: "Commercial", href: "/commercial-cleaning" },
  { label: "Products", href: "/cleaning-products" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const areas = [
  { name: "Moncton", minutes: 5 },
  { name: "Dieppe", minutes: 8 },
  { name: "Riverview", minutes: 12 },
  { name: "Shediac", minutes: 25 },
] as const;

export const services = [
  {
    slug: "residential-cleaning",
    label: "Residential",
    title: "Recurring home cleaning",
    blurb:
      "Weekly, biweekly or monthly. The rooms that actually get used, cleaned in the order that makes them stay clean.",
    detail: "Kitchen, bathrooms, floors, dusting, glass, entryway — every visit.",
  },
  {
    slug: "residential-cleaning#deep",
    label: "Deep clean",
    title: "The reset",
    blurb:
      "Baseboards, window tracks, vents, grout, inside appliances, behind whatever moves. Once, properly, before recurring service starts.",
    detail: "Recommended before your first recurring visit.",
  },
  {
    slug: "residential-cleaning#move",
    label: "Move-in & out",
    title: "Empty-unit cleans",
    blurb:
      "For landlords, sellers, and anyone with a damage deposit riding on it. We photograph the finished unit.",
    detail: "Two days' notice in most weeks.",
  },
  {
    slug: "commercial-cleaning",
    label: "Commercial",
    title: "Offices, clinics, retail",
    blurb:
      "Evenings, weekends, or overnight. Keyed or fob access, a fixed scope, and an invoice that matches the quote.",
    detail: "Insurance and WorkSafeNB coverage on file.",
  },
  {
    slug: "commercial-cleaning#construction",
    label: "Post-construction",
    title: "After the trades",
    blurb:
      "Drywall dust, adhesive film, sticker and paint removal. We come after the last trade, not alongside them.",
    detail: "Quoted per square foot.",
  },
  {
    slug: "cleaning-products",
    label: "Supply",
    title: "Products & restocking",
    blurb:
      "Commercial-grade product, paper and consumables delivered on a standing schedule, so nobody makes a Friday run for hand soap.",
    detail: "By account. Delivery included in Greater Moncton.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need to be home?",
    a: "No. Most clients leave a key, a code, or a lockbox. Access details are logged and returned the day service ends. If you would rather be there, that is fine too — say so when you book.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes. Product, cloths, vacuum, everything. If you prefer we use your products, tell us and we will. We also sell and deliver commercial-grade supplies if you would rather keep your own stock.",
  },
  {
    q: "How is the price decided?",
    a: "By the size of the space and how often we visit, not by the hour. You get a flat number before the first visit and it does not move unless the scope does. Nothing is added to the invoice after the fact.",
  },
  {
    q: "What is not included?",
    a: "Exterior windows, carpet shampooing, biohazard cleanup, and anything above ladder height. We say so before the visit, not after.",
  },
  {
    q: "Pets?",
    a: "Very welcome. Tell us their names and whether they should stay behind a closed door while we work.",
  },
  {
    q: "What if I need to cancel?",
    a: "Twenty-four hours' notice and there is no charge. Less than that and we bill half, because the crew has already been scheduled for your window.",
  },
  {
    q: "What if a room is not clean?",
    a: "Call within 48 hours. We return and redo that room. No argument, no second invoice.",
  },
  {
    q: "Are you insured?",
    a: "Yes — liability insurance and WorkSafeNB coverage, both current. Certificates go out with every commercial quote and are available to homeowners on request.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "They caught the window tracks I had been ignoring for two years. Same two people every time, and the house smells like nothing afterward — which is exactly what I wanted.",
    name: "Placeholder review",
    context: "Biweekly · Moncton North",
    rating: 5,
  },
  {
    quote:
      "We use them for the clinic after hours. Quiet, reliable, and they flag the supplies before we run out. I have not had to think about it once this year.",
    name: "Placeholder review",
    context: "Commercial · Dieppe",
    rating: 5,
  },
  {
    quote:
      "Move-out clean got the full deposit back and the landlord actually commented on it. Booked with two days' notice in July.",
    name: "Placeholder review",
    context: "Move-out · Riverview",
    rating: 5,
  },
] as const;

export const products = [
  {
    name: "Neutral floor cleaner",
    size: "4 L concentrate",
    note: "Dilutes 1:64. Safe on sealed hardwood, LVP and tile.",
    price: "price: "Trusted by Professionals",
  },
  {
    name: "Hospital-grade disinfectant",
    size: "1 L ready-to-use",
    note: "DIN registered. One-minute contact time.",
    price: "Commercial Quality",
  },
  {
    name: "Microfibre, colour-coded",
    size: "Pack of 24",
    note: "Four colours so bathroom cloths never reach a countertop.",
    price: "Eco Friendly",
  },
  {
    name: "Paper & dispenser program",
    size: "Standing order",
    note: "Roll towel, tissue, liners, hand soap. Delivered monthly.",
    price: "By account",
  },
] as const;

export const processSteps = [
  {
    window: "0:00 — 0:10",
    title: "Walkthrough",
    body: "You point at what is bothering you this week. That list goes first, before the routine does.",
  },
  {
    window: "0:10 — 1:10",
    title: "Kitchen & bathrooms",
    body: "Surfaces sprayed and left to dwell, then worked. Product needs time; we give it time by leaving the room.",
  },
  {
    window: "1:10 — 2:20",
    title: "Living space, dust, glass",
    body: "High to low, always. Ledges, sills, switches, screens, mirrors, then every horizontal surface.",
  },
  {
    window: "2:20 — 2:50",
    title: "Floors & entryway",
    body: "Vacuum, then damp mop. The entryway is last, because it is the room that undoes the rest.",
  },
  {
    window: "2:50 — 3:00",
    title: "Second walkthrough",
    body: "We check the space together. Anything missed is fixed before we pack the van.",
  },
] as const;
