import { BookOpen, LayoutDashboard, PenTool, Upload, Sparkles, MessageSquare, Terminal, Cpu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { MentraBadge } from "./MentraUI";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "knowledge", label: "Knowledge Engine", icon: Cpu },
    { id: "flashcards", label: "Flashcards", icon: BookOpen },
    { id: "planner", label: "Study Planner", icon: PenTool },
    { id: "assignments", label: "Assignment Explainer", icon: Sparkles },
    { id: "chat", label: "Neural Link", icon: Terminal },
  ];

  return (
    <div className="w-[260px] bg-surface text-text-primary h-full flex flex-col border-r border-border shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold tracking-tight uppercase italic font-serif">Mentra OS</h1>
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">Neural Engine</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        <div className="px-4 mb-3">
          <span className="mono-label opacity-40">Core Modules</span>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[11px] font-bold uppercase tracking-wider",
              activeTab === item.id
                ? "bg-accent-blue/10 text-accent-blue border border-accent-blue/20 shadow-inner"
                : "text-text-secondary hover:bg-white/[0.03] hover:text-text-primary border border-transparent"
            )}
          >
            <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-accent-blue" : "text-text-secondary")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-border space-y-6">
        <div className="p-5 bg-background/50 rounded-2xl border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="mono-label">Neural Sync</span>
            <MentraBadge variant="blue">72%</MentraBadge>
          </div>
          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent-blue to-accent-purple w-[72%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all border border-transparent hover:border-red-400/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminate Link</span>
        </button>
      </div>
    </div>
  );
}
