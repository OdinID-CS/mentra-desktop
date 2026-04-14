import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HelpCircle, CheckCircle2, RotateCcw } from "lucide-react";

interface FlashcardItemProps {
  question: string;
  answer: string;
}

export default function FlashcardItem({ question, answer }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-48 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <Card className="absolute inset-0 backface-hidden bg-background border-border group-hover:border-accent/50 transition-colors rounded-2xl overflow-hidden shadow-sm">
          <CardContent className="h-full flex flex-col p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-accent/10 rounded-lg text-accent">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Question</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-sm font-medium text-text-primary leading-relaxed max-w-[80%]">
                {question}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Click to reveal answer
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card 
          className="absolute inset-0 backface-hidden bg-surface border-accent/30 rounded-2xl overflow-hidden shadow-lg shadow-accent/5"
          style={{ transform: "rotateY(180deg)" }}
        >
          <CardContent className="h-full flex flex-col p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Answer</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-sm text-text-primary leading-relaxed max-w-[80%]">
                {answer}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-accent uppercase tracking-widest font-bold">
                <RotateCcw className="w-3 h-3" />
                Click to flip back
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
