import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Layers } from "lucide-react";
import { generateFlashcards, Flashcard } from "@/services/aiService";
import NoteUploader from "@/components/NoteUploader";
import FlashcardItem from "@/components/FlashcardItem";
import { motion, AnimatePresence } from "framer-motion";

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (notes: string) => {
    setLoading(true);
    try {
      const newCards = await generateFlashcards(notes);
      setCards([...newCards, ...cards]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Flashcard Factory</h2>
            <p className="text-xs text-text-secondary">Upload notes to generate study material.</p>
          </div>
          
          <NoteUploader 
            onUpload={handleGenerate} 
            isLoading={loading} 
            buttonText="Generate Flashcards" 
          />
        </div>

        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-text-primary">Card Repository</span>
                <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">{cards.length} Active Cards</p>
              </div>
            </div>
            {cards.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setCards([])} className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-red-400 font-bold">
                <Trash2 className="w-3 h-3 mr-2" />
                Purge All
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
                    className="md:col-span-2 h-96 flex flex-col items-center justify-center text-text-secondary border-2 border-dashed border-border rounded-2xl bg-surface/20"
                  >
                    <Plus className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-xs font-mono max-w-[200px] text-center leading-relaxed">Your repository is empty. Upload notes to populate it.</p>
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

