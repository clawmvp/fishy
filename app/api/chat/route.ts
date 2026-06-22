import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildKnowledgeBase } from "@/lib/chat-knowledge";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const client = new Anthropic();

let cachedKB: string | null = null;
function kb(): string {
  if (!cachedKB) cachedKB = buildKnowledgeBase();
  return cachedKB;
}

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.messages)) {
    return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
  }
  const messages = body.messages as Message[];
  if (messages.length === 0 || messages.length > 30) {
    return new Response(JSON.stringify({ error: "messages 1-30" }), { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: kb(),
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of response) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (e) {
        controller.enqueue(encoder.encode(`\n\n[Eroare: ${(e as Error).message}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
