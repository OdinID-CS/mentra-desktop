import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User, Bot, Loader2, Trash2, Terminal, Wifi, Shield } from "lucide-react";
import { BackendService } from "@/services/backendService";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

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
      const response = await BackendService.askAI(input);
      setMessages((prev) => [...prev, { role: "model", text: response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", text: "Error: Failed to connect to Mentra Neural Engine." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col space-y-6">
      <header className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-accent/10 rounded-xl text-accent border border-accent/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-xl font-bold tracking-tight uppercase italic font-serif">Neural Link</h2>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
                <Wifi className="w-2 h-2" />
                Encrypted
              </div>
            </div>
            <p className="mono-label">Direct Interface v4.0.2</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 mr-4">
            <div className="text-right">
              <p className="mono-label">Packets</p>
              <p className="text-[10px] font-mono font-bold text-text-primary">TX: 1.2k / RX: 4.8k</p>
            </div>
            <div className="text-right">
              <p className="mono-label">Security</p>
              <p className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-1 justify-end">
                <Shield className="w-2.5 h-2.5" />
                Level 5
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessages([])}
            className="h-8 text-[9px] uppercase tracking-widest text-text-secondary hover:text-red-400 font-bold border-border bg-surface/50"
          >
            <Trash2 className="w-3 h-3 mr-2" />
            Purge Buffer
          </Button>
        </div>
      </header>

      <Card className="flex-1 bg-surface/20 border-border overflow-hidden flex flex-col rounded-2xl shadow-2xl relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,18,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-8 space-y-8">
              <AnimatePresence initial={false}>
                {messages.length === 0 ? (
                  <div className="h-[400px] flex flex-col items-center justify-center text-text-secondary text-center">
                    <div className="relative mb-6">
                      <Terminal className="w-16 h-16 opacity-5" />
                      <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-0 right-0 w-4 h-1 bg-accent"
                      />
                    </div>
                    <p className="text-[10px] font-mono max-w-[300px] leading-relaxed uppercase tracking-widest opacity-40">
                      Waiting for neural handshake...<br/>
                      Initialize query to begin extraction.
                    </p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex gap-6 max-w-[90%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 border transition-all duration-300",
                        msg.role === "user" 
                          ? "bg-accent/10 text-accent border-accent/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                          : "bg-surface border-border text-text-secondary"
                      )}>
                        {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className={cn(
                        "flex flex-col gap-2",
                        msg.role === "user" ? "items-end" : "items-start"
                      )}>
                        <div className="flex items-center gap-2 px-1">
                          <span className="mono-label opacity-40">
                            {msg.role === "user" ? "Local User" : "Neural Engine"}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="mono-label opacity-20">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className={cn(
                          "p-5 rounded-2xl text-sm leading-relaxed shadow-sm",
                          msg.role === "user" 
                            ? "bg-accent text-white rounded-tr-none" 
                            : "bg-surface border border-border text-text-primary rounded-tl-none"
                        )}>
                          <div className={cn(
                            "markdown-body",
                            msg.role === "user" && "text-white/90"
                          )}>
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-6 mr-auto"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border text-text-secondary flex items-center justify-center shrink-0 mt-1">
                      <Loader2 className="w-5 h-5 animate-spin text-accent" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-1">
                        <span className="mono-label text-accent animate-pulse">Processing...</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-surface border border-border rounded-tl-none flex items-center gap-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1 h-1 bg-accent rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Synthesizing Response</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          
          <div className="p-6 border-t border-border bg-background/50 backdrop-blur-sm">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-emerald-500/50 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
              <div className="relative flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Enter neural query command..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="h-12 bg-surface border-border focus:border-accent transition-all rounded-xl text-xs font-mono pl-11 pr-4"
                  />
                  <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  className="h-12 bg-accent hover:bg-accent/90 text-white rounded-xl px-6 shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Execute</span>
                </Button>
              </div>
            </form>
            <div className="mt-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest">Shift + Enter for multiline</span>
                </div>
              </div>
              <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest opacity-30">Mentra Neural Core v4.0.2</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
