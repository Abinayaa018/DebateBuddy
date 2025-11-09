import { Message } from "@/types/debate";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAi = message.role === 'ai';

  return (
    <div
      className={cn(
        "flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500",
        isAi ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          isAi ? "bg-gradient-ai" : "bg-gradient-user"
        )}
      >
        {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>
      <div
        className={cn(
          "flex-1 p-4 rounded-2xl max-w-[80%] backdrop-blur-sm",
          isAi
            ? "bg-card border border-ai/20 rounded-tl-none"
            : "bg-card border border-user/20 rounded-tr-none"
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className={cn("font-semibold text-sm", isAi ? "text-ai" : "text-user")}>
            {isAi ? "AI Opponent" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <p className="text-foreground leading-relaxed">{message.content}</p>
        {message.score !== undefined && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <span className="text-xs font-medium text-muted-foreground">
              Argument Strength: <span className="text-primary">{message.score}/10</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
