import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Database, Cpu, Layers, Network, ChevronRight } from "lucide-react";
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
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1 overflow-hidden">
        <div className="flex flex-col space-y-8">
          <header>
            <div className="flex items-center gap-2 mb-1">
              <span className="mono-label opacity-50">Module 02</span>
              <span className="w-1 h-1 rounded-full bg-accent" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight uppercase italic font-serif">Knowledge Engine</h2>
            <p className="text-xs text-text-secondary mt-2 max-w-md leading-relaxed">
              Neural extraction protocol for converting unstructured academic data into high-density knowledge nodes.
            </p>
          </header>

          <NoteUploader 
            onUpload={handleExtract} 
            isLoading={loading} 
            buttonText="Execute Extraction" 
          />
        </div>

        <div className="flex flex-col overflow-hidden">
          <Card className="bg-surface/20 border-border flex-1 flex flex-col overflow-hidden rounded-2xl shadow-2xl relative">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <CardHeader className="px-8 pt-8 border-b border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-accent/10 rounded-xl text-accent border border-accent/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-text-primary uppercase tracking-tight">Knowledge Base</span>
                    <p className="mono-label">Structured Output Stream</p>
                  </div>
                </div>
                {knowledge && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Synced</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-8 space-y-12">
                  <AnimatePresence mode="wait">
                    {knowledge ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                      >
                        <section className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Layers className="w-4 h-4 text-accent" />
                            <h4 className="mono-label text-accent">Executive Summary</h4>
                          </div>
                          <div className="p-6 bg-surface/50 border border-border rounded-2xl relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-20" />
                            <p className="text-sm text-text-secondary leading-relaxed italic">
                              "{knowledge.summary}"
                            </p>
                          </div>
                        </section>

                        <section className="space-y-6">
                          <div className="flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-emerald-500" />
                            <h4 className="mono-label text-emerald-500">Key Concepts</h4>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {knowledge.keyConcepts.map((concept, i) => (
                              <div key={i} className="p-5 bg-background border border-border rounded-xl hover:border-accent/30 transition-all duration-300 group">
                                <div className="flex items-center gap-2 mb-2">
                                  <ChevronRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                                  <span className="text-xs font-bold text-text-primary uppercase tracking-tight">{concept.term}</span>
                                </div>
                                <p className="text-[11px] text-text-secondary leading-relaxed pl-5 border-l border-border group-hover:border-accent/30 transition-colors">
                                  {concept.definition}
                                </p>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="space-y-6">
                          <div className="flex items-center gap-3">
                            <Network className="w-4 h-4 text-amber-500" />
                            <h4 className="mono-label text-amber-500">Logical Hierarchy</h4>
                          </div>
                          <div className="space-y-4 pl-2">
                            {knowledge.hierarchy.map((item, i) => (
                              <div key={i} className="flex gap-6 group">
                                <div className="flex flex-col items-center gap-2">
                                  <Badge variant="outline" className="h-fit text-[9px] font-mono border-border text-text-secondary shrink-0 py-1 px-2.5 bg-surface/50">
                                    {item.level}
                                  </Badge>
                                  {i < knowledge.hierarchy.length - 1 && <div className="w-px flex-1 bg-border group-hover:bg-accent/30 transition-colors" />}
                                </div>
                                <p className="text-xs text-text-primary leading-relaxed pt-1 group-hover:text-accent transition-colors">
                                  {item.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </motion.div>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-text-secondary text-center px-10">
                        <div className="relative mb-8">
                          <Network className="w-20 h-20 opacity-5" />
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-accent rounded-full blur-3xl"
                          />
                        </div>
                        <p className="text-[10px] font-mono max-w-[250px] leading-relaxed uppercase tracking-widest opacity-40">
                          Neural engine idle.<br/>
                          Awaiting note input for knowledge synthesis.
                        </p>
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

