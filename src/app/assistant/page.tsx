"use client";
import { useState, useRef, useEffect } from "react";
import { Card, PageHeader } from "@/components/ui";
import { Sparkles, Send, Loader2, BarChart3, FileText, Lightbulb, Target } from "lucide-react";
import ReactMarkdown from "react-markdown";

const examples = [
  { icon: BarChart3, title: "Анализ воронки", desc: "Найди узкие места", prompt: "Проанализируй воронку продаж и найди узкие места" },
  { icon: FileText, title: "КП на премиум", desc: "Сгенерируй для клиента", prompt: "Создай КП для клиента с бюджетом 30 млн на 3-комн квартиру в премиум ЖК" },
  { icon: Lightbulb, title: "Идеи для маркетинга", desc: "Креативные подходы", prompt: "Предложи 5 нестандартных маркетинговых идей для продвижения премиум-новостройки" },
  { icon: Target, title: "Прогноз продаж", desc: "На квартал вперёд", prompt: "Сделай прогноз продаж на следующий квартал с обоснованием" },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const newM: any = [...messages, { role: "user", content: msg }];
    setMessages(newM);
    setInput("");
    setLoading(true);
    setMessages((p) => [...p, { role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/ai/stream", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: newM.slice(0, -1) }),
      });
      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((p) => { const u = [...p]; u[u.length-1] = { role: "assistant", content: acc }; return u; });
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-7rem)]">
      <PageHeader title="AI-ассистент" subtitle="Полноэкранный режим работы с Claude Sonnet 4.5" />

      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Чем могу помочь?</h2>
          <p className="text-slate-500 mb-8">Я знаю всё о ваших проектах, клиентах и кампаниях</p>
          <div className="grid grid-cols-2 gap-3 max-w-2xl w-full">
            {examples.map((ex) => (
              <button key={ex.title} onClick={() => send(ex.prompt)}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
                  <ex.icon className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">{ex.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{ex.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={ref} className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-2xl rounded-2xl px-5 py-3 ${
                m.role === "user" ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                : "bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800"
              }`}>
                {m.content ? <div className="prose prose-sm max-w-none dark:prose-invert"><ReactMarkdown>{m.content}</ReactMarkdown></div>
                : <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </div>
          ))}
        </div>
      )}

      <Card className="!p-3">
        <div className="flex gap-2">
          <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&send()}
            placeholder="Спросите Claude о ваших проектах, клиентах, продажах..."
            disabled={loading}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button onClick={()=>send()} disabled={loading || !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white disabled:opacity-50">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </Card>
    </div>
  );
}
