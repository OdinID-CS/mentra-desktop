import { BookOpen, LayoutDashboard, PenTool, Upload, Sparkles, MessageSquare, Terminal, Cpu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="w-[240px] bg-background text-text-primary h-full flex flex-col border-r border-border shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight uppercase">Mentra OS</h1>
            <span className="text-[8px] font-mono text-text-secondary uppercase tracking-[0.2em]">Neural Learning Engine</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <div className="px-3 mb-2">
          <span className="mono-label opacity-50">Core Modules</span>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[11px] font-bold uppercase tracking-wider",
              activeTab === item.id
                ? "bg-accent-muted text-accent border border-accent/20"
                : "text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent"
            )}
          >
            <item.icon className={cn("w-3.5 h-3.5", activeTab === item.id ? "text-accent" : "text-text-secondary")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-4">
        <div className="p-4 bg-surface/50 rounded-xl border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="mono-label">Neural Sync</span>
            <span className="text-[9px] font-mono text-accent">72%</span>
          </div>
          <div className="h-1 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-accent w-[72%] shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Terminate Link</span>
        </button>
      </div>
    </div>
  );
}
