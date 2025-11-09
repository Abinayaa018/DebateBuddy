import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DebateTopic } from "@/types/debate";
import { Sparkles, TrendingUp, Brain } from "lucide-react";

interface TopicSelectorProps {
  topics: DebateTopic[];
  onSelectTopic: (topic: DebateTopic) => void;
  isLoading?: boolean;
}

const difficultyIcons = {
  easy: Sparkles,
  medium: TrendingUp,
  hard: Brain,
};

const difficultyColors = {
  easy: "bg-gradient-user",
  medium: "bg-gradient-to-r from-user to-ai",
  hard: "bg-gradient-ai",
};

export const TopicSelector = ({ topics, onSelectTopic, isLoading }: TopicSelectorProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic) => {
        const Icon = difficultyIcons[topic.difficulty];
        return (
          <Card
            key={topic.id}
            className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-glow cursor-pointer"
            onClick={() => onSelectTopic(topic)}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${difficultyColors[topic.difficulty]}`} />
            <div className="relative p-6 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg leading-tight">{topic.title}</h3>
                <Icon className="w-5 h-5 text-primary shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {topic.difficulty}
                </Badge>
                <Badge variant="secondary">{topic.category}</Badge>
              </div>
              <Button 
                className="w-full" 
                disabled={isLoading}
              >
                Start Debate
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
