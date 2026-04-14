import { BookOpen, LayoutDashboard, PenTool, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "flashcards", label: "Flashcards", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: PenTool },
  ];

  return (
    <div className="w-[280px] bg-background text-text-primary h-full flex flex-col border-r border-border shrink-0">
      <div className="p-5">
        <div className="card border-accent/30 p-4 bg-background rounded-lg">
          <div className="card-title-theme">System Health</div>
          <div className="text-[11px] flex justify-between mb-1">
            <span className="text-text-secondary">Payload Size</span>
            <span className="text-emerald-500 font-mono">12.4 MB</span>
          </div>
          <div className="text-[11px] flex justify-between">
            <span className="text-text-secondary">IPC Latency</span>
            <span className="text-emerald-500 font-mono">0.2ms</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 rounded transition-all duration-150 text-sm font-medium",
              activeTab === item.id
                ? "bg-accent text-white"
                : "text-text-secondary hover:bg-surface hover:text-text-primary"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded text-text-secondary hover:bg-surface hover:text-text-primary transition-all text-sm font-medium">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
