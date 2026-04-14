import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Database, ListTree, FileText } from "lucide-react";
import { extractKnowledge, StructuredKnowledge } from "@/services/aiService";
import { motion, AnimatePresence } from "framer-motion";

export default function KnowledgeEngine() {
  const [notes, setNotes] = useState("");
  const [knowledge, setKnowledge] = useState<StructuredKnowledge | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    try {
      const result = await extractKnowledge(notes);
      setKnowledge(result);
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
                <FileText className="w-3.5 h-3.5" />
                Raw Lecture Notes
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 px-4 pb-4">
              <Textarea
                placeholder="Paste your unstructured lecture notes here..."
                className="flex-1 bg-surface border-border focus:border-accent transition-colors resize-none text-xs font-mono leading-relaxed"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button 
                onClick={handleExtract} 
                disabled={loading || !notes.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-white gap-2 py-5 text-xs font-bold uppercase tracking-wider"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Extract Knowledge
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col overflow-hidden">
          <Card className="bg-background border-border flex-1 flex flex-col overflow-hidden rounded-lg">
            <CardHeader className="px-4 pt-4 border-b border-border">
              <div className="card-title-theme flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Structured Knowledge Base
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden bg-surface/30">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-8">
                  <AnimatePresence mode="wait">
                    {knowledge ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                      >
                        <section>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">Executive Summary</h4>
                          <p className="text-sm text-text-secondary leading-relaxed">{knowledge.summary}</p>
                        </section>

                        <section>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3">Key Concepts</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {knowledge.keyConcepts.map((concept, i) => (
                              <div key={i} className="p-3 bg-background border border-border rounded-lg">
                                <span className="text-xs font-bold text-text-primary block mb-1">{concept.term}</span>
                                <p className="text-[11px] text-text-secondary">{concept.definition}</p>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-3">Logical Hierarchy</h4>
                          <div className="space-y-3">
                            {knowledge.hierarchy.map((item, i) => (
                              <div key={i} className="flex gap-3">
                                <Badge variant="outline" className="h-fit text-[9px] font-mono border-border text-text-secondary shrink-0">
                                  {item.level}
                                </Badge>
                                <p className="text-xs text-text-primary leading-relaxed">{item.content}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </motion.div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-text-secondary text-center px-10">
                        <ListTree className="w-12 h-12 mb-4 opacity-10" />
                        <p className="text-xs font-mono">Input notes to build your structured knowledge base.</p>
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
