import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DebateTopic } from "@/types/debate";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const { login: authLogin } = useAuth();

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // Get the redirect path and topic from location state
    const from = (location.state as { from?: { pathname: string }; topic?: DebateTopic })?.from?.pathname || "/";
    const topic = (location.state as { from?: { pathname: string }; topic?: DebateTopic })?.topic;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Auto-login with any credentials (demo mode)
        const userData = {
            username: loginData.email ? loginData.email.split("@")[0] : "DemoUser",
            email: loginData.email || "demo@debateai.com",
        };

        // Use AuthContext login method
        authLogin(userData);

        toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
        });

        setIsLoading(false);

        // Redirect to the page they were trying to access or home
        if (topic) {
            navigate(from, { replace: true, state: { topic } });
        } else {
            navigate(from, { replace: true });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Auto-signup with any credentials (demo mode)
        const userData = {
            username: signupData.username || signupData.email.split("@")[0] || "DemoUser",
            email: signupData.email || "demo@debateai.com",
        };

        // Use AuthContext login method
        authLogin(userData);

        toast({
            title: "Account created!",
            description: "Welcome to DebateAI.",
        });

        setIsLoading(false);

        if (topic) {
            navigate(from, { replace: true, state: { topic } });
        } else {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-ai flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai to-user">
                            DebateAI
                        </span>
                    </Link>
                    <p className="text-muted-foreground mt-4">
                        Master the art of argumentation
                    </p>
                </div>

                <Card className="p-6">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        {/* Login Tab */}
                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10"
                                            value={loginData.email}
                                            onChange={(e) =>
                                                setLoginData({ ...loginData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={loginData.password}
                                            onChange={(e) =>
                                                setLoginData({ ...loginData, password: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-muted-foreground">Remember me</span>
                                    </label>
                                    <a href="#" className="text-ai hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-ai hover:opacity-90"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        "Logging in..."
                                    ) : (
                                        <>
                                            Login
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Signup Tab */}
                        <TabsContent value="signup">
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-username">Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="signup-username"
                                            type="text"
                                            placeholder="johndoe"
                                            className="pl-10"
                                            value={signupData.username}
                                            onChange={(e) =>
                                                setSignupData({ ...signupData, username: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10"
                                            value={signupData.email}
                                            onChange={(e) =>
                                                setSignupData({ ...signupData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={signupData.password}
                                            onChange={(e) =>
                                                setSignupData({ ...signupData, password: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="signup-confirm"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={signupData.confirmPassword}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    confirmPassword: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-user hover:opacity-90"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        "Creating account..."
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-ai hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-ai hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </Card>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
