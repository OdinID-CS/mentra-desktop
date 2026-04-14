import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Calendar, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { BackendService } from "@/services/backendService";
import { StudyPlan } from "@/services/aiService";
import { motion, AnimatePresence } from "framer-motion";

export default function StudyPlanner() {
  const [topic, setTopic] = useState("");
  const [timeframe, setTimeframe] = useState("1 week");
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const result = await BackendService.generateStudyPlan(topic, timeframe);
      setPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto h-full flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <Card className="bg-background border-border rounded-lg">
          <CardHeader className="px-4 pt-4">
            <div className="card-title-theme">Plan Parameters</div>
          </CardHeader>
          <CardContent className="px-4 pb-4 flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Topic / Subject</label>
              <Input 
                placeholder="e.g. Quantum Mechanics, Organic Chemistry..."
                className="bg-surface border-border focus:border-accent text-xs"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="w-48 space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Timeframe</label>
              <Input 
                placeholder="e.g. 3 days, 1 month..."
                className="bg-surface border-border focus:border-accent text-xs"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
                className="bg-accent hover:bg-accent/90 text-white gap-2 text-xs font-bold uppercase tracking-wider px-6"
              >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Calendar className="w-3 h-3" />}
                Generate Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 overflow-hidden">
        <Card className="bg-background border-border h-full flex flex-col rounded-lg overflow-hidden">
          <CardHeader className="px-4 pt-4 border-b border-border">
            <div className="card-title-theme flex items-center gap-2">
              <ListTodo className="w-3.5 h-3.5" />
              Structured Learning Roadmap
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden bg-surface/30">
            <ScrollArea className="h-full">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {plan ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-text-primary">{plan.title}</h3>
                        <p className="text-xs text-text-secondary mt-1">AI-Optimized Study Schedule</p>
                      </div>

                      <div className="space-y-4">
                        {plan.phases.map((phase, i) => (
                          <div key={i} className="relative pl-8 border-l border-border pb-8 last:pb-0">
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-bold text-text-primary">{phase.name}</h4>
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-secondary bg-background px-2 py-1 rounded border border-border">
                                <Clock className="w-3 h-3" />
                                {phase.duration}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {phase.tasks.map((task, j) => (
                                <div key={j} className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg group hover:border-accent/30 transition-colors">
                                  <CheckCircle2 className="w-4 h-4 text-text-secondary group-hover:text-emerald-500 transition-colors mt-0.5 shrink-0" />
                                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-text-secondary text-center px-10">
                      <Calendar className="w-12 h-12 mb-4 opacity-10" />
                      <p className="text-xs font-mono">Define your topic and timeframe to generate a structured study roadmap.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
