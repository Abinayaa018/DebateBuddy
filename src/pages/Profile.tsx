import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import {
    User,
    Settings,
    Bell,
    Shield,
    Palette,
    Save,
    Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
    const { toast } = useToast();
    const { user } = useAuth();

    const [profile, setProfile] = useState({
        username: user?.username || "User",
        email: user?.email || "user@example.com",
        bio: "Passionate debater practicing to improve my argumentation skills.",
        avatar: user?.username.substring(0, 2).toUpperCase() || "U",
    });

    const [settings, setSettings] = useState({
        emailNotifications: true,
        debateReminders: true,
        scoreUpdates: true,
        weeklyDigest: false,
        soundEffects: true,
        autoSave: true,
        difficultyLevel: "medium",
    });

    const handleSaveProfile = () => {
        toast({
            title: "Profile Updated",
            description: "Your profile has been saved successfully.",
        });
    };

    const handleSaveSettings = () => {
        toast({
            title: "Settings Updated",
            description: "Your preferences have been saved.",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Profile & Settings
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Manage your account and preferences
                        </p>
                    </div>

                    <Tabs defaultValue="profile" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="profile">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </TabsTrigger>
                            <TabsTrigger value="settings">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </TabsTrigger>
                            <TabsTrigger value="notifications">
                                <Bell className="w-4 h-4 mr-2" />
                                Notifications
                            </TabsTrigger>
                            <TabsTrigger value="privacy">
                                <Shield className="w-4 h-4 mr-2" />
                                Privacy
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card className="p-6">
                                <div className="space-y-6">
                                    {/* Avatar Section */}
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <Avatar className="w-24 h-24">
                                                <AvatarFallback className="text-3xl font-bold bg-gradient-ai">
                                                    {profile.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="absolute -bottom-2 -right-2 rounded-full"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="font-display font-semibold text-lg mb-1">
                                                Profile Picture
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Upload a new avatar or choose from our collection
                                            </p>
                                            <Button variant="outline" size="sm">
                                                Change Avatar
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6 space-y-4">
                                        {/* Username */}
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                id="username"
                                                value={profile.username}
                                                onChange={(e) =>
                                                    setProfile({ ...profile, username: e.target.value })
                                                }
                                                placeholder="Enter your username"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) =>
                                                    setProfile({ ...profile, email: e.target.value })
                                                }
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        {/* Bio */}
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={profile.bio}
                                                onChange={(e) =>
                                                    setProfile({ ...profile, bio: e.target.value })
                                                }
                                                placeholder="Tell us about yourself"
                                                rows={4}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Brief description for your profile. Max 200 characters.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveProfile} className="gap-2">
                                            <Save className="w-4 h-4" />
                                            Save Profile
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings">
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display font-semibold text-lg mb-4">
                                            General Settings
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Sound Effects</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Play sounds during debates
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={settings.soundEffects}
                                                    onCheckedChange={(checked) =>
                                                        setSettings({ ...settings, soundEffects: checked })
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Auto-save</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Automatically save debate progress
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={settings.autoSave}
                                                    onCheckedChange={(checked) =>
                                                        setSettings({ ...settings, autoSave: checked })
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="difficulty">Default Difficulty</Label>
                                                <select
                                                    id="difficulty"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                                                    value={settings.difficultyLevel}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, difficultyLevel: e.target.value })
                                                    }
                                                >
                                                    <option value="easy">Easy</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="hard">Hard</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Palette className="w-5 h-5 text-ai" />
                                            <h3 className="font-display font-semibold text-lg">
                                                Appearance
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Theme customization coming soon. Stay tuned!
                                        </p>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveSettings} className="gap-2">
                                            <Save className="w-4 h-4" />
                                            Save Settings
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Notifications Tab */}
                        <TabsContent value="notifications">
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display font-semibold text-lg mb-4">
                                            Email Notifications
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>General Notifications</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive updates about your debates
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={settings.emailNotifications}
                                                    onCheckedChange={(checked) =>
                                                        setSettings({ ...settings, emailNotifications: checked })
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Debate Reminders</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Get reminded about ongoing debates
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={settings.debateReminders}
                                                    onCheckedChange={(checked) =>
                                                        setSettings({ ...settings, debateReminders: checked })
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Score Updates</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Notifications about your score changes
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={settings.scoreUpdates}
                                                    onCheckedChange={(checked) =>
                                                        setSettings({ ...settings, scoreUpdates: checked })
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Weekly Digest</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Weekly summary of your debate activity
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={settings.weeklyDigest}
                                                    onCheckedChange={(checked) =>
                                                        setSettings({ ...settings, weeklyDigest: checked })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveSettings} className="gap-2">
                                            <Save className="w-4 h-4" />
                                            Save Preferences
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Privacy Tab */}
                        <TabsContent value="privacy">
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display font-semibold text-lg mb-2">
                                            Privacy & Security
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            Manage how your data is used and shared
                                        </p>

                                        <div className="space-y-4">
                                            <Card className="p-4 bg-card/50">
                                                <h4 className="font-semibold mb-2">Data Usage</h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Your debate data is used to improve AI responses and provide personalized feedback.
                                                </p>
                                                <Button variant="outline" size="sm">
                                                    Learn More
                                                </Button>
                                            </Card>

                                            <Card className="p-4 bg-card/50">
                                                <h4 className="font-semibold mb-2">Account Security</h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Keep your account secure with a strong password.
                                                </p>
                                                <Button variant="outline" size="sm">
                                                    Change Password
                                                </Button>
                                            </Card>

                                            <Card className="p-4 bg-card/50">
                                                <h4 className="font-semibold mb-2">Delete Account</h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Permanently delete your account and all associated data.
                                                </p>
                                                <Button variant="destructive" size="sm">
                                                    Delete Account
                                                </Button>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
