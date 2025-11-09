import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { TopicSelector } from "@/components/TopicSelector";
import { Footer } from "@/components/Footer";
import { DebateTopic } from "@/types/debate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, MessageSquarePlus } from "lucide-react";

const mockTopics: DebateTopic[] = [
    {
        id: "1",
        title: "AI will replace most human jobs",
        description: "Debate the impact of artificial intelligence on the future job market",
        difficulty: "medium",
        category: "Technology",
    },
    {
        id: "2",
        title: "Social media does more harm than good",
        description: "Argue about the overall impact of social media platforms on society",
        difficulty: "easy",
        category: "Society",
    },
    {
        id: "3",
        title: "Climate change requires immediate global action",
        description: "Discuss the urgency and necessity of coordinated climate responses",
        difficulty: "medium",
        category: "Environment",
    },
    {
        id: "4",
        title: "Universal basic income is necessary",
        description: "Debate the economic feasibility and social implications of UBI",
        difficulty: "hard",
        category: "Economics",
    },
    {
        id: "5",
        title: "Space exploration should be prioritized",
        description: "Argue about funding priorities for space programs vs Earth issues",
        difficulty: "medium",
        category: "Science",
    },
    {
        id: "6",
        title: "Privacy is more important than security",
        description: "Debate the balance between personal privacy and national security",
        difficulty: "hard",
        category: "Ethics",
    },
];

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [customTitle, setCustomTitle] = useState("");
    const [customDescription, setCustomDescription] = useState("");
    const [customDifficulty, setCustomDifficulty] = useState<"easy" | "medium" | "hard">("medium");
    const [customCategory, setCustomCategory] = useState("General");

    const handleSelectTopic = (topic: DebateTopic) => {
        if (!isAuthenticated) {
            // Redirect to login and come back to debate with the topic
            navigate("/login", { state: { from: { pathname: "/debate" }, topic } });
        } else {
            navigate("/debate", { state: { topic } });
        }
    };

    const handleCustomDebate = () => {
        if (!customTitle.trim()) {
            return;
        }

        const customTopic: DebateTopic = {
            id: `custom-${Date.now()}`,
            title: customTitle.trim(),
            description: customDescription.trim() || "Custom debate topic",
            difficulty: customDifficulty,
            category: customCategory,
        };

        handleSelectTopic(customTopic);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />

            <section id="topics" className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold">
                            Choose Your Debate Topic
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Select from popular topics or create your own custom debate
                        </p>
                    </div>

                    {/* Custom Topic Creator */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-2 border-primary/20 shadow-glow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-gradient-ai flex items-center justify-center">
                                    <MessageSquarePlus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold">Create Custom Debate</h3>
                                    <p className="text-sm text-muted-foreground">Debate about anything you want!</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="custom-title">Debate Topic *</Label>
                                    <Input
                                        id="custom-title"
                                        placeholder="e.g., Dogs are better than cats"
                                        value={customTitle}
                                        onChange={(e) => setCustomTitle(e.target.value)}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="custom-description">Description (Optional)</Label>
                                    <Textarea
                                        id="custom-description"
                                        placeholder="Add context or specific points to debate..."
                                        value={customDescription}
                                        onChange={(e) => setCustomDescription(e.target.value)}
                                        className="mt-2 resize-none"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="custom-category">Category</Label>
                                        <Input
                                            id="custom-category"
                                            placeholder="e.g., Lifestyle"
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="custom-difficulty">Difficulty</Label>
                                        <Select value={customDifficulty} onValueChange={(value: "easy" | "medium" | "hard") => setCustomDifficulty(value)}>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="easy">Easy</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="hard">Hard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCustomDebate}
                                    disabled={!customTitle.trim()}
                                    className="w-full bg-gradient-ai hover:opacity-90 transition-opacity"
                                    size="lg"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Start Custom Debate
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 max-w-3xl mx-auto mb-16">
                        <div className="flex-1 h-px bg-border"></div>
                        <span className="text-sm text-muted-foreground">OR</span>
                        <div className="flex-1 h-px bg-border"></div>
                    </div>

                    {/* Popular Topics */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-display font-bold text-center mb-8">Popular Topics</h3>
                        <TopicSelector topics={mockTopics} onSelectTopic={handleSelectTopic} />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
