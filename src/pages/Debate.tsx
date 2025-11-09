import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { DebateChat } from "@/components/DebateChat";
import { ScorePanel } from "@/components/ScorePanel";
import { DebateTopic, Message, DebateScore } from "@/types/debate";
import { geminiDebateService as aiDebateService } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flag } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Debate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const topic = location.state?.topic as DebateTopic;
    const [messages, setMessages] = useState<Message[]>([]);
    const [score, setScore] = useState<DebateScore>({ userId: 0, aiScore: 0, round: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [showEndDialog, setShowEndDialog] = useState(false);
    const [debateAnalysis, setDebateAnalysis] = useState<string>("");
    const { toast } = useToast();

    useEffect(() => {
        if (topic) {
            startDebate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);

    const startDebate = async () => {
        if (!topic) return;

        setIsLoading(true);

        try {
            console.log("Starting debate with Gemini API...");
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            console.log("API Key present:", !!apiKey);
            console.log("API Key length:", apiKey?.length || 0);

            const aiOpening = await aiDebateService.startDebate(topic);

            setMessages([
                {
                    id: "1",
                    role: "ai",
                    content: aiOpening,
                    timestamp: new Date(),
                },
            ]);

            toast({
                title: "Debate Started!",
                description: "The AI has presented their opening statement.",
            });
        } catch (error: unknown) {
            console.error("Error starting debate:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error("Error message:", errorMessage);

            toast({
                title: "Error",
                description: `Failed to start debate: ${errorMessage}. Using demo mode.`,
                variant: "destructive",
            });

            // Fallback to demo mode
            setMessages([
                {
                    id: "1",
                    role: "ai",
                    content: `I'm ready to debate "${topic.title}". However, there was an issue connecting to the AI service. I'll respond in demo mode. Make your opening argument!`,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: message,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const { aiResponse, userScore, aiScore } = await aiDebateService.sendMessage(
                topic,
                [...messages, userMessage]
            );

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponse,
                timestamp: new Date(),
                score: aiScore,
            };

            setMessages((prev) => [...prev, aiMessage]);
            setScore((prev) => ({
                userId: prev.userId + userScore,
                aiScore: prev.aiScore + aiScore,
                round: prev.round + 1,
            }));

            toast({
                title: "Round Complete",
                description: `You scored ${userScore}/10 points this round!`,
            });
        } catch (error) {
            console.error("Error sending message:", error);

            // Fallback demo response
            const demoResponse = generateDemoResponse(message);
            const demoUserScore = Math.floor(Math.random() * 3) + 6;
            const demoAiScore = Math.floor(Math.random() * 3) + 6;

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: demoResponse,
                timestamp: new Date(),
                score: demoAiScore,
            };

            setMessages((prev) => [...prev, aiMessage]);
            setScore((prev) => ({
                userId: prev.userId + demoUserScore,
                aiScore: prev.aiScore + demoAiScore,
                round: prev.round + 1,
            }));

            toast({
                title: "Demo Mode",
                description: `Using demo response. You scored ${demoUserScore}/10 points.`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndDebate = async () => {
        setIsLoading(true);

        try {
            const analysis = await aiDebateService.getDebateAnalysis(topic, messages, {
                userScore: score.userId,
                aiScore: score.aiScore,
            });
            setDebateAnalysis(analysis);
            setShowEndDialog(true);
        } catch (error) {
            console.error("Error getting analysis:", error);
            setDebateAnalysis(generateDemoAnalysis());
            setShowEndDialog(true);
        } finally {
            setIsLoading(false);
        }
    };

    const generateDemoResponse = (userMessage: string): string => {
        const responses = [
            `That's an interesting point, but I would argue that ${userMessage.toLowerCase().includes("technology") ? "technology also poses significant risks" : "we need to consider alternative perspectives"}. Research has shown multiple contradictory outcomes in this area.`,
            `While I understand your reasoning, ${userMessage.toLowerCase().includes("benefit") ? "the costs often outweigh the benefits" : "there are significant drawbacks to consider"}. Historical evidence suggests a more nuanced view is necessary.`,
            `I respectfully disagree. ${userMessage.toLowerCase().includes("should") ? "The implementation challenges are often underestimated" : "The theoretical framework doesn't always translate to practical reality"}. We must examine the empirical evidence more closely.`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const generateDemoAnalysis = (): string => {
        return `**Debate Analysis**

**Overall Performance:**
Both participants presented well-reasoned arguments throughout this debate on "${topic.title}".

**Your Strengths:**
- Clear articulation of key points
- Good use of logical reasoning
- Engaged with counterarguments

**Areas for Improvement:**
- Could strengthen arguments with more specific evidence
- Consider addressing potential weaknesses preemptively
- Develop more nuanced counterpoints

**AI Opponent Performance:**
The AI presented challenging opposition and maintained consistency throughout the debate.

**Final Verdict:**
This was a competitive debate with strong performances from both sides. Your total score: ${score.userId}, AI score: ${score.aiScore}.

*Note: This is a demo analysis. Configure your API key for detailed AI-powered evaluations.*`;
    };

    if (!topic) {
        return (
            <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-display font-bold mb-4">No topic selected</h2>
                    <p className="text-muted-foreground mb-6">Please select a topic from the home page</p>
                    <Button asChild>
                        <a href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </a>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-bg flex flex-col">
            <Navbar />

            <main className="container mx-auto px-4 pt-24 pb-8 flex-1 flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Topics
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleEndDebate}
                        disabled={messages.length < 3}
                    >
                        <Flag className="w-4 h-4 mr-2" />
                        End Debate
                    </Button>
                </div>

                <div className="grid lg:grid-cols-[1fr,320px] gap-6 flex-1 min-h-0">
                    <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border shadow-card flex flex-col overflow-hidden">
                        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm p-6 flex-shrink-0">
                            <h2 className="font-display font-semibold text-xl mb-2">{topic.title}</h2>
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                        <div className="flex-1 min-h-0">
                            <DebateChat
                                messages={messages}
                                onSendMessage={handleSendMessage}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 flex-shrink-0">
                        <ScorePanel score={score} />
                    </div>
                </div>
            </main>

            {/* End Debate Dialog */}
            <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
                <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Debate Analysis</AlertDialogTitle>
                        <AlertDialogDescription className="text-left whitespace-pre-line pt-4">
                            {debateAnalysis}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => navigate("/")}>
                            Back to Home
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => setShowEndDialog(false)}>
                            Continue Debating
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Debate;
