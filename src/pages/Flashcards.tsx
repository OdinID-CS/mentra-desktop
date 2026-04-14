import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Plus, Trash2 } from "lucide-react";
import { generateFlashcards, Flashcard } from "@/services/aiService";
import { motion, AnimatePresence } from "framer-motion";

export default function Flashcards() {
  const [notes, setNotes] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    try {
      const newCards = await generateFlashcards(notes);
      setCards([...newCards, ...cards]);
      setNotes("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-background border-border rounded-lg">
            <CardHeader className="px-4 pt-4">
              <div className="card-title-theme">Input Notes</div>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-4">
              <Textarea
                placeholder="Paste your lecture notes, article text, or study material here..."
                className="min-h-[300px] bg-surface border-border focus:border-accent transition-colors resize-none text-xs font-mono"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !notes.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-white gap-2 text-xs font-bold uppercase tracking-wider"
              >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Generate Cards
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Your Cards</span>
              <span className="badge-theme">{cards.length}</span>
            </div>
            {cards.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setCards([])} className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-red-400">
                <Trash2 className="w-3 h-3 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-3 pb-8">
              <AnimatePresence initial={false}>
                {cards.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-text-secondary border border-dashed border-border rounded-lg bg-background">
                    <Plus className="w-8 h-8 mb-2 opacity-10" />
                    <p className="text-xs font-mono">No flashcards yet. Generate some to get started!</p>
                  </div>
                ) : (
                  cards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Card className="bg-background border-border hover:border-accent/50 transition-all group overflow-hidden rounded-lg">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-[9px] uppercase tracking-[0.15em] text-accent font-bold mb-1 block">Question</span>
                              <p className="text-text-primary text-xs leading-relaxed">{card.question}</p>
                            </div>
                            <div className="md:border-l md:border-border md:pl-4">
                              <span className="text-[9px] uppercase tracking-[0.15em] text-emerald-500 font-bold mb-1 block">Answer</span>
                              <p className="text-text-secondary text-xs leading-relaxed">{card.answer}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
