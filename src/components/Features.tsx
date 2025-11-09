import { Card } from "@/components/ui/card";
import { Brain, MessageSquare, TrendingUp, Target, Zap, Award } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Opponent",
    description: "Debate against advanced AI that adapts to your arguments and challenges your reasoning.",
    gradient: "from-ai to-ai-secondary",
  },
  {
    icon: MessageSquare,
    title: "Real-time Feedback",
    description: "Get instant analysis on your argument quality, logic strength, and persuasiveness.",
    gradient: "from-user to-user-secondary",
  },
  {
    icon: TrendingUp,
    title: "Skill Tracking",
    description: "Monitor your progress with detailed scoring and performance metrics over time.",
    gradient: "from-primary to-ai",
  },
  {
    icon: Target,
    title: "Diverse Topics",
    description: "Choose from technology, ethics, politics, science, and more debate categories.",
    gradient: "from-user to-primary",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "No waiting - engage in fluid, natural debates with lightning-fast AI responses.",
    gradient: "from-ai-secondary to-user",
  },
  {
    icon: Award,
    title: "Argument Analysis",
    description: "Receive detailed breakdowns of argument strengths, weaknesses, and improvements.",
    gradient: "from-user-secondary to-ai",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Why Choose DebateAI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to become a master debater
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 p-8 hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                   style={{ backgroundImage: `linear-gradient(to bottom right, hsl(var(--${feature.gradient.split(' ')[0].replace('from-', '')})), hsl(var(--${feature.gradient.split(' ')[1].replace('to-', '')})))` }} />
              
              <div className="relative space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glow`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
