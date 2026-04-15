import { useState } from "react";
import Sidebar from "./components/Sidebar";
import KnowledgeEngine from "./pages/KnowledgeEngine";
import Flashcards from "./pages/Flashcards";
import StudyPlanner from "./pages/StudyPlanner";
import AssignmentExplainer from "./pages/AssignmentExplainer";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleLogin = (email?: string) => {
    setIsAuthenticated(true);
    if (email) {
      setUserEmail(email);
    } else {
      setUserEmail("Guest User");
    }
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">
      <header className="h-[60px] border-b border-border flex items-center justify-between px-6 bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <strong className="text-lg tracking-tight uppercase italic font-serif">Mentra OS</strong>
          <span className="badge-theme">v4.0.2</span>
        </div>
        <div className="text-[10px] text-text-secondary font-mono uppercase tracking-widest flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Neural Link Active
          </div>
          <div className="w-px h-4 bg-border" />
          User: {userEmail || "quincysolomon33"}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />
        
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
