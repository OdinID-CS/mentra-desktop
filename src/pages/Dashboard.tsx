import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, PenTool, Sparkles, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Flashcards Created", value: "124", icon: BookOpen, color: "text-blue-400" },
    { label: "Assignments Explained", value: "12", icon: PenTool, color: "text-purple-400" },
    { label: "Study Streak", value: "5 Days", icon: TrendingUp, color: "text-green-400" },
    { label: "AI Tokens Used", value: "12.4k", icon: Sparkles, color: "text-amber-400" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-background border-border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold font-mono">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background border-border rounded-lg">
          <CardHeader className="px-4 pt-4">
            <div className="card-title-theme">Recent Activity</div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-surface transition-colors border border-transparent hover:border-border">
                  <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">Generated 20 flashcards for "Biology 101"</p>
                    <p className="text-[10px] text-text-secondary font-mono">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg">
          <CardHeader className="px-4 pt-4">
            <div className="card-title-theme">Service Communication</div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center justify-center gap-4 p-6 bg-accent/5 rounded-lg border border-dashed border-accent/30">
              <div className="px-3 py-2 border border-border rounded bg-background font-mono text-[10px]">React View</div>
              <div className="text-accent font-bold text-xs">──▶</div>
              <div className="px-3 py-2 border border-border rounded bg-background font-mono text-[10px]">Bridge</div>
              <div className="text-accent font-bold text-xs">──▶</div>
              <div className="px-3 py-2 border border-border rounded bg-background font-mono text-[10px]">Backend</div>
            </div>
            <div className="mt-4 p-3 bg-surface rounded border border-border">
              <p className="text-[11px] text-text-secondary italic leading-relaxed">
                "Active recall is the most effective way to move information from short-term to long-term memory."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
