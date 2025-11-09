import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Trophy,
    TrendingUp,
    MessageSquare,
    Calendar,
    Target,
    Award,
    ArrowRight,
    BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - replace with real API calls
const mockDebates = [
    {
        id: "1",
        topic: "AI will replace most human jobs",
        category: "Technology",
        difficulty: "medium",
        date: "2024-10-25",
        userScore: 8,
        aiScore: 7,
        result: "won",
        rounds: 5,
    },
    {
        id: "2",
        topic: "Social media does more harm than good",
        category: "Society",
        difficulty: "easy",
        date: "2024-10-24",
        userScore: 6,
        aiScore: 8,
        result: "lost",
        rounds: 4,
    },
    {
        id: "3",
        topic: "Climate change requires immediate global action",
        category: "Environment",
        difficulty: "medium",
        date: "2024-10-23",
        userScore: 9,
        aiScore: 6,
        result: "won",
        rounds: 6,
    },
];

const stats = {
    totalDebates: 12,
    winRate: 67,
    avgScore: 7.5,
    totalRounds: 58,
    favoriteCategory: "Technology",
    longestDebate: 8,
};

const History = () => {
    const [filter, setFilter] = useState<"all" | "won" | "lost">("all");

    const filteredDebates = mockDebates.filter((debate) => {
        if (filter === "all") return true;
        return debate.result === filter;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "hard": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Debate History
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Track your progress and review past debates
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-ai" />
                                <span className="text-sm text-muted-foreground">Total Debates</span>
                            </div>
                            <p className="text-2xl font-bold">{stats.totalDebates}</p>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="w-4 h-4 text-user" />
                                <span className="text-sm text-muted-foreground">Win Rate</span>
                            </div>
                            <p className="text-2xl font-bold">{stats.winRate}%</p>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Avg Score</span>
                            </div>
                            <p className="text-2xl font-bold">{stats.avgScore}</p>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="w-4 h-4 text-ai-secondary" />
                                <span className="text-sm text-muted-foreground">Total Rounds</span>
                            </div>
                            <p className="text-2xl font-bold">{stats.totalRounds}</p>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-4 h-4 text-user-secondary" />
                                <span className="text-sm text-muted-foreground">Top Category</span>
                            </div>
                            <p className="text-lg font-bold truncate">{stats.favoriteCategory}</p>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Longest</span>
                            </div>
                            <p className="text-2xl font-bold">{stats.longestDebate} rounds</p>
                        </Card>
                    </div>

                    {/* Debates List */}
                    <Tabs defaultValue="all" className="space-y-6" onValueChange={(v) => setFilter(v as "all" | "won" | "lost")}>
                        <TabsList>
                            <TabsTrigger value="all">All Debates</TabsTrigger>
                            <TabsTrigger value="won">Won</TabsTrigger>
                            <TabsTrigger value="lost">Lost</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-4">
                            {filteredDebates.length === 0 ? (
                                <Card className="p-12 text-center">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="font-display font-semibold text-xl mb-2">No debates yet</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Start your first debate to see your history here
                                    </p>
                                    <Button asChild>
                                        <Link to="/debate">
                                            Start Debating
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                </Card>
                            ) : (
                                filteredDebates.map((debate) => (
                                    <Card key={debate.id} className="p-6 hover:border-primary/50 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-display font-semibold text-lg mb-2">
                                                            {debate.topic}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <Badge variant="outline" className="text-xs">
                                                                {debate.category}
                                                            </Badge>
                                                            <Badge variant="outline" className={`text-xs ${getDifficultyColor(debate.difficulty)}`}>
                                                                {debate.difficulty}
                                                            </Badge>
                                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{new Date(debate.date).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-user mb-1">{debate.userScore}</div>
                                                    <div className="text-xs text-muted-foreground">Your Score</div>
                                                </div>
                                                <div className="text-muted-foreground">vs</div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-ai mb-1">{debate.aiScore}</div>
                                                    <div className="text-xs text-muted-foreground">AI Score</div>
                                                </div>
                                                <div className="text-center min-w-[80px]">
                                                    <Badge
                                                        className={`${debate.result === "won"
                                                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                                : "bg-red-500/10 text-red-500 border-red-500/20"
                                                            }`}
                                                    >
                                                        {debate.result === "won" ? "Victory" : "Defeat"}
                                                    </Badge>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {debate.rounds} rounds
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="won" className="space-y-4">
                            {filteredDebates.map((debate) => (
                                <Card key={debate.id} className="p-6 hover:border-primary/50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className="font-display font-semibold text-lg mb-2">
                                                        {debate.topic}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {debate.category}
                                                        </Badge>
                                                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(debate.difficulty)}`}>
                                                            {debate.difficulty}
                                                        </Badge>
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{new Date(debate.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-user mb-1">{debate.userScore}</div>
                                                <div className="text-xs text-muted-foreground">Your Score</div>
                                            </div>
                                            <div className="text-muted-foreground">vs</div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-ai mb-1">{debate.aiScore}</div>
                                                <div className="text-xs text-muted-foreground">AI Score</div>
                                            </div>
                                            <div className="text-center min-w-[80px]">
                                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                                    Victory
                                                </Badge>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {debate.rounds} rounds
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="lost" className="space-y-4">
                            {filteredDebates.map((debate) => (
                                <Card key={debate.id} className="p-6 hover:border-primary/50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className="font-display font-semibold text-lg mb-2">
                                                        {debate.topic}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {debate.category}
                                                        </Badge>
                                                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(debate.difficulty)}`}>
                                                            {debate.difficulty}
                                                        </Badge>
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{new Date(debate.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-user mb-1">{debate.userScore}</div>
                                                <div className="text-xs text-muted-foreground">Your Score</div>
                                            </div>
                                            <div className="text-muted-foreground">vs</div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-ai mb-1">{debate.aiScore}</div>
                                                <div className="text-xs text-muted-foreground">AI Score</div>
                                            </div>
                                            <div className="text-center min-w-[80px]">
                                                <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                                                    Defeat
                                                </Badge>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {debate.rounds} rounds
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default History;
