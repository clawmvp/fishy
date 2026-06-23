import { NextRequest } from "next/server";
import OpenAI from "openai";
import { buildKnowledgeBase } from "@/lib/chat-knowledge";
import { buildLiveContext } from "@/lib/chat-live-context";
import { getActiveSession } from "@/lib/auth";
import { createConversation, appendMessage, getConversationMessages } from "@/lib/chat-storage";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function getClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY not set");
  return new OpenAI({ apiKey, baseURL: "https://api.deepseek.com/v1" });
}

let cachedKB: string | null = null;
function kb(): string {
  if (!cachedKB) cachedKB = buildKnowledgeBase();
  return cachedKB;
}

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  if (!rateLimit(`chat:${clientIp(req)}`, 20, 60 * 1000)) {
    return new Response(JSON.stringify({ error: "Prea multe mesaje. Așteaptă un minut." }), { status: 429 });
  }
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.messages)) {
    return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
  }
  const clientMessages = body.messages as Message[];
  if (clientMessages.length === 0 || clientMessages.length > 100) {
    return new Response(JSON.stringify({ error: "messages 1-100" }), { status: 400 });
  }
  const user = await getActiveSession();
  const inputConvId = typeof body.conversationId === "number" ? body.conversationId : null;

  let messages = clientMessages;
  let conversationId = inputConvId;
  const lastUserMsg = clientMessages[clientMessages.length - 1];

  if (user && lastUserMsg?.role === "user") {
    if (inputConvId) {
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
      if (conversationId) {
        controller.enqueue(encoder.encode(`__META__${JSON.stringify({ conversationId })}__END__`));
      }
      try {
        const liveCtx = await buildLiveContext();
        const completion = await getClient().chat.completions.create({
          model: "deepseek-chat",
          stream: true,
          temperature: 0.4,
          max_tokens: 1500,
          messages: [
            { role: "system", content: kb() },
            { role: "system", content: liveCtx },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        });

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            assistantAccum += delta;
            controller.enqueue(encoder.encode(delta));
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
