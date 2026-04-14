import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadNotes() {
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = () => {
    if (!notes.trim()) return;
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Upload Notes</h2>
        <p className="text-text-secondary mt-2">Add your study material to start generating insights.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-accent">Text Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your notes here..."
                className="min-h-[400px] bg-surface border-border focus:border-accent transition-all resize-none text-sm leading-relaxed"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button 
                onClick={handleUpload}
                disabled={isUploading || !notes.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-base font-medium"
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : isSuccess ? (
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                ) : (
                  <Upload className="w-5 h-5 mr-2" />
                )}
                {isUploading ? "Processing..." : isSuccess ? "Saved Successfully" : "Upload Notes"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-accent">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-surface hover:border-accent/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="font-medium text-sm">Import PDF</span>
                </div>
                <p className="text-xs text-text-secondary">Extract text from your lecture slides or textbooks.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-surface hover:border-accent/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <Upload className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-sm">Sync Google Drive</span>
                </div>
                <p className="text-xs text-text-secondary">Connect your account to pull notes automatically.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20 rounded-lg p-6">
            <h4 className="text-accent font-bold text-sm mb-2 uppercase tracking-widest">Study Tip</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Try to upload notes in smaller chunks (by chapter or topic) for more accurate AI generation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
