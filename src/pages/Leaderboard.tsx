import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Award, Crown, Medal, Target } from "lucide-react";

// Mock leaderboard data
const mockLeaderboard = [
    {
        rank: 1,
        username: "DebateMaster",
        score: 9850,
        winRate: 89,
        totalDebates: 145,
        avatar: "DM",
        badge: "legendary",
    },
    {
        rank: 2,
        username: "LogicKing",
        score: 9420,
        winRate: 85,
        totalDebates: 132,
        avatar: "LK",
        badge: "master",
    },
    {
        rank: 3,
        username: "ArgumentAce",
        score: 8990,
        winRate: 82,
        totalDebates: 128,
        avatar: "AA",
        badge: "master",
    },
    {
        rank: 4,
        username: "ThinkTank",
        score: 8750,
        winRate: 80,
        totalDebates: 119,
        avatar: "TT",
        badge: "expert",
    },
    {
        rank: 5,
        username: "ReasonPro",
        score: 8500,
        winRate: 78,
        totalDebates: 110,
        avatar: "RP",
        badge: "expert",
    },
    {
        rank: 6,
        username: "You",
        score: 7850,
        winRate: 67,
        totalDebates: 12,
        avatar: "YO",
        badge: "advanced",
        isCurrentUser: true,
    },
    {
        rank: 7,
        username: "PersuasionPro",
        score: 7500,
        winRate: 75,
        totalDebates: 95,
        avatar: "PP",
        badge: "advanced",
    },
];

const getBadgeColor = (badge: string) => {
    switch (badge) {
        case "legendary":
            return "bg-gradient-to-r from-yellow-500 to-orange-500";
        case "master":
            return "bg-gradient-to-r from-purple-500 to-pink-500";
        case "expert":
            return "bg-gradient-to-r from-blue-500 to-cyan-500";
        case "advanced":
            return "bg-gradient-to-r from-green-500 to-emerald-500";
        default:
            return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
};

const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
    return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
};

const Leaderboard = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-ai/10 border border-ai/20 mb-4">
                            <Trophy className="w-4 h-4 text-ai" />
                            <span className="text-sm font-medium">Global Rankings</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Leaderboard
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            See how you stack up against the best debaters
                        </p>
                    </div>

                    {/* Top 3 Podium */}
                    <div className="grid md:grid-cols-3 gap-4 mb-12">
                        {/* 2nd Place */}
                        <Card className="p-6 text-center order-2 md:order-1 md:mt-8">
                            <div className="relative inline-block mb-4">
                                <Avatar className="w-20 h-20 border-4 border-gray-400">
                                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-gray-400 to-gray-600">
                                        {mockLeaderboard[1].avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2">
                                    <Medal className="w-8 h-8 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="font-display font-bold text-xl mb-1">
                                {mockLeaderboard[1].username}
                            </h3>
                            <p className="text-3xl font-bold text-gray-400 mb-2">#2</p>
                            <p className="text-2xl font-bold mb-2">{mockLeaderboard[1].score}</p>
                            <Badge className={`${getBadgeColor(mockLeaderboard[1].badge)} text-white`}>
                                {mockLeaderboard[1].badge}
                            </Badge>
                        </Card>

                        {/* 1st Place */}
                        <Card className="p-6 text-center order-1 md:order-2 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                            <div className="relative inline-block mb-4">
                                <Avatar className="w-24 h-24 border-4 border-yellow-500">
                                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-yellow-500 to-orange-500">
                                        {mockLeaderboard[0].avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -top-4 -right-4">
                                    <Crown className="w-10 h-10 text-yellow-500" />
                                </div>
                            </div>
                            <h3 className="font-display font-bold text-2xl mb-1">
                                {mockLeaderboard[0].username}
                            </h3>
                            <p className="text-4xl font-bold text-yellow-500 mb-2">#1</p>
                            <p className="text-3xl font-bold mb-2">{mockLeaderboard[0].score}</p>
                            <Badge className={`${getBadgeColor(mockLeaderboard[0].badge)} text-white`}>
                                {mockLeaderboard[0].badge}
                            </Badge>
                        </Card>

                        {/* 3rd Place */}
                        <Card className="p-6 text-center order-3 md:mt-8">
                            <div className="relative inline-block mb-4">
                                <Avatar className="w-20 h-20 border-4 border-amber-700">
                                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-amber-700 to-amber-900">
                                        {mockLeaderboard[2].avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2">
                                    <Medal className="w-8 h-8 text-amber-700" />
                                </div>
                            </div>
                            <h3 className="font-display font-bold text-xl mb-1">
                                {mockLeaderboard[2].username}
                            </h3>
                            <p className="text-3xl font-bold text-amber-700 mb-2">#3</p>
                            <p className="text-2xl font-bold mb-2">{mockLeaderboard[2].score}</p>
                            <Badge className={`${getBadgeColor(mockLeaderboard[2].badge)} text-white`}>
                                {mockLeaderboard[2].badge}
                            </Badge>
                        </Card>
                    </div>

                    {/* Full Leaderboard */}
                    <Tabs defaultValue="overall" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overall">Overall</TabsTrigger>
                            <TabsTrigger value="weekly">This Week</TabsTrigger>
                            <TabsTrigger value="category">By Category</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overall" className="space-y-2">
                            {mockLeaderboard.map((user) => (
                                <Card
                                    key={user.rank}
                                    className={`p-4 ${user.isCurrentUser
                                            ? "bg-gradient-ai/5 border-ai/30 ring-2 ring-ai/20"
                                            : "hover:border-primary/50"
                                        } transition-colors`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Rank */}
                                        <div className="w-12 text-center shrink-0">
                                            {getRankIcon(user.rank)}
                                        </div>

                                        {/* Avatar */}
                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback className={`font-bold ${getBadgeColor(user.badge)}`}>
                                                {user.avatar}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-display font-semibold truncate">
                                                    {user.username}
                                                </h3>
                                                {user.isCurrentUser && (
                                                    <Badge variant="outline" className="text-xs">You</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Trophy className="w-3 h-3" />
                                                    <span>{user.totalDebates} debates</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Target className="w-3 h-3" />
                                                    <span>{user.winRate}% win rate</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Score */}
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">{user.score}</div>
                                            <Badge className={`${getBadgeColor(user.badge)} text-white text-xs`}>
                                                {user.badge}
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="weekly">
                            <Card className="p-12 text-center">
                                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="font-display font-semibold text-xl mb-2">Weekly Rankings Coming Soon</h3>
                                <p className="text-muted-foreground">
                                    Weekly leaderboard resets every Monday. Keep debating to climb the ranks!
                                </p>
                            </Card>
                        </TabsContent>

                        <TabsContent value="category">
                            <Card className="p-12 text-center">
                                <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="font-display font-semibold text-xl mb-2">Category Rankings Coming Soon</h3>
                                <p className="text-muted-foreground">
                                    See who's leading in Technology, Science, Politics, and more!
                                </p>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Leaderboard;
