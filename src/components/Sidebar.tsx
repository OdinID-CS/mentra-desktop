import { BookOpen, LayoutDashboard, PenTool, Settings, Upload, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "knowledge", label: "Knowledge Engine", icon: Upload },
    { id: "flashcards", label: "Flashcards", icon: BookOpen },
    { id: "planner", label: "Study Planner", icon: PenTool },
    { id: "assignments", label: "Assignment Explainer", icon: Sparkles },
  ];

  return (
    <div className="w-[280px] bg-background text-text-primary h-full flex flex-col border-r border-border shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Mentra</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
              activeTab === item.id
                ? "bg-accent text-white shadow-md shadow-accent/10"
                : "text-text-secondary hover:bg-surface hover:text-text-primary"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="p-4 bg-surface rounded-xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Storage</span>
            <span className="text-[10px] font-mono text-accent">72%</span>
          </div>
          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-accent w-[72%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
