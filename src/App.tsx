import { useState } from "react";
import Sidebar from "./components/Sidebar";
import UploadNotes from "./pages/UploadNotes";
import Flashcards from "./pages/Flashcards";
import AskAI from "./pages/AskAI";
import Dashboard from "./pages/Dashboard";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "upload":
        return <UploadNotes />;
      case "flashcards":
        return <Flashcards />;
      case "ask-ai":
        return <AskAI />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">
      <header className="h-[60px] border-b border-border flex items-center justify-between px-6 bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <strong className="text-lg tracking-tight">LuminaOS</strong>
          <span className="badge-theme">v1.0.4</span>
        </div>
        <div className="text-[12px] text-text-secondary font-mono">
          Stack: Electron + React + Node.js (IPC-Bridge Pattern)
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto bg-surface relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
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
