import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteUploaderProps {
  onUpload: (text: string) => void;
  isLoading: boolean;
  buttonText?: string;
}

export default function NoteUploader({ onUpload, isLoading, buttonText = "Process Notes" }: NoteUploaderProps) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.type !== "text/plain") {
      alert("Please upload a .txt file for now.");
      return;
    }
    
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative group border-2 border-dashed rounded-xl transition-all duration-200 p-8 flex flex-col items-center justify-center gap-4 bg-surface/30",
          isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50",
          fileName && "border-emerald-500/50 bg-emerald-500/5"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt"
        />

        {fileName ? (
          <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-primary">{fileName}</p>
              <button 
                onClick={clearFile}
                className="text-[10px] text-text-secondary hover:text-red-400 flex items-center gap-1 mx-auto mt-1 uppercase tracking-widest font-bold"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-primary">Drag & drop your notes</p>
              <p className="text-xs text-text-secondary mt-1">or <button onClick={() => fileInputRef.current?.click()} className="text-accent hover:underline">browse files</button></p>
              <p className="text-[10px] text-text-secondary mt-4 uppercase tracking-widest font-bold opacity-50">Supports .txt files</p>
            </div>
          </>
        )}
      </div>

      <div className="relative">
        <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-text-secondary pointer-events-none">
          Manual Input
        </div>
        <Textarea
          placeholder="Or paste your notes directly here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] pt-10 bg-surface border-border focus:border-accent transition-colors resize-none text-xs font-mono leading-relaxed rounded-xl"
        />
      </div>

      <Button
        onClick={() => onUpload(text)}
        disabled={isLoading || !text.trim()}
        className="w-full bg-accent hover:bg-accent/90 text-white gap-2 py-6 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-accent/20"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {buttonText}
      </Button>
    </div>
  );
}
