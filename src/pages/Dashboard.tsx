import { BookOpen, Sparkles, Database, Calendar, Activity, Cpu, Zap, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MentraCard, MentraBadge, MentraHeading, MentraButton } from "@/components/MentraUI";
import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = [
    { label: "Knowledge Nodes", value: "1,284", icon: Database, color: "text-accent-blue", trend: "+12%" },
    { label: "Active Plans", value: "3", icon: Calendar, color: "text-emerald-500", trend: "Stable" },
    { label: "Flashcards", value: "452", icon: BookOpen, color: "text-amber-500", trend: "+5%" },
    { label: "AI Efficiency", value: "98.2%", icon: Sparkles, color: "text-accent-purple", trend: "+0.4%" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MentraBadge variant="emerald">System Online</MentraBadge>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <MentraHeading level={2} className="uppercase italic font-serif">Command Center</MentraHeading>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <p className="mono-label">Neural Load</p>
            <p className="text-sm font-bold font-mono text-accent-blue">12.4ms latency</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-right">
            <p className="mono-label">Uptime</p>
            <p className="text-sm font-bold font-mono text-emerald-500">99.99%</p>
          </div>
          <MentraButton size="sm" variant="outline" className="ml-4">
            System Logs
          </MentraButton>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <MentraCard key={i} className="group hover:border-accent-blue/30 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="mono-label mb-2 group-hover:text-text-primary transition-colors">{stat.label}</p>
                <p className="text-3xl font-bold tracking-tighter font-mono">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-500">{stat.trend}</span>
                </div>
              </div>
              <div className={cn("p-3 rounded-2xl bg-background border border-border group-hover:scale-110 transition-transform shadow-inner", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </MentraCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MentraCard className="lg:col-span-2 overflow-hidden p-0">
          <div className="px-8 py-6 flex items-center justify-between border-b border-border">
            <MentraHeading level={3} className="text-sm uppercase tracking-[0.2em] text-text-secondary">Learning Architecture</MentraHeading>
            <div className="flex gap-2 items-center">
              <Activity className="w-4 h-4 text-accent-blue animate-pulse" />
              <span className="text-[10px] font-mono text-accent-blue uppercase font-bold tracking-widest">Live Neural Stream</span>
            </div>
          </div>
          <div className="p-12 flex items-center justify-center min-h-[400px] relative">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative w-full max-w-lg">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-12"
              >
                <div className="px-8 py-3 bg-background/80 backdrop-blur-md border border-accent-blue/30 rounded-2xl shadow-2xl mentra-glow-blue">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-blue">Input: Unstructured Data</span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent to-accent-blue/50" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="p-6 bg-gradient-to-br from-accent-blue to-accent-purple rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                  >
                    <Cpu className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="w-20 h-px bg-gradient-to-l from-transparent to-accent-purple/50" />
                </div>

                <div className="grid grid-cols-3 gap-8 w-full">
                  {[
                    { label: "Flashcards", icon: Zap, color: "text-amber-500" },
                    { label: "Study Plans", icon: Calendar, color: "text-emerald-500" },
                    { label: "Knowledge", icon: Database, color: "text-accent-blue" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div className="w-px h-10 bg-gradient-to-b from-border to-transparent" />
                      <div className="p-4 bg-background/50 backdrop-blur-sm border border-border rounded-2xl flex flex-col items-center gap-3 w-full hover:border-accent-blue/50 transition-all hover:-translate-y-1">
                        <item.icon className={cn("w-4 h-4", item.color)} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </MentraCard>

        <div className="space-y-6 flex flex-col">
          <MentraCard className="bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 border-accent-blue/20">
            <MentraHeading level={4} className="text-xs uppercase tracking-widest text-text-secondary mb-4">Security Protocol</MentraHeading>
            <div className="flex items-center gap-4 p-5 bg-background/40 backdrop-blur-md border border-emerald-500/20 rounded-2xl">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Neural Shield Active</p>
                <p className="text-[10px] text-text-secondary mt-1">End-to-end encryption verified</p>
              </div>
            </div>
          </MentraCard>

          <MentraCard className="flex-1 p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-white/[0.02]">
              <MentraHeading level={4} className="text-xs uppercase tracking-widest text-text-secondary">System Logs</MentraHeading>
            </div>
            <div className="divide-y divide-border/50 max-h-[300px] overflow-y-auto">
              {[
                { time: "14:22:01", msg: "Extraction complete: 'Bio 101'", type: "info" },
                { time: "14:15:45", msg: "Flashcards generated (42 cards)", type: "success" },
                { time: "13:58:12", msg: "Neural weights optimized", type: "system" },
                { time: "13:45:30", msg: "Study plan: 'Final Exam Prep'", type: "info" },
                { time: "13:30:15", msg: "Memory cache purged", type: "system" },
              ].map((log, i) => (
                <div key={i} className="px-6 py-4 flex gap-4 text-[10px] font-mono hover:bg-white/[0.02] transition-colors">
                  <span className="text-text-secondary shrink-0">{log.time}</span>
                  <span className={cn(
                    "shrink-0 font-bold px-1.5 py-0.5 rounded bg-white/5",
                    log.type === "success" ? "text-emerald-500" : 
                    log.type === "system" ? "text-accent-purple" : "text-accent-blue"
                  )}>{log.type.toUpperCase()}</span>
                  <span className="text-text-secondary truncate">{log.msg}</span>
                </div>
              ))}
            </div>
          </MentraCard>
        </div>
      </div>
    </div>
  );
}
