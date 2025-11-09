import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DebateScore } from "@/types/debate";
import { Trophy, Target } from "lucide-react";

interface ScorePanelProps {
  score: DebateScore;
}

export const ScorePanel = ({ score }: ScorePanelProps) => {
  const total = score.userId + score.aiScore;
  const userPercentage = total > 0 ? (score.userId / total) * 100 : 50;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-user" />
            <h3 className="font-semibold">Debate Score</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>Round {score.round}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-user">You</span>
            <span className="text-2xl font-bold text-user">{score.userId}</span>
          </div>
          
          <div className="relative">
            <Progress value={userPercentage} className="h-3 bg-ai/20">
              <div className="h-full bg-gradient-user rounded-full transition-all" />
            </Progress>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-background border-2 border-primary shadow-glow" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-ai">AI Opponent</span>
            <span className="text-2xl font-bold text-ai">{score.aiScore}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Scores are calculated based on argument strength, logic, and evidence
          </p>
        </div>
      </div>
    </Card>
  );
};
