import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEM = `Ты — AI-ассистент DevEstate AI, операционной системы для девелоперов недвижимости.
Помогаешь команде: руководителям, менеджерам по продажам, маркетологам.

Контекст компании (используй эти данные в ответах):
- 4 проекта: ЖК «Северная Звезда» (Москва, 248 юнитов, 67% продано), Резиденция «Парк Авеню» (СПб, 124 юнита), Квартал «Новый Горизонт» (Казань, 412 юнитов), Loft «Промзона» (Екб, в планировании)
- Выручка за месяц: 124.5M₽ (+12.3%)
- 847 активных лидов, конверсия 3.8%
- Топ-источники лидов: Яндекс.Директ (412), Meta Ads (234), Google Ads (156)

Стиль:
- Кратко, структурированно (Markdown)
- На русском
- С конкретными цифрами и рекомендациями
- Используй заголовки ##, списки и **жирный текст**`;

export async function POST(req: NextRequest) {
  const { message, history = [] } = await req.json();

  const messages = [
    ...history.filter((m: any) => m.content).map((m: any) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-5",
    max_tokens: 2048,
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
