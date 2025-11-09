import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Brain, Target, Trophy, Users, Sparkles, CheckCircle2 } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-ai/10 border border-ai/20">
                            <Sparkles className="w-4 h-4 text-ai" />
                            <span className="text-sm font-medium">About DebateAI</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold max-w-4xl mx-auto">
                            Master the Art of{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ai to-user">
                                Persuasion
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            DebateAI is an advanced platform designed to help you develop critical thinking,
                            logical reasoning, and persuasive communication skills through AI-powered debates.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-display font-bold">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                In a world where effective communication and critical thinking are more important than ever,
                                we believe everyone should have access to tools that help them develop these essential skills.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                DebateAI leverages cutting-edge artificial intelligence to create a safe, judgment-free
                                environment where you can practice debating on any topic, at any time, and receive immediate,
                                constructive feedback.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-ai shrink-0" />
                                    <span>Develop critical thinking skills</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-ai shrink-0" />
                                    <span>Practice anytime, anywhere</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-ai shrink-0" />
                                    <span>Get instant feedback and scoring</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-ai shrink-0" />
                                    <span>Track your progress over time</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-6 bg-gradient-to-br from-ai/10 to-transparent border-ai/20">
                                <Trophy className="w-10 h-10 text-ai mb-4" />
                                <h3 className="font-display font-semibold text-2xl mb-2">1000+</h3>
                                <p className="text-sm text-muted-foreground">Debates Completed</p>
                            </Card>
                            <Card className="p-6 bg-gradient-to-br from-user/10 to-transparent border-user/20">
                                <Users className="w-10 h-10 text-user mb-4" />
                                <h3 className="font-display font-semibold text-2xl mb-2">500+</h3>
                                <p className="text-sm text-muted-foreground">Active Users</p>
                            </Card>
                            <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                                <Target className="w-10 h-10 text-primary mb-4" />
                                <h3 className="font-display font-semibold text-2xl mb-2">20+</h3>
                                <p className="text-sm text-muted-foreground">Topic Categories</p>
                            </Card>
                            <Card className="p-6 bg-gradient-to-br from-ai-secondary/10 to-transparent border-ai-secondary/20">
                                <Brain className="w-10 h-10 text-ai-secondary mb-4" />
                                <h3 className="font-display font-semibold text-2xl mb-2">AI</h3>
                                <p className="text-sm text-muted-foreground">Powered Analysis</p>
                            </Card>
                        </div>
                    </div>

                    {/* How It Helps Section */}
                    <div className="space-y-8 mb-20">
                        <h2 className="text-3xl font-display font-bold text-center">How DebateAI Helps You</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-ai flex items-center justify-center">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <h3 className="font-display font-semibold text-xl">Critical Thinking</h3>
                                <p className="text-muted-foreground">
                                    Learn to analyze arguments, identify logical fallacies, and construct well-reasoned
                                    responses that strengthen your position.
                                </p>
                            </Card>

                            <Card className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-user flex items-center justify-center">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="font-display font-semibold text-xl">Confidence Building</h3>
                                <p className="text-muted-foreground">
                                    Practice makes perfect. Build confidence in your ability to articulate ideas and
                                    defend your positions in real-world situations.
                                </p>
                            </Card>

                            <Card className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-ai flex items-center justify-center">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <h3 className="font-display font-semibold text-xl">Skill Mastery</h3>
                                <p className="text-muted-foreground">
                                    Track your progress with detailed metrics and watch yourself improve over time as
                                    you master the art of debate.
                                </p>
                            </Card>
                        </div>
                    </div>

                    {/* Technology Section */}
                    <div className="text-center space-y-6">
                        <h2 className="text-3xl font-display font-bold">Powered by Advanced AI</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our platform uses state-of-the-art artificial intelligence to provide you with challenging,
                            intelligent opposition and detailed feedback on your argumentation skills. Every debate is
                            an opportunity to learn and grow.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
