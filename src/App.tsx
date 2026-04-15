import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import KnowledgeEngine from "./pages/KnowledgeEngine";
import Flashcards from "./pages/Flashcards";
import StudyPlanner from "./pages/StudyPlanner";
import AssignmentExplainer from "./pages/AssignmentExplainer";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, UserCircle } from "lucide-react";
import { MentraBadge } from "./components/MentraUI";
import { supabase } from "./lib/supabase";
import { BackendService } from "./services/backendService";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [session, setSession] = useState<any>(null);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setShowLanding(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setShowLanding(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setShowLanding(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleLogout = async () => {
    await BackendService.logout();
    setShowLanding(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "knowledge":
        return <KnowledgeEngine />;
      case "flashcards":
        return <Flashcards />;
      case "planner":
        return <StudyPlanner />;
      case "assignments":
        return <AssignmentExplainer />;
      case "chat":
        return <Chat />;
      default:
        return <Dashboard />;
    }
  };

  if (!session) {
    if (showLanding) {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">
      <header className="h-[72px] border-b border-border flex items-center justify-between px-8 bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center shadow-lg">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <strong className="text-xl tracking-tight uppercase italic font-serif">Mentra OS</strong>
          <MentraBadge variant="blue" className="ml-2">v4.0.2</MentraBadge>
        </div>
        <div className="text-[11px] text-text-secondary font-mono uppercase tracking-widest flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            Neural Link Active
          </div>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            <span className="font-bold text-text-primary">{session.user?.email}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto bg-surface relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
