import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Mail, Lock, ArrowRight, UserCircle, ShieldCheck, Terminal, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackendService } from "@/services/backendService";
import { MentraButton, MentraCard, MentraInput, MentraHeading, MentraBadge } from "@/components/MentraUI";

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
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] mb-8 mentra-glow-blue"
          >
            <Cpu className="w-12 h-12 text-white" />
          </motion.div>
          <MentraHeading level={1} className="uppercase italic font-serif mb-3 tracking-tighter">Mentra OS</MentraHeading>
          <div className="flex items-center gap-3">
            <span className="mono-label opacity-40">Neural Learning Engine</span>
            <div className="w-1 h-1 rounded-full bg-accent-blue animate-pulse" />
            <MentraBadge variant="blue">v4.0.2</MentraBadge>
          </div>
        </div>

        <MentraCard className="p-0 overflow-hidden relative shadow-2xl border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
          
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-mono uppercase tracking-wider"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className="mono-label ml-1">Access Identity</label>
                  <div className="relative group">
                    <MentraInput
                      type="email"
                      placeholder="neural-id@mentra.os"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-accent-blue transition-colors" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between ml-1">
                    <label className="mono-label">Encryption Key</label>
                    {!isRegistering && (
                      <button type="button" className="text-[10px] font-mono text-accent-blue hover:underline uppercase tracking-widest">
                        Lost Key?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <MentraInput
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-accent-blue transition-colors" />
                  </div>
                </div>
              </div>

              <MentraButton 
                type="submit" 
                disabled={isLoading}
                size="lg"
                className="w-full h-14"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Terminal className="w-5 h-5" />
                    </motion.div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>{isRegistering ? "Initialize Core" : "Establish Link"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </MentraButton>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-surface px-4 text-text-secondary font-mono">Protocol Overrides</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MentraButton 
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="h-12 text-[10px]"
                >
                  {isRegistering ? "Back to Link" : "New Identity"}
                </MentraButton>
                <MentraButton 
                  type="button"
                  variant="outline"
                  onClick={() => onLogin()}
                  className="h-12 text-[10px] flex items-center gap-2"
                >
                  <UserCircle className="w-4 h-4" />
                  Guest
                </MentraButton>
              </div>
            </form>
          </div>

          <div className="p-5 bg-white/[0.02] border-t border-border flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">Quantum Secure</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent-blue" />
              <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">E2E Encrypted</span>
            </div>
          </div>
        </MentraCard>

        <p className="mt-10 text-center text-[10px] font-mono text-text-secondary uppercase tracking-[0.3em] opacity-30">
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
