import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-ai/10 border border-ai/20 mb-4">
                            <Mail className="w-4 h-4 text-ai" />
                            <span className="text-sm font-medium">Get in Touch</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Have questions or feedback? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <Card className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this about?"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more..."
                                        rows={6}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>Sending...</>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-ai flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-semibold text-lg mb-2">
                                            Email Us
                                        </h3>
                                        <p className="text-muted-foreground mb-2">
                                            For general inquiries and support
                                        </p>
                                        <a
                                            href="mailto:support@debateai.com"
                                            className="text-ai hover:underline"
                                        >
                                            support@debateai.com
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-user flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-semibold text-lg mb-2">
                                            Live Chat
                                        </h3>
                                        <p className="text-muted-foreground mb-2">
                                            Get instant help from our support team
                                        </p>
                                        <Button variant="outline" size="sm">
                                            Start Chat
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-ai/5 to-user/5">
                                <h3 className="font-display font-semibold text-lg mb-4">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-ai shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium mb-1">How does scoring work?</p>
                                            <p className="text-sm text-muted-foreground">
                                                Scores are based on argument strength, logic, evidence, and persuasiveness.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-ai shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium mb-1">Can I practice any topic?</p>
                                            <p className="text-sm text-muted-foreground">
                                                Yes! Choose from 20+ curated topics or suggest your own.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-ai shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium mb-1">Is my data private?</p>
                                            <p className="text-sm text-muted-foreground">
                                                Absolutely. We prioritize your privacy and data security.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
