import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

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
  const { type } = await req.json();
  const prompt = PROMPTS[type] || PROMPTS.proposal;

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-5",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
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
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
