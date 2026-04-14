import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ListTree, Database } from "lucide-react";
import { BackendService } from "@/services/backendService";
import { StructuredKnowledge } from "@/services/aiService";
import NoteUploader from "@/components/NoteUploader";
import { motion, AnimatePresence } from "framer-motion";

export default function KnowledgeEngine() {
  const [knowledge, setKnowledge] = useState<StructuredKnowledge | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async (notes: string) => {
    setLoading(true);
    try {
      const result = await BackendService.extractKnowledge(notes);
      setKnowledge(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="flex flex-col space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Knowledge Engine</h2>
            <p className="text-xs text-text-secondary">Convert unstructured notes into a structured knowledge base.</p>
          </div>

          <NoteUploader 
            onUpload={handleExtract} 
            isLoading={loading} 
            buttonText="Extract Knowledge" 
          />
        </div>

        <div className="flex flex-col overflow-hidden">
          <Card className="bg-background border-border flex-1 flex flex-col overflow-hidden rounded-2xl shadow-sm">
            <CardHeader className="px-6 pt-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-text-primary">Knowledge Base</span>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Structured Output</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden bg-surface/10">
              <ScrollArea className="h-full">
                <div className="p-8 space-y-10">
                  <AnimatePresence mode="wait">
                    {knowledge ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                      >
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent">Executive Summary</h4>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed pl-3.5">{knowledge.summary}</p>
                        </section>

                        <section className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Key Concepts</h4>
                          </div>
                          <div className="grid grid-cols-1 gap-3 pl-3.5">
                            {knowledge.keyConcepts.map((concept, i) => (
                              <div key={i} className="p-4 bg-background border border-border rounded-xl hover:border-accent/20 transition-colors">
                                <span className="text-xs font-bold text-text-primary block mb-1">{concept.term}</span>
                                <p className="text-[11px] text-text-secondary leading-relaxed">{concept.definition}</p>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Logical Hierarchy</h4>
                          </div>
                          <div className="space-y-4 pl-3.5">
                            {knowledge.hierarchy.map((item, i) => (
                              <div key={i} className="flex gap-4">
                                <Badge variant="outline" className="h-fit text-[9px] font-mono border-border text-text-secondary shrink-0 py-0.5 px-2">
                                  {item.level}
                                </Badge>
                                <p className="text-xs text-text-primary leading-relaxed">{item.content}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </motion.div>
                    ) : (
                      <div className="h-96 flex flex-col items-center justify-center text-text-secondary text-center px-10">
                        <ListTree className="w-16 h-16 mb-6 opacity-10" />
                        <p className="text-xs font-mono max-w-[200px] leading-relaxed">Input notes to build your structured knowledge base.</p>
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

