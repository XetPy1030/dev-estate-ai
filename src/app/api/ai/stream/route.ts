import { NextRequest } from "next/server";

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

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.5";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("OPENROUTER_API_KEY is not set", { status: 500 });
  }

  const { message, history = [] } = await req.json();

  const messages = [
    { role: "system", content: SYSTEM },
    ...history
      .filter((m: any) => m.content && (m.role === "user" || m.role === "assistant"))
      .map((m: any) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "DevEstate AI",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      max_tokens: 2048,
      temperature: 0.6,
      messages,
    }),
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => "");
    return new Response(`OpenRouter error: ${response.status} ${text}`, { status: 500 });
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  let buffer = "";
  const readable = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.replace(/^data:\s*/, "");
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // Ignore non-JSON SSE lines
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
