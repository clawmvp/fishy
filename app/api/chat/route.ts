import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildKnowledgeBase } from "@/lib/chat-knowledge";
import { getSession } from "@/lib/auth";
import { createConversation, appendMessage, getConversationMessages } from "@/lib/chat-storage";

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
  const clientMessages = body.messages as Message[];
  if (clientMessages.length === 0 || clientMessages.length > 100) {
    return new Response(JSON.stringify({ error: "messages 1-100" }), { status: 400 });
  }
  const user = await getSession();
  const inputConvId = typeof body.conversationId === "number" ? body.conversationId : null;

  // Build full message list with persisted history if conversation exists
  let messages = clientMessages;
  let conversationId = inputConvId;
  const lastUserMsg = clientMessages[clientMessages.length - 1];

  if (user && lastUserMsg?.role === "user") {
    if (inputConvId) {
      // Load history from DB for context
      const history = await getConversationMessages(user.id, inputConvId);
      if (history.length > 0) {
        messages = [
          ...history.map((m) => ({ role: m.role, content: m.content })),
          lastUserMsg,
        ];
      }
      await appendMessage(inputConvId, "user", lastUserMsg.content);
    } else {
      conversationId = await createConversation(user.id, lastUserMsg.content);
      await appendMessage(conversationId, "user", lastUserMsg.content);
    }
  }

  const encoder = new TextEncoder();
  let assistantAccum = "";

  const stream = new ReadableStream({
    async start(controller) {
      // Emit metadata first (conversation id for client)
      if (conversationId) {
        controller.enqueue(encoder.encode(`__META__${JSON.stringify({ conversationId })}__END__`));
      }
      try {
        const response = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1500,
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
            assistantAccum += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        if (user && conversationId && assistantAccum) {
          await appendMessage(conversationId, "assistant", assistantAccum);
        }
        controller.close();
      } catch (e) {
        const errMsg = `\n\n[Eroare: ${(e as Error).message}]`;
        controller.enqueue(encoder.encode(errMsg));
        if (user && conversationId && assistantAccum) {
          await appendMessage(conversationId, "assistant", assistantAccum + errMsg);
        }
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
