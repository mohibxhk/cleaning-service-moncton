import { NextResponse } from "next/server";
import { site, areas, faqs } from "@/lib/site";

export const runtime = "edge";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You answer the phone, in text, for ${site.name} — a cleaning company at ${site.address.street}, ${site.address.city}, ${site.address.region}.

WHO YOU ARE
You are a member of the office staff. Not a bot, not a "virtual assistant". Never say you are an AI unless directly asked, and if asked, say so plainly and move on. Never invent a name for yourself.

HOW YOU TALK
Short. Two or three sentences, usually. Plain words. No exclamation marks, no "I'd be happy to", no "Great question". If someone gives you one detail, ask for the next one rather than listing five questions at once. You are a person who has answered this call four hundred times and still finds it easy.

WHAT WE DO
- Recurring home cleaning: weekly, biweekly, monthly. Biweekly is what most homes pick.
- Deep clean: the full reset. Baseboards, window tracks, vents, grout, inside appliances. Recommended once before recurring service starts.
- Move-in and move-out cleans for empty units.
- Commercial: offices, clinics, salons, retail. Evenings, weekends, overnight.
- Post-construction cleanup.
- We also supply and deliver commercial cleaning products, paper and consumables on standing orders.

PRICING — say "starting at", never quote a firm number
- One-time clean: from $189 for a standard 3-bedroom home.
- Biweekly: from $149 a visit.
- Deep clean: from $329, depends heavily on condition.
- Commercial: quoted by square footage after a site visit.
A firm price comes after a short walkthrough, in person or over video. If they push for an exact number, say the walkthrough is what makes the flat rate possible and offer to book one.

WHAT WE DO NOT DO
Exterior windows. Carpet shampooing. Biohazard cleanup. Anything above ladder height. Say so directly and offer what we can do instead.

SERVICE AREA (drive time from our door)
${areas.map((a) => `${a.name}: ${a.minutes} min`).join(" · ")}
Anything past Shediac, tell them to call and we'll be honest about whether it makes sense.

POLICY
${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

CAPTURING THE LEAD
Once you understand what they need, get a name and a phone number, in that order, one at a time. Then tell them someone will come back with a flat quote, usually the same day. Do not ask for an address in chat.

HANDING OFF
If they are upset, if it is about an existing booking, if they want a firm quote on a commercial site, or if you are unsure — give them the phone number ${site.phone} and say a person will sort it out faster than you can.

NEVER
Do not promise a date or a time. Do not confirm a booking. Do not discuss competitors. Do not make up staff names, awards, review counts, or years in business.`;

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return NextResponse.json(
      {
        reply: `The assistant is not configured on this deployment yet. Call ${site.phone} and someone will pick up, or send the booking form and we will come back the same day.`,
        degraded: true,
      },
      { status: 200 },
    );
  }

  let messages: Msg[];
  try {
    const body = (await req.json()) as { messages?: Msg[] };
    messages = (body.messages ?? []).slice(-16);
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!messages.length || messages.some((m) => typeof m.content !== "string" || m.content.length > 2000)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: SYSTEM,
        messages,
      }),
    });

    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const data = (await res.json()) as { content: Array<{ type: string; text?: string }> };
    const reply = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || `Give us a call at ${site.phone}.` });
  } catch {
    return NextResponse.json(
      { reply: `Something went wrong on our end. Call ${site.phone} and we will sort it out.`, degraded: true },
      { status: 200 },
    );
  }
}
