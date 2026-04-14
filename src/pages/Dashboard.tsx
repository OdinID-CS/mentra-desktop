import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, PenTool, Sparkles, TrendingUp, Database, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const stats = [
    { label: "Knowledge Nodes", value: "1,284", icon: Database, color: "text-accent" },
    { label: "Active Plans", value: "3", icon: Calendar, color: "text-emerald-500" },
    { label: "Flashcards", value: "452", icon: BookOpen, color: "text-amber-500" },
    { label: "AI Efficiency", value: "98.2%", icon: Sparkles, color: "text-purple-500" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mentra Command Center</h2>
          <p className="text-text-secondary text-sm">Structured Learning System Active</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Neural Engine Online</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-background border-border hover:border-accent/40 transition-colors rounded-lg">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              </div>
              <stat.icon className={cn("w-5 h-5 opacity-80", stat.color)} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-background border-border rounded-lg overflow-hidden">
          <CardHeader className="px-4 pt-4 border-b border-border">
            <div className="card-title-theme">Learning Architecture</div>
          </CardHeader>
          <CardContent className="p-8 flex items-center justify-center min-h-[300px] bg-surface/20">
            <div className="relative w-full max-w-md">
              <div className="flex flex-col items-center gap-12">
                <div className="px-6 py-3 bg-accent/10 border border-accent/30 rounded-lg text-accent font-mono text-xs z-10">
                  RAW DATA (NOTES)
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-emerald-500/50" />
                <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-500 font-mono text-xs z-10">
                  MENTRA KNOWLEDGE ENGINE
                </div>
                <div className="w-full flex justify-between gap-4 mt-[-24px]">
                  <div className="flex-1 flex flex-col items-center gap-4">
                    <div className="w-px h-12 bg-emerald-500/30" />
                    <div className="px-4 py-2 bg-background border border-border rounded text-[10px] text-text-secondary font-mono">
                      FLASHCARDS
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-4">
                    <div className="w-px h-12 bg-emerald-500/30" />
                    <div className="px-4 py-2 bg-background border border-border rounded text-[10px] text-text-secondary font-mono">
                      STUDY PLANS
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-4">
                    <div className="w-px h-12 bg-emerald-500/30" />
                    <div className="px-4 py-2 bg-background border border-border rounded text-[10px] text-text-secondary font-mono">
                      EXPLANATIONS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg">
          <CardHeader className="px-4 pt-4 border-b border-border">
            <div className="card-title-theme">System Logs</div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {[
                { time: "14:22:01", msg: "Knowledge extraction complete: 'Bio 101'", type: "info" },
                { time: "14:15:45", msg: "Flashcard set generated (42 cards)", type: "success" },
                { time: "13:58:12", msg: "Neural weights optimized", type: "system" },
                { time: "13:45:30", msg: "Study plan created: 'Final Exam Prep'", type: "info" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-[11px] font-mono">
                  <span className="text-text-secondary shrink-0">{log.time}</span>
                  <span className={cn(
                    "shrink-0",
                    log.type === "success" ? "text-emerald-500" : 
                    log.type === "system" ? "text-accent" : "text-text-primary"
                  )}>[{log.type.toUpperCase()}]</span>
                  <span className="text-text-secondary truncate">{log.msg}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
