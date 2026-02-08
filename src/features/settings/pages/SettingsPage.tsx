import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Updated import to use correct components
import { Bell, Lock, User, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // Assuming you might have a Switch component, if not, I'll use a checkbox or button for toggle visuals for now, but commonly Shadcn has Switch. I will assume Switch is not there and use a simple UI or just text for now to be safe, or check if I can check for Switch. Re-reading: I should stick to standard HTML or simple components if I'm not sure. I'll use standard inputs for toggles or simple checkboxes for now to avoid missing component errors, or wait... I can create a simple Switch-like button. Let's use simple toggles for now.

const SettingsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your application preferences</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">General</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Notifications</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Security</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                                <CardDescription>Manage your profile and display settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Organization Name</Label>
                                    <Input defaultValue="ABC Construction Pvt Ltd" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Language</Label>
                                    <Input defaultValue="English" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Timezone</Label>
                                    <Input defaultValue="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Choose what you want to be notified about</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-2 border rounded">
                                    <div className="flex items-center gap-2">
                                        <Bell className="h-4 w-4" />
                                        <span>Email Notifications</span>
                                    </div>
                                    <span className="text-primary font-bold">On</span>
                                </div>
                                <div className="flex items-center justify-between p-2 border rounded">
                                    <div className="flex items-center gap-2">
                                        <Bell className="h-4 w-4" />
                                        <span>Push Notifications</span>
                                    </div>
                                    <span className="text-primary font-bold">On</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your password and security preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>New Password</Label>
                                    <Input type="password" />
                                </div>
                                <Button>Change Password</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default SettingsPage;
