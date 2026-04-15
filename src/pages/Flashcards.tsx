import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Layers, Zap, Database } from "lucide-react";
import { BackendService } from "@/services/backendService";
import { Flashcard } from "@/services/aiService";
import NoteUploader from "@/components/NoteUploader";
import FlashcardItem from "@/components/FlashcardItem";
import { motion, AnimatePresence } from "framer-motion";

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (notes: string) => {
    setLoading(true);
    try {
      const newCards = await BackendService.generateFlashcards(notes);
      setCards([...newCards, ...cards]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1 overflow-hidden">
        <div className="lg:col-span-1 space-y-8">
          <header>
            <div className="flex items-center gap-2 mb-1">
              <span className="mono-label opacity-50">Module 03</span>
              <span className="w-1 h-1 rounded-full bg-amber-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight uppercase italic font-serif">Flashcard Factory</h2>
            <p className="text-xs text-text-secondary mt-2 max-w-md leading-relaxed">
              Neural synthesis engine for generating high-recall study nodes from unstructured academic data.
            </p>
          </header>
          
          <NoteUploader 
            onUpload={handleGenerate} 
            isLoading={loading} 
            buttonText="Synthesize Cards" 
          />

          <div className="p-6 bg-surface/30 border border-border rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="mono-label text-amber-500">Recall Optimization</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Active recall is the most effective way to move information from short-term to long-term memory. Use these cards daily for maximum retention.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-accent/10 rounded-xl text-accent border border-accent/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-text-primary uppercase tracking-tight">Card Repository</span>
                <p className="mono-label">{cards.length} Active Nodes</p>
              </div>
            </div>
            {cards.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCards([])} 
                className="h-8 text-[9px] uppercase tracking-widest text-text-secondary hover:text-red-400 font-bold border-border bg-surface/50"
              >
                <Trash2 className="w-3 h-3 mr-2" />
                Purge Repository
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
              <AnimatePresence initial={false}>
                {cards.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="md:col-span-2 h-[400px] flex flex-col items-center justify-center text-text-secondary border border-dashed border-border rounded-2xl bg-surface/10 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <Database className="w-16 h-16 mb-6 opacity-5" />
                    <p className="text-[10px] font-mono max-w-[250px] text-center leading-relaxed uppercase tracking-widest opacity-40">
                      Repository empty.<br/>
                      Initialize synthesis to populate knowledge nodes.
                    </p>
                  </motion.div>
                ) : (
                  cards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <FlashcardItem question={card.question} answer={card.answer} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

