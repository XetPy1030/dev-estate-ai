"use client";
import { Card, Badge, PageHeader, Button } from "@/components/ui";
import { campaigns } from "@/lib/mock-data";
import { formatMoney } from "@/lib/utils";
import { Plus, Sparkles, TrendingUp, MousePointerClick, Users, DollarSign } from "lucide-react";

export default function Marketing() {
  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0);
  const totalLeads = campaigns.reduce((s, c) => s + c.leads, 0);
  const totalConv = campaigns.reduce((s, c) => s + c.conversions, 0);
  const formatThousands = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div>
      <PageHeader title="Маркетинг" subtitle="AI Marketing Engine · Управление рекламными кампаниями"
        actions={<>
          <Button variant="secondary"><Sparkles className="h-4 w-4 text-indigo-500" />AI генерация креатива</Button>
          <Button><Plus className="h-4 w-4" />Новая кампания</Button>
        </>}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Бюджет общий", value: formatMoney(totalBudget), icon: DollarSign, color: "from-blue-500 to-indigo-500" },
          { label: "Потрачено", value: formatMoney(totalSpent), icon: TrendingUp, color: "from-violet-500 to-purple-500" },
          { label: "Лидов привлечено", value: totalLeads.toString(), icon: Users, color: "from-amber-500 to-orange-500" },
          { label: "Конверсий", value: totalConv.toString(), icon: MousePointerClick, color: "from-green-500 to-emerald-500" },
        ].map((s) => (
          <Card key={s.label}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} mb-3`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Активные кампании</h3>
        <div className="space-y-2">
          {campaigns.map((c) => {
            const progress = (c.spent / c.budget) * 100;
            const cpl = c.leads > 0 ? Math.round(c.spent / c.leads) : 0;
            return (
              <div key={c.id} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium flex items-center gap-2 text-slate-900 dark:text-white">
                      {c.name}
                      <Badge variant={c.status === "active" ? "success" : "warning"}>{c.status === "active" ? "Активна" : "Пауза"}</Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{c.channel} · {c.project}</div>
                  </div>
                  <div className="flex gap-6 text-right text-sm">
                    <div><div className="text-xs text-slate-500">CTR</div><div className="font-semibold text-slate-900 dark:text-white">{c.ctr}%</div></div>
                    <div><div className="text-xs text-slate-500">Лиды</div><div className="font-semibold text-slate-900 dark:text-white">{c.leads}</div></div>
                    <div><div className="text-xs text-slate-500">CPL</div><div className="font-semibold text-slate-900 dark:text-white">₽ {formatThousands(cpl)}</div></div>
                    <div><div className="text-xs text-slate-500">Конверсии</div><div className="font-semibold text-green-600">{c.conversions}</div></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap">
                    {formatMoney(c.spent)} / {formatMoney(c.budget)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
