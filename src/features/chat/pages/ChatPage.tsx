import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Phone, Video } from "lucide-react";

const ChatPage = () => {
    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6">
            {/* Sidebar */}
            <Card className="w-80 flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search chats..." className="pl-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-4 hover:bg-muted cursor-pointer transition-colors border-b last:border-0">
                            <Avatar>
                                <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-semibold truncate">User {i}</span>
                                    <span className="text-xs text-muted-foreground">10:30 AM</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">Latest message preview...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback>U1</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">User 1</h3>
                            <p className="text-sm text-muted-foreground">Online</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-secondary/10">
                    <div className="flex justify-start">
                        <div className="bg-background border rounded-lg p-3 max-w-[70%]">
                            <p className="text-sm">Hello, how is the project going?</p>
                            <span className="text-xs text-muted-foreground mt-1 block">10:00 AM</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                            <p className="text-sm">Everything is on track. We just finished the foundation.</p>
                            <span className="text-xs text-primary-foreground/70 mt-1 block">10:05 AM</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button size="icon"><Send className="h-4 w-4" /></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ChatPage;
