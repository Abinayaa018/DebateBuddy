import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Topic",
    description: "Select from our curated list of debate topics across multiple categories and difficulty levels.",
  },
  {
    number: "02",
    title: "Present Your Arguments",
    description: "Make your case with well-reasoned arguments, evidence, and logical reasoning.",
  },
  {
    number: "03",
    title: "AI Responds & Challenges",
    description: "The AI opponent will counter your points, identify weaknesses, and present opposing views.",
  },
  {
    number: "04",
    title: "Get Scored & Improve",
    description: "Receive real-time scoring on argument quality, logic, and persuasiveness to track your growth.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start debating in minutes with our simple process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-ai via-user to-ai opacity-20" />
          
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative bg-card/50 backdrop-blur-sm border-border/50 p-8 hover:shadow-card transition-all duration-300 hover:scale-105"
            >
              <div className="space-y-4">
                {/* Number Badge */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai to-user flex items-center justify-center shadow-glow">
                    <span className="text-2xl font-display font-bold text-white">{step.number}</span>
                  </div>
                  <CheckCircle2 className="absolute -top-2 -right-2 w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-display font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
