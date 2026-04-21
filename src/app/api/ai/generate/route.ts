import { NextRequest } from "next/server";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.5";

const PROMPTS: Record<string, string> = {
  proposal: `Создай профессиональное коммерческое предложение в формате Markdown для клиента:

Клиент: Анна Соколова, бюджет 18 млн ₽, ищет квартиру для семьи с двумя детьми
Объект: ЖК «Северная Звезда», Москва СЗАО
- 3-комнатная квартира 95 м² на 18 этаже
- Цена: 17.5 млн ₽
- Панорамные окна, видовая, отделка «под ключ"
- Сдача — Q4 2026

Структура КП:
1. Персональное обращение
2. Почему именно этот объект подходит клиенту
3. Описание квартиры и преимущества проекта
4. Финансовые условия (рассрочка, ипотека от партнёров)
5. Призыв к действию и контакты

Тон: профессиональный, тёплый, убедительный.`,
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("OPENROUTER_API_KEY is not set", { status: 500 });
  }

  const { type } = await req.json();
  const prompt = PROMPTS[type] || PROMPTS.proposal;

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
      max_tokens: 3000,
      temperature: 0.6,
      messages: [{ role: "user", content: prompt }],
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
