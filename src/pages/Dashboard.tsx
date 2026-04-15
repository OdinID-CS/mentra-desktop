import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Sparkles, Database, Calendar, Activity, Cpu, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const stats = [
    { label: "Knowledge Nodes", value: "1,284", icon: Database, color: "text-accent" },
    { label: "Active Plans", value: "3", icon: Calendar, color: "text-emerald-500" },
    { label: "Flashcards", value: "452", icon: BookOpen, color: "text-amber-500" },
    { label: "AI Efficiency", value: "98.2%", icon: Sparkles, color: "text-purple-500" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="mono-label opacity-50">System Status</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight uppercase italic font-serif">Command Center</h2>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="mono-label">Neural Load</p>
            <p className="text-xs font-bold font-mono text-accent">12.4ms latency</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-right">
            <p className="mono-label">Uptime</p>
            <p className="text-xs font-bold font-mono text-emerald-500">99.99%</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-surface/30 border-border hover:border-accent/40 transition-all duration-300 group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="mono-label mb-1 group-hover:text-text-primary transition-colors">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tighter font-mono">{stat.value}</p>
              </div>
              <div className={cn("p-2 rounded-lg bg-background border border-border group-hover:scale-110 transition-transform", stat.color)}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-surface/30 border-border overflow-hidden">
          <CardHeader className="px-6 pt-6 flex flex-row items-center justify-between border-b border-border/50">
            <div className="card-title-theme mb-0">Learning Architecture</div>
            <div className="flex gap-2">
              <Activity className="w-3 h-3 text-accent animate-pulse" />
              <span className="text-[8px] font-mono text-accent uppercase font-bold">Live Stream</span>
            </div>
          </CardHeader>
          <CardContent className="p-12 flex items-center justify-center min-h-[350px] relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative w-full max-w-lg">
              <div className="flex flex-col items-center gap-10">
                <div className="px-6 py-2 bg-background border border-border rounded-md shadow-xl">
                  <span className="mono-label text-accent">Input: Unstructured Data</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
                  <div className="p-4 bg-accent rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
                </div>

                <div className="grid grid-cols-3 gap-6 w-full">
                  {[
                    { label: "Flashcards", icon: Zap },
                    { label: "Study Plans", icon: Calendar },
                    { label: "Knowledge", icon: Database }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-px h-8 bg-border" />
                      <div className="p-3 bg-background border border-border rounded-xl flex flex-col items-center gap-2 w-full hover:border-accent/50 transition-colors">
                        <item.icon className="w-3 h-3 text-text-secondary" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-surface/30 border-border">
            <CardHeader className="px-6 pt-6">
              <div className="card-title-theme">Security Protocol</div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Neural Shield Active</p>
                  <p className="text-[10px] text-text-secondary">End-to-end encryption verified</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface/30 border-border flex-1">
            <CardHeader className="px-6 pt-6 border-b border-border/50">
              <div className="card-title-theme mb-0">System Logs</div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50 max-h-[200px] overflow-y-auto">
                {[
                  { time: "14:22:01", msg: "Extraction complete: 'Bio 101'", type: "info" },
                  { time: "14:15:45", msg: "Flashcards generated (42 cards)", type: "success" },
                  { time: "13:58:12", msg: "Neural weights optimized", type: "system" },
                  { time: "13:45:30", msg: "Study plan: 'Final Exam Prep'", type: "info" },
                ].map((log, i) => (
                  <div key={i} className="px-6 py-3 flex gap-3 text-[10px] font-mono hover:bg-white/[0.02] transition-colors">
                    <span className="text-text-secondary shrink-0">{log.time}</span>
                    <span className={cn(
                      "shrink-0 font-bold",
                      log.type === "success" ? "text-emerald-500" : 
                      log.type === "system" ? "text-accent" : "text-text-primary"
                    )}>{log.type.toUpperCase()}</span>
                    <span className="text-text-secondary truncate">{log.msg}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
