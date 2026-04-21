"use client";
import { useState } from "react";
import { Card, Badge, PageHeader, Button } from "@/components/ui";
import { documents } from "@/lib/mock-data";
import { FileText, Image as ImageIcon, BarChart3, Map, Download, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const typeIcons: any = {
  proposal: { icon: FileText, color: "from-blue-500 to-indigo-500" },
  presentation: { icon: ImageIcon, color: "from-pink-500 to-rose-500" },
  report: { icon: BarChart3, color: "from-green-500 to-emerald-500" },
  floorplan: { icon: Map, color: "from-amber-500 to-orange-500" },
};

export default function Documents() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<string>("");

  const generateProposal = async () => {
    setGenerating(true);
    setGenerated("");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "proposal" }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setGenerated(acc);
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <PageHeader title="Документы" subtitle="Автоматическая генерация КП, презентаций и отчётов"
        actions={<Button onClick={generateProposal} disabled={generating}>
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Сгенерировать КП через AI
        </Button>}
      />

      {(generating || generated) && (
        <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/40 dark:to-purple-950/40 dark:border-indigo-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Сгенерированное КП</h3>
              <Badge variant="info">Claude Sonnet 4.5</Badge>
            </div>
            {generated && <Button variant="secondary" size="sm"><Download className="h-4 w-4" />Скачать PDF</Button>}
          </div>
          <div className="rounded-lg bg-white p-6 dark:bg-slate-900 max-h-96 overflow-y-auto">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {generated ? <ReactMarkdown>{generated}</ReactMarkdown> : <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />}
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { type: "proposal", label: "Коммерческие", count: documents.filter(d => d.type === "proposal").length },
          { type: "presentation", label: "Презентации", count: documents.filter(d => d.type === "presentation").length },
          { type: "report", label: "Отчёты", count: documents.filter(d => d.type === "report").length },
          { type: "floorplan", label: "Планировки", count: documents.filter(d => d.type === "floorplan").length },
        ].map((s) => {
          const Icon = typeIcons[s.type].icon;
          return (
            <Card key={s.type}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${typeIcons[s.type].color} mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.count}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Все документы</h3>
        <div className="space-y-2">
          {documents.map((doc) => {
            const Icon = typeIcons[doc.type].icon;
            return (
              <div key={doc.id} className="flex items-center gap-4 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800/50">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${typeIcons[doc.type].color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm truncate text-slate-900 dark:text-white">{doc.title}</div>
                    {doc.generatedBy === "AI" && <Badge variant="info"><Sparkles className="h-3 w-3 mr-1" />AI</Badge>}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{doc.project} · {doc.date} · {doc.size}</div>
                </div>
                <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
