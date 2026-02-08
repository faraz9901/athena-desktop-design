import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Crown, LogOut, Mail, Phone, Settings, User } from "lucide-react";

const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    company: "ABC Construction Pvt Ltd",
    avatar: "JD",
    plan: {
        name: "Professional",
        tier: "pro",
        projects: 15,
        maxProjects: 50,
        storage: 45,
        maxStorage: 100,
        expiresAt: "2025-12-31"
    }
};

const ProfilePage = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-foreground">Profile</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* Profile Header */}
                <Card className="border-none shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                                    {mockUser.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold">{mockUser.name}</h1>
                                    <Badge className="bg-primary text-primary-foreground">
                                        <Crown className="h-3 w-3 mr-1" />
                                        {mockUser.plan.name}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{mockUser.company}</p>
                                <p className="text-sm text-muted-foreground mt-1">{mockUser.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="h-5 w-5" />
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-base font-medium">{mockUser.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="text-base font-medium">{mockUser.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:col-span-2">
                                <Building2 className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">Company</p>
                                    <p className="text-base font-medium">{mockUser.company}</p>
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full md:w-auto">
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* Settings */}
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings className="h-5 w-5" />
                            <h2 className="text-xl font-semibold">Settings</h2>
                        </div>

                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                App Settings
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <User className="mr-2 h-4 w-4" />
                                Account Settings
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Logout */}
                <Button variant="destructive" className="w-full md:w-auto">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;
