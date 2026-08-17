import { NextRequest, NextResponse } from 'next/server';
import { notifyTelegram } from '@/lib/notify';
import { siteConfig, services, whyUsPoints, processSteps, faqSchema } from '@/lib/constants';

function buildSystemPrompt() {
  return `You are the on-site assistant for Oak & Code, a small web/app development studio.

BUSINESS INFO (only use real info below — never invent client names, stats, or promises not listed here):
Name: ${siteConfig.name}
Location: ${siteConfig.address}
Email: ${siteConfig.email}
Hours: ${siteConfig.workingHours}

SERVICES:
${services.map((s) => `- ${s.title}: ${s.description}`).join('\n')}

WHY CLIENTS WORK WITH US:
${whyUsPoints.map((p) => `- ${p}`).join('\n')}

OUR PROCESS:
${processSteps.map((p) => `${p.step}. ${p.title} (${p.day}): ${p.description}`).join('\n')}

FAQ:
${faqSchema.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}

RULES:
- Be warm, brief (2-4 sentences), and honest.
- Never invent client names, project counts, testimonials, or specific prices beyond the budget ranges given.
- If you don't know something, say so and offer to connect them with the team.
- If the visitor asks to talk to a human, a real person, or wants someone to call or message them: respond warmly confirming you've let the team know, ask for their name and the best phone number or email to reach them on, then end your reply with the exact text [HANDOFF_REQUESTED] on its own — this is a signal for our system, the visitor will never see it.`;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, handoffActive } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "Chat isn't fully set up yet — please use the contact form, or reach us directly.",
      });
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
          generationConfig: { maxOutputTokens: 400 },
        }),
      }
    );

    if (!res.ok) {
      console.error('[Chat API] Gemini error:', await res.text());
      return NextResponse.json({
        reply: "Sorry, I'm having trouble right now — please try the contact form below.",
      });
    }

    const data = await res.json();
    let reply: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, could you rephrase that?';

    const lastUserMsg =
      [...messages].reverse().find((m: { role: string }) => m.role === 'user')?.content || '';

    const handoff = reply.includes('[HANDOFF_REQUESTED]');
    if (handoff) {
      reply = reply.replace('[HANDOFF_REQUESTED]', '').trim();
      await notifyTelegram(`💬 <b>Website chat — human requested</b>\n\n"${lastUserMsg}"`);
    } else if (handoffActive) {
      // Handoff already happened earlier in this conversation — relay every
      // message after that too, since their name/contact info likely lands here.
      await notifyTelegram(`↳ <b>Follow-up from chat</b>\n\n"${lastUserMsg}"`);
    }

    return NextResponse.json({ reply, handoff: handoff || handoffActive });
  } catch (error) {
    console.error('[Chat API]', error);
    return NextResponse.json(
      { reply: 'Something went wrong — please try the contact form below.' },
      { status: 500 }
    );
  }
}