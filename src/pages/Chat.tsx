import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User, Bot, Loader2, Trash2 } from "lucide-react";
import { chat } from "@/services/aiService";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      
      const response = await chat(input, history);
      setMessages((prev) => [...prev, { role: "model", text: response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", text: "Error: Failed to connect to Mentra Neural Engine." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col space-y-4">
      <header className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg text-accent">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Mentra Neural Link</h2>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Real-time Knowledge Query</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setMessages([])}
          className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-red-400 font-bold"
        >
          <Trash2 className="w-3 h-3 mr-2" />
          Clear Link
        </Button>
      </header>

      <Card className="flex-1 bg-background border-border overflow-hidden flex flex-col rounded-2xl shadow-sm">
        <CardContent className="p-0 flex-1 overflow-hidden bg-surface/10">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <AnimatePresence initial={false}>
                {messages.length === 0 ? (
                  <div className="h-96 flex flex-col items-center justify-center text-text-secondary text-center">
                    <Bot className="w-16 h-16 mb-4 opacity-10" />
                    <p className="text-xs font-mono max-w-[250px] leading-relaxed">
                      Neural link established. Ask Mentra any academic question to receive a structured response.
                    </p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-4 max-w-[85%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
                        msg.role === "user" ? "bg-accent/10 text-accent" : "bg-emerald-500/10 text-emerald-500"
                      )}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user" 
                          ? "bg-accent text-white rounded-tr-none" 
                          : "bg-background border border-border text-text-primary rounded-tl-none"
                      )}>
                        <div className="markdown-body">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4 mr-auto"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </CardContent>
        
        <div className="p-4 border-t border-border bg-background">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              placeholder="Query the neural engine..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-surface border-border focus:border-accent transition-colors rounded-xl text-xs font-mono"
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-accent hover:bg-accent/90 text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
