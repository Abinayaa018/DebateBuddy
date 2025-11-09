import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-bg" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ai/20 via-transparent to-transparent" />

            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="container relative mx-auto px-4 py-20">
                <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 shadow-card">
                        <Zap className="w-4 h-4 text-ai" />
                        <span className="text-sm font-medium">AI-Powered Debate Practice</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
                        Master the Art of{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-ai via-user to-ai bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                            Argumentation
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        Practice debating with advanced AI opponents. Sharpen your critical thinking,
                        build stronger arguments, and become a more persuasive communicator.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Button asChild size="lg" className="bg-gradient-ai hover:opacity-90 transition-opacity shadow-glow text-lg h-14 px-8">
                            <a href="#topics">
                                Start Debating Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
                            <a href="#how-it-works">Learn How It Works</a>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 pt-12 w-full max-w-2xl">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center">
                                <Target className="w-5 h-5 text-ai mr-2" />
                                <span className="text-3xl font-display font-bold">20+</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Debate Topics</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-user mr-2" />
                                <span className="text-3xl font-display font-bold">AI</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Powered Analysis</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center">
                                <Zap className="w-5 h-5 text-primary mr-2" />
                                <span className="text-3xl font-display font-bold">Real-time</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Scoring System</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-ai/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-user/30 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        </section>
    );
};
