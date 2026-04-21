"use client";
import { Card, Badge, Button, PageHeader } from "@/components/ui";
import { projects } from "@/lib/mock-data";
import { formatMoney } from "@/lib/utils";
import { Plus, MapPin, Building2, TrendingUp } from "lucide-react";

export default function Projects() {
  return (
    <div>
      <PageHeader
        title="Проекты" subtitle={`Активных: ${projects.filter(p => p.status === "active").length} · В планировании: ${projects.filter(p => p.status === "planning").length}`}
        actions={<Button><Plus className="h-4 w-4" />Новый проект</Button>}
      />
      <div className="grid grid-cols-2 gap-5">
        {projects.map((p) => (
          <Card key={p.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-3xl dark:from-indigo-950 dark:to-purple-950">
                {p.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">{p.name}</h3>
                  <Badge variant={p.status === "active" ? "success" : "warning"}>
                    {p.status === "active" ? "Активный" : "Планирование"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <MapPin className="h-3 w-3" />{p.location}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{p.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-1"><Building2 className="h-3 w-3" />Юниты</div>
                <div className="text-sm font-semibold mt-0.5 text-slate-900 dark:text-white">{p.soldUnits}/{p.totalUnits}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-1"><TrendingUp className="h-3 w-3" />Выручка</div>
                <div className="text-sm font-semibold mt-0.5 text-slate-900 dark:text-white">{formatMoney(p.revenue)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Готовность</div>
                <div className="text-sm font-semibold mt-0.5 text-slate-900 dark:text-white">{p.completion}%</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${p.completion}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                <span>{p.startSales}</span>
                <span>{p.endSales}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
