"use client";
import { PageHeader, Button } from "@/components/ui";
import { leads, stages } from "@/lib/mock-data";
import { formatMoney } from "@/lib/utils";
import { Phone, Mail, Sparkles } from "lucide-react";

export default function Sales() {
  return (
    <div>
      <PageHeader title="Продажи" subtitle="AI Sales Engine · Управление воронкой и сделками"
        actions={<Button variant="secondary"><Sparkles className="h-4 w-4 text-indigo-500" />AI-рекомендации</Button>}
      />

      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id);
          const total = stageLeads.reduce((s, l) => s + l.budget, 0);
          return (
            <div key={stage.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{stage.name}</span>
                  <span className="text-xs text-slate-500">{stageLeads.length}</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-2 px-1">Σ {formatMoney(total)}</div>
              <div className="flex-1 space-y-2 rounded-xl bg-slate-100 p-2 dark:bg-slate-900/50 min-h-[400px]">
                {stageLeads.map((lead) => (
                  <div key={lead.id} className="rounded-lg bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:bg-slate-800">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{lead.name}</div>
                      <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        lead.score >= 75 ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" :
                        lead.score >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                        "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                      }`}>
                        {lead.score}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mb-2 truncate">{lead.project}</div>
                    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{formatMoney(lead.budget)}</div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <Mail className="h-3 w-3" />
                      </div>
                      <span>{lead.lastContact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
