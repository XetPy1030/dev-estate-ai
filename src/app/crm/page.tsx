"use client";
import { Card, PageHeader, Button, Input } from "@/components/ui";
import { leads, stages } from "@/lib/mock-data";
import { formatMoney } from "@/lib/utils";
import { Search, Plus, Phone, Mail, Sparkles } from "lucide-react";

export default function CRM() {
  return (
    <div>
      <PageHeader title="Клиенты (CRM)" subtitle={`Всего лидов: ${leads.length} · Средний скоринг: ${Math.round(leads.reduce((s,l)=>s+l.score,0)/leads.length)}`}
        actions={<Button><Plus className="h-4 w-4" />Добавить клиента</Button>}
      />

      <Card className="mb-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" placeholder="Поиск по имени, email, телефону..." />
          </div>
          <Button variant="secondary"><Sparkles className="h-4 w-4 text-indigo-500" />AI-сегментация</Button>
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr className="text-left text-xs uppercase text-slate-500">
              <th className="px-4 py-3 font-medium">Клиент</th>
              <th className="px-4 py-3 font-medium">Контакты</th>
              <th className="px-4 py-3 font-medium">Проект</th>
              <th className="px-4 py-3 font-medium">Этап</th>
              <th className="px-4 py-3 font-medium">Бюджет</th>
              <th className="px-4 py-3 font-medium">AI Score</th>
              <th className="px-4 py-3 font-medium">Источник</th>
              <th className="px-4 py-3 font-medium">Контакт</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {leads.map((lead) => {
              const stage = stages.find((s) => s.id === lead.stage)!;
              return (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 text-xs font-semibold text-white">
                        {lead.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="font-medium text-sm">{lead.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.phone}</div>
                    <div className="flex items-center gap-1 mt-1"><Mail className="h-3 w-3" />{lead.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{lead.project}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`h-2 w-2 rounded-full ${stage.color}`} /><span className="text-sm">{stage.name}</span></div></td>
                  <td className="px-4 py-3 font-semibold text-indigo-600 dark:text-indigo-400">{formatMoney(lead.budget)}</td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center justify-center w-12 h-7 rounded font-bold text-xs ${
                      lead.score >= 75 ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" :
                      lead.score >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                    }`}>{lead.score}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{lead.source}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{lead.lastContact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
