import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { AIPanel } from "@/components/ai-panel";

export const metadata: Metadata = {
  title: "DevEstate AI — Operating System for Developers",
  description: "AI-powered platform for real estate developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
          <AIPanel />
        </div>
      </body>
    </html>
  );
}
