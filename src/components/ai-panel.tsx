"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Lightbulb, Zap, FileText, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const quickActions = [
  { icon: Lightbulb, label: "Анализ", prompt: "Проанализируй текущие продажи и выяви 3 ключевые проблемы воронки" },
  { icon: FileText, label: "Создать КП", prompt: "Подготовь шаблон коммерческого предложения для премиум-клиента на квартиру 120 м² за 25 млн ₽" },
  { icon: Zap, label: "Идеи", prompt: "Дай 5 креативных идей для повышения конверсии лидов в ЖК премиум-класса" },
];

export function AIPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Привет! Я ваш AI-ассистент на базе **Claude Sonnet 4.5**.\n\nЯ вижу контекст ваших проектов и могу:\n- Анализировать продажи\n- Готовить КП и презентации\n- Давать рекомендации по маркетингу\n\nЧем помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setMessages((p) => [...p, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: newMessages.slice(0, -1) }),
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((p) => {
          const u = [...p];
          u[u.length - 1] = { role: "assistant", content: acc };
          return u;
        });
      }
    } catch {
      setMessages((p) => [...p.slice(0, -1), { role: "assistant", content: "⚠️ Ошибка. Проверьте API-ключ Claude в `.env.local`" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="flex w-96 flex-shrink-0 flex-col border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">AI-ассистент</div>
          <div className="text-[10px] text-slate-500">Claude Sonnet 4.5 · Online</div>
        </div>
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-slate-200 p-3 dark:border-slate-800">
        {quickActions.map((a) => (
          <button key={a.label} onClick={() => send(a.prompt)} disabled={loading}
            className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-950">
            <a.icon className="h-4 w-4 text-indigo-500" />
            {a.label}
          </button>
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "user"
                ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
            }`}>
              {m.content ? (
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Спросите Claude..."
            disabled={loading}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button onClick={() => send()} disabled={loading || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
