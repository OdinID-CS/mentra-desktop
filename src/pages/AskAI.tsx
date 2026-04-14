import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Sparkles, MessageSquare, Lightbulb, Send } from "lucide-react";
import { explainAssignment } from "@/services/aiService";
import ReactMarkdown from "react-markdown";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await explainAssignment(query);
      setResponse(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Ask AI Assistant</h2>
        <p className="text-text-secondary mt-2">Get explanations, summaries, or help with complex topics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="flex flex-col space-y-4">
          <Card className="bg-background border-border flex-1 flex flex-col shadow-sm overflow-hidden">
            <CardHeader className="bg-surface/50 border-b border-border">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Your Question
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <Textarea
                placeholder="Ask anything about your studies... e.g., 'Explain the second law of thermodynamics' or 'Summarize my uploaded notes on Biology'."
                className="flex-1 bg-transparent border-none focus-visible:ring-0 p-6 text-sm leading-relaxed resize-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="p-4 bg-surface/50 border-t border-border flex justify-end">
                <Button 
                  onClick={handleAsk} 
                  disabled={loading || !query.trim()}
                  className="bg-accent hover:bg-accent/90 text-white gap-2 px-6"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Ask Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col overflow-hidden">
          <Card className="bg-background border-border flex-1 flex flex-col overflow-hidden shadow-sm">
            <CardHeader className="bg-surface/50 border-b border-border">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                AI Response
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-8 prose prose-invert max-w-none">
                  {response ? (
                    <ReactMarkdown>{response}</ReactMarkdown>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-text-secondary text-center px-10">
                      <Sparkles className="w-12 h-12 mb-4 opacity-10" />
                      <p className="text-sm font-medium">I'm ready to help. Type your question on the left to get started.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
