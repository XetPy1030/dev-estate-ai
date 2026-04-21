"use client";
import { useState } from "react";
import { Card, PageHeader, Button } from "@/components/ui";
import { revenueData, channelData, funnelData } from "@/lib/mock-data";
import { Sparkles, Upload, Loader2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import ReactMarkdown from "react-markdown";

const performanceData = [
  { metric: "Конверсия", current: 78, target: 100 },
  { metric: "Скорость", current: 65, target: 100 },
  { metric: "Качество лидов", current: 82, target: 100 },
  { metric: "ROI", current: 91, target: 100 },
  { metric: "Удержание", current: 70, target: 100 },
];

export default function Analytics() {
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    setLoading(true);
    setAiAnalysis("");
    try {
      const res = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Проанализируй данные продаж и маркетинга:
Выручка по месяцам: ${JSON.stringify(revenueData)}
Источники лидов: ${JSON.stringify(channelData)}
Воронка: ${JSON.stringify(funnelData)}

Дай 5 ключевых инсайтов в формате Markdown с цифрами и конкретными рекомендациями.`,
        }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setAiAnalysis(acc);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Аналитика" subtitle="AI Analytics Engine · Глубокий анализ данных"
        actions={<>
          <Button variant="secondary"><Upload className="h-4 w-4" />Загрузить Excel</Button>
          <Button onClick={runAI} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            AI-анализ
          </Button>
        </>}
      />

      {(loading || aiAnalysis) && (
        <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/40 dark:to-purple-950/40 dark:border-indigo-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white">AI-анализ от Claude Sonnet 4.5</h3>
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {aiAnalysis ? <ReactMarkdown>{aiAnalysis}</ReactMarkdown> : <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Динамика выручки</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} name="Факт" />
              <Line type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 5" name="Прогноз" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Эффективность по метрикам</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar name="Текущее" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Лиды по источникам</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
