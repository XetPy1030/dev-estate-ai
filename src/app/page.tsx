"use client";
import { Card, Badge, PageHeader } from "@/components/ui";
import { TrendingUp, TrendingDown, Users, Target, AlertTriangle, DollarSign, ArrowUpRight } from "lucide-react";
import { revenueData, funnelData, aiInsights, channelData } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Дашборд" subtitle="Оперативная сводка по бизнесу · Понедельник, 20 апреля 2026" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { title: "Выручка за месяц", value: "₽ 124.5M", change: "+12.3%", trend: "up", icon: DollarSign, color: "from-green-500 to-emerald-500" },
          { title: "Активные лиды", value: "847", change: "+5.2%", trend: "up", icon: Users, color: "from-blue-500 to-indigo-500" },
          { title: "Конверсия", value: "3.8%", change: "-0.4%", trend: "down", icon: Target, color: "from-amber-500 to-orange-500" },
          { title: "Риски", value: "3", change: "требуют внимания", trend: "warning", icon: AlertTriangle, color: "from-red-500 to-pink-500" },
        ].map((kpi) => (
          <Card key={kpi.title}>
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <kpi.icon className="h-5 w-5 text-white" />
              </div>
              <Badge variant={kpi.trend === "up" ? "success" : kpi.trend === "down" ? "danger" : "warning"}>
                {kpi.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                {kpi.trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
                {kpi.change}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</div>
              <div className="text-xs text-slate-500 mt-1">{kpi.title}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/40 dark:to-purple-950/40 dark:border-indigo-800">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">✨</span>
          <h2 className="font-semibold text-slate-900 dark:text-white">AI-инсайты на сегодня</h2>
          <Badge variant="info">Обновлено 5 мин назад</Badge>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {aiInsights.map((ins, i) => (
            <div key={i} className="rounded-lg bg-white p-4 dark:bg-slate-900">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">{ins.icon}</span>
                <h3 className="font-medium text-sm text-slate-900 dark:text-white flex-1">{ins.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{ins.description}</p>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 dark:text-indigo-400">
                {ins.action} <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Выручка и прогноз</h3>
            <Badge variant="info">млн ₽</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#r1)" name="Факт" />
              <Area type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 5" fill="url(#r2)" name="Прогноз" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Источники лидов</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={channelData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                {channelData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Воронка продаж</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={funnelData} layout="vertical">
            <XAxis type="number" stroke="#94a3b8" fontSize={12} />
            <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={12} width={140} />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {funnelData.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
