import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Mail, Lock, ArrowRight, UserCircle, ShieldCheck, Terminal, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackendService } from "@/services/backendService";

interface LoginProps {
  onLogin: (email?: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        await BackendService.register(email, password);
        // Auto login after registration
        const result = await BackendService.login(email, password);
        onLogin(result.user.email);
      } else {
        const result = await BackendService.login(email, password);
        onLogin(result.user.email);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-6"
          >
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase italic font-serif mb-2">Mentra OS</h1>
          <div className="flex items-center gap-2">
            <span className="mono-label opacity-50">Neural Learning Engine</span>
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest">v4.0.2</span>
          </div>
        </div>

        <Card className="bg-surface/30 border-border shadow-2xl backdrop-blur-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-mono uppercase tracking-wider"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="mono-label ml-1">Access Identity</label>
                  <div className="relative group">
                    <Input
                      type="email"
                      placeholder="neural-id@mentra.os"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50 border-border focus:border-accent pl-10 h-12 rounded-xl transition-all"
                      required
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-accent transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="mono-label">Encryption Key</label>
                    {!isRegistering && (
                      <button type="button" className="text-[9px] font-mono text-accent hover:underline uppercase tracking-widest">
                        Lost Key?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50 border-border focus:border-accent pl-10 h-12 rounded-xl transition-all"
                      required
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-accent transition-colors" />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Terminal className="w-4 h-4" />
                    </motion.div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{isRegistering ? "Initialize Core" : "Establish Link"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-surface/30 px-4 text-text-secondary font-mono">Protocol Overrides</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="h-11 border-border bg-background/30 hover:bg-surface rounded-xl text-[10px] font-bold uppercase tracking-widest"
                >
                  {isRegistering ? "Back to Link" : "New Identity"}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => onLogin()}
                  className="h-11 border-border bg-background/30 hover:bg-surface rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <UserCircle className="w-3.5 h-3.5" />
                  Guest
                </Button>
              </div>
            </form>
          </CardContent>

          <div className="p-4 bg-accent/5 border-t border-border flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span className="text-[8px] font-mono text-text-secondary uppercase tracking-[0.2em]">Quantum Secure</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-accent" />
              <span className="text-[8px] font-mono text-text-secondary uppercase tracking-[0.2em]">E2E Encrypted</span>
            </div>
          </div>
        </Card>

        <p className="mt-8 text-center text-[10px] font-mono text-text-secondary uppercase tracking-[0.3em] opacity-30">
          Authorized Personnel Only • Mentra Neural Core
        </p>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
