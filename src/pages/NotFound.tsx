import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-bg p-4">
            <Card className="max-w-md w-full p-8 text-center space-y-6">
                <div className="space-y-2">
                    <div className="text-8xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai to-user">
                        404
                    </div>
                    <h1 className="text-2xl font-display font-bold">Page Not Found</h1>
                    <p className="text-muted-foreground">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button asChild className="flex-1">
                        <Link to="/">
                            <Home className="w-4 h-4 mr-2" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                        <Link to="/debate">
                            <Search className="w-4 h-4 mr-2" />
                            Start Debating
                        </Link>
                    </Button>
                </div>

                <div className="pt-4 border-t">
                    <Button asChild variant="ghost" size="sm">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-3 h-3 mr-2" />
                            Back to previous page
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default NotFound;
