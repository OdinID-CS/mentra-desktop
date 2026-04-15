import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, CheckCircle2, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardItemProps {
  question: string;
  answer: string;
}

export default function FlashcardItem({ question, answer }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [status, setStatus] = useState<"none" | "mastered" | "review">("none");

  const handleStatus = (e: React.MouseEvent, newStatus: "mastered" | "review") => {
    e.stopPropagation();
    setStatus(newStatus);
    setIsFlipped(false);
  };

  return (
    <div 
      className="perspective-1000 w-full h-56 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <Card className={cn(
          "absolute inset-0 backface-hidden border-2 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm",
          status === "mastered" ? "bg-emerald-500/5 border-emerald-500/20" : 
          status === "review" ? "bg-amber-500/5 border-amber-500/20" : 
          "bg-background border-border group-hover:border-accent/50"
        )}>
          <CardContent className="h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-1.5 rounded-lg",
                  status === "mastered" ? "bg-emerald-500/10 text-emerald-500" :
                  status === "review" ? "bg-amber-500/10 text-amber-500" :
                  "bg-accent/10 text-accent"
                )}>
                  <HelpCircle className="w-3.5 h-3.5" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  status === "mastered" ? "text-emerald-500" :
                  status === "review" ? "text-amber-500" :
                  "text-accent"
                )}>
                  Question
                </span>
              </div>
              {status !== "none" && (
                <span className={cn(
                  "text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border",
                  status === "mastered" ? "border-emerald-500/30 text-emerald-500" : "border-amber-500/30 text-amber-500"
                )}>
                  {status}
                </span>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <p className="text-sm font-medium text-text-primary leading-relaxed">
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
          className="absolute inset-0 backface-hidden bg-surface border-2 border-accent/30 rounded-2xl overflow-hidden shadow-lg shadow-accent/5"
          style={{ transform: "rotateY(180deg)" }}
        >
          <CardContent className="h-full flex flex-col p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Answer</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <p className="text-sm text-text-primary leading-relaxed">
                {answer}
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button 
                onClick={(e) => handleStatus(e, "review")}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest transition-colors border border-amber-500/20"
              >
                <ThumbsDown className="w-3 h-3" />
                Review
              </button>
              <button 
                onClick={(e) => handleStatus(e, "mastered")}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest transition-colors border border-emerald-500/20"
              >
                <ThumbsUp className="w-3 h-3" />
                Got it
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-text-secondary uppercase tracking-widest">
                <RotateCcw className="w-2.5 h-2.5" />
                Flip back
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
