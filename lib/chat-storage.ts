import { sql } from "./db";

export type ChatMessage = { id: number; role: "user" | "assistant"; content: string; created_at: string };
export type ChatConversation = {
  id: number;
  title: string | null;
  created_at: string;
  updated_at: string;
  message_count?: number;
  preview?: string;
};

export async function createConversation(userId: number, firstUserMessage: string): Promise<number> {
  const title = firstUserMessage.slice(0, 80).replace(/\s+/g, " ").trim();
  const rows = await sql`
    INSERT INTO fishy_beacon.chat_conversations (user_id, title)
    VALUES (${userId}, ${title})
    RETURNING id
  `;
  return rows[0].id as number;
}

export async function appendMessage(conversationId: number, role: "user" | "assistant", content: string): Promise<void> {
  await sql`
    INSERT INTO fishy_beacon.chat_messages (conversation_id, role, content)
    VALUES (${conversationId}, ${role}, ${content})
  `;
  await sql`UPDATE fishy_beacon.chat_conversations SET updated_at = NOW() WHERE id = ${conversationId}`;
}

export async function getConversationMessages(userId: number, conversationId: number): Promise<ChatMessage[]> {
  const ownership = await sql`SELECT 1 FROM fishy_beacon.chat_conversations WHERE id = ${conversationId} AND user_id = ${userId} LIMIT 1`;
  if (ownership.length === 0) return [];
  const rows = await sql`
    SELECT id, role, content, created_at FROM fishy_beacon.chat_messages
    WHERE conversation_id = ${conversationId}
    ORDER BY created_at ASC, id ASC
  `;
  return rows as ChatMessage[];
}

export async function listConversations(userId: number, limit: number = 20): Promise<ChatConversation[]> {
  const rows = await sql`
    SELECT c.id, c.title, c.created_at, c.updated_at,
           (SELECT COUNT(*) FROM fishy_beacon.chat_messages WHERE conversation_id = c.id) as message_count,
           (SELECT content FROM fishy_beacon.chat_messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as preview
    FROM fishy_beacon.chat_conversations c
    WHERE c.user_id = ${userId}
    ORDER BY c.updated_at DESC
    LIMIT ${limit}
  `;
  return rows as ChatConversation[];
}

export async function deleteConversation(userId: number, conversationId: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM fishy_beacon.chat_conversations
    WHERE id = ${conversationId} AND user_id = ${userId}
    RETURNING id
  `;
  return rows.length > 0;
}
