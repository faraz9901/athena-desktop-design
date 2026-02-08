import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageCircle, Plus, Search, Users } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

// Mock Data from mobile app
const projects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

export default function ChatLayout() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [search, setSearch] = useState("");

    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background border rounded-lg shadow-sm m-4">
            {/* Sidebar / Project List */}
            <div className="w-80 border-r flex flex-col bg-muted/10">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-9 bg-background"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {filteredProjects.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No projects found</p>
                            </div>
                        ) : (
                            filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => navigate(`/chat/${project.id}`)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                                        Number(projectId) === project.id ? "bg-primary/10 text-primary" : "text-foreground"
                                    )}
                                >
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarFallback className={cn(
                                            "font-semibold",
                                            Number(projectId) === project.id ? "bg-primary text-primary-foreground" : "bg-muted"
                                        )}>
                                            {project.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium truncate">{project.name}</span>
                                            {/* Mock time - could be real later */}
                                            <span className="text-[10px] text-muted-foreground">09:41</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span className="truncate">Project Group</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-background">
                <Outlet />
            </div>
        </div>
    );
}
