import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center shadow-glow">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai to-user">
                                DebateAI
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Master the art of argumentation with AI-powered debate practice.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="font-display font-semibold">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                            <li><a href="#topics" className="hover:text-foreground transition-colors">Topics</a></li>
                            <li><Link to="/debate" className="hover:text-foreground transition-colors">Start Debating</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="font-display font-semibold">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                            <li><Link to="/history" className="hover:text-foreground transition-colors">History</Link></li>
                            <li><Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
                            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-display font-semibold">Account</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/profile" className="hover:text-foreground transition-colors">Profile</Link></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Settings</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2024 DebateAI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                        <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                        <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
