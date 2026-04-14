import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Sparkles, MessageSquare, Lightbulb, FileSearch } from "lucide-react";
import { BackendService } from "@/services/backendService";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export default function AssignmentExplainer() {
  const [assignment, setAssignment] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!assignment.trim()) return;
    setLoading(true);
    try {
      const result = await BackendService.explainAssignment(assignment);
      setExplanation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
        <div className="flex flex-col space-y-4">
          <Card className="bg-background border-border flex-1 flex flex-col rounded-lg overflow-hidden">
            <CardHeader className="px-4 pt-4">
              <div className="card-title-theme flex items-center gap-2">
                <FileSearch className="w-3.5 h-3.5" />
                Assignment Prompt / Instructions
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 px-4 pb-4">
              <Textarea
                placeholder="Paste the assignment requirements or prompt here..."
                className="flex-1 bg-surface border-border focus:border-accent transition-colors resize-none text-xs font-mono leading-relaxed"
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
              />
              <Button 
                onClick={handleExplain} 
                disabled={loading || !assignment.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-white gap-2 py-5 text-xs font-bold uppercase tracking-wider"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Break Down Assignment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col overflow-hidden">
          <Card className="bg-background border-border flex-1 flex flex-col overflow-hidden rounded-lg">
            <CardHeader className="px-4 pt-4 border-b border-border">
              <div className="card-title-theme flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Structured AI Breakdown
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden bg-surface/30">
              <ScrollArea className="h-full">
                <div className="p-8 prose prose-invert max-w-none">
                  <AnimatePresence mode="wait">
                    {explanation ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <ReactMarkdown>{explanation}</ReactMarkdown>
                      </motion.div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-text-secondary text-center px-10">
                        <MessageSquare className="w-12 h-12 mb-4 opacity-10" />
                        <p className="text-xs font-mono">Submit an assignment prompt to receive a structured step-by-step breakdown.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
