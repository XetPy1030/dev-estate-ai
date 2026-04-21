"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, TrendingUp, Megaphone, BarChart3, Users, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { name: "Дашборд", href: "/", icon: LayoutDashboard },
  { name: "Проекты", href: "/projects", icon: Building2 },
  { name: "Продажи", href: "/sales", icon: TrendingUp },
  { name: "Маркетинг", href: "/marketing", icon: Megaphone },
  { name: "Аналитика", href: "/analytics", icon: BarChart3 },
  { name: "Клиенты (CRM)", href: "/crm", icon: Users },
  { name: "Документы", href: "/documents", icon: FileText },
  { name: "AI-ассистент", href: "/assistant", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">DevEstate <span className="text-indigo-500">AI</span></div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Operating System</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/30"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-400 text-sm font-semibold text-white">ИП</div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">Иван Петров</p>
            <p className="text-xs text-slate-500">Директор</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
