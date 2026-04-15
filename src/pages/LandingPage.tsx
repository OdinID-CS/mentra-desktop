import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cpu, BookOpen, Sparkles, Target, Zap, ArrowRight, CheckCircle2, Brain, Rocket, Shield } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-accent" />
            <span className="text-lg font-bold tracking-tighter uppercase italic font-serif">Mentra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/60">
            <a href="#features" className="hover:text-accent transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-accent transition-colors">Protocol</a>
            <a href="#security" className="hover:text-accent transition-colors">Security</a>
          </div>
          <Button 
            onClick={onGetStarted}
            variant="outline" 
            className="border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest h-9 px-6 rounded-full"
          >
            Establish Link
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-view-width mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-bold">Neural Core v4.0.2 Active</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            EVOLVE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">LEARNING ENGINE</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 font-light leading-relaxed">
            Mentra OS is a high-density neural workspace designed for academic mastery. 
            Automate your study protocols with AI-driven extraction and synthesis.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={onGetStarted}
              className="w-full sm:w-auto h-14 px-10 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all"
            >
              Initialize Core
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              className="w-full sm:w-auto h-14 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all"
            >
              View Documentation
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem & Solution */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 uppercase italic font-serif">The Cognitive Bottleneck</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Traditional studying is fragmented. Information overload leads to retention decay. 
              Students spend 70% of their time organizing data rather than mastering it.
            </p>
            <div className="space-y-4">
              {[
                "Information fragmentation across platforms",
                "Inefficient manual flashcard creation",
                "Lack of structured learning hierarchies",
                "Cognitive overload during exam cycles"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-mono text-white/40 uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/20 blur-[100px] opacity-30" />
            <div className="relative p-8 rounded-3xl border border-accent/20 bg-accent/5 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 uppercase italic font-serif text-accent">The Mentra Solution</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                We've built a unified operating system for your mind. Mentra automates the 
                heavy lifting of information processing.
              </p>
              <div className="space-y-4">
                {[
                  "Automated Knowledge Extraction",
                  "AI-Generated Active Recall Sets",
                  "Dynamic Study Architecture",
                  "Neural Link Communication"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-mono text-accent uppercase tracking-wider font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase italic font-serif">Core Modules</h2>
            <p className="text-white/40 font-mono uppercase tracking-[0.3em] text-xs">High-Density Learning Architecture</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Knowledge Engine",
                desc: "Transform unstructured notes into hierarchical learning architectures automatically.",
                icon: Brain,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Flashcard Factory",
                desc: "AI-powered active recall generation. Convert any content into optimized study sets.",
                icon: BookOpen,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Neural Link",
                desc: "A terminal-style AI tutor that understands your specific learning context.",
                icon: Terminal,
                color: "from-accent to-indigo-500"
              },
              {
                title: "Study Planner",
                desc: "Algorithmic scheduling that adapts to your timeframe and cognitive load.",
                icon: Target,
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Assignment Explainer",
                desc: "Deconstruct complex tasks into executable, step-by-step protocols.",
                icon: Sparkles,
                color: "from-orange-500 to-yellow-500"
              },
              {
                title: "System Analytics",
                desc: "Real-time tracking of your neural sync and learning progress.",
                icon: Zap,
                color: "from-red-500 to-rose-500"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-accent/5 border-y border-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase italic font-serif">The Protocol</h2>
            <p className="text-white/40 font-mono uppercase tracking-[0.3em] text-xs">Three Steps to Mastery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-y-1/2" />
            
            {[
              {
                step: "01",
                title: "Data Ingestion",
                desc: "Upload your lectures, notes, or assignments to the Mentra Neural Core.",
                icon: Upload
              },
              {
                step: "02",
                title: "Neural Synthesis",
                desc: "Our AI engines deconstruct and rebuild your data into structured knowledge.",
                icon: Cpu
              },
              {
                step: "03",
                title: "Active Mastery",
                desc: "Engage with generated protocols and flashcards to lock in information.",
                icon: Rocket
              }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-accent flex items-center justify-center mb-8 z-10 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <span className="text-xl font-bold text-accent font-mono">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase italic font-serif tracking-tight">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              READY TO <br />
              <span className="text-accent italic font-serif uppercase">UPGRADE?</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto font-light">
              Join the next generation of high-performance students. 
              Establish your neural link today.
            </p>
            <Button 
              onClick={onGetStarted}
              className="h-16 px-12 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              Initialize Mentra OS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-30 grayscale contrast-200">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Secure Protocol
              </div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                <Cpu className="w-4 h-4" /> AI Powered
              </div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                <Zap className="w-4 h-4" /> Instant Synthesis
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold tracking-tighter uppercase italic font-serif">Mentra OS</span>
          </div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
            © 2026 Mentra Neural Systems • All Rights Reserved
          </div>
          <div className="flex gap-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .max-view-width {
          max-width: min(100%, 1280px);
        }
      `}</style>
    </div>
  );
}

// Missing icon imports for the protocol section
function Upload(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function Terminal(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}
