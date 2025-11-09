import { Button } from "@/components/ui/button";
import { Sparkles, Menu, LogOut, User as UserIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const isHome = location.pathname === "/";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai to-user">
                            DebateAI
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {isHome ? (
                            <>
                                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    How It Works
                                </a>
                                <a href="#topics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Topics
                                </a>
                            </>
                        ) : (
                            <>
                                <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    About
                                </Link>
                                {isAuthenticated && (
                                    <>
                                        <Link to="/history" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            History
                                        </Link>
                                        <Link to="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            Leaderboard
                                        </Link>
                                    </>
                                )}
                                <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    {!isHome && (
                                        <Button asChild variant="outline">
                                            <Link to="/">Home</Link>
                                        </Button>
                                    )}

                                    {/* User Menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarFallback className="text-xs bg-gradient-ai">
                                                        {user?.username.substring(0, 2).toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="hidden lg:inline">{user?.username}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem asChild>
                                                <Link to="/profile" className="cursor-pointer">
                                                    <UserIcon className="w-4 h-4 mr-2" />
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link to="/history" className="cursor-pointer">
                                                    History
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <>
                                    <Button asChild variant="outline">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    {isHome && (
                                        <Button asChild className="bg-gradient-ai hover:opacity-90 transition-opacity">
                                            <Link to="/debate">Start Debating</Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="md:hidden">
                                <Button variant="outline" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link to="/">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/about">About</Link>
                                </DropdownMenuItem>
                                {isAuthenticated ? (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link to="/debate">Start Debating</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/history">History</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/leaderboard">Leaderboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link to="/login">Login</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/debate">Start Debating</Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuItem asChild>
                                    <Link to="/contact">Contact</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};
