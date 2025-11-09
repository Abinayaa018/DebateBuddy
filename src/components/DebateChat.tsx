import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/debate";
import { MessageBubble } from "./MessageBubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface DebateChatProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
}

export const DebateChat = ({ messages, onSendMessage, isLoading }: DebateChatProps) => {
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            const scrollElement = scrollRef.current;
            setTimeout(() => {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }, 100);
        }
    }, [messages, isLoading]);

    // Focus input after sending message
    useEffect(() => {
        if (!isLoading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSendMessage(input.trim());
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth" ref={scrollRef}>
                <div className="space-y-6 max-w-4xl mx-auto">
                    {messages.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Waiting for debate to start...</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))
                    )}
                    {isLoading && messages.length > 0 && (
                        <div className="flex justify-start animate-in fade-in">
                            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border shadow-sm">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-ai" />
                                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4 flex-shrink-0">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="flex gap-3">
                        <Textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isLoading ? "AI is responding..." : "Make your argument..."}
                            className="min-h-[80px] max-h-[200px] resize-none bg-background/50"
                            disabled={isLoading}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-[80px] w-[80px] bg-gradient-user hover:opacity-90 transition-opacity"
                            disabled={!input.trim() || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Press Enter to send, Shift+Enter for new line
                    </p>
                </form>
            </div>
        </div>
    );
};
