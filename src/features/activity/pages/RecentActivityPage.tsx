import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, FileCheck, MessageSquare, AlertCircle } from "lucide-react";

const RecentActivityPage = () => {
    const activities = [
        {
            icon: FileCheck,
            title: "Task Completed",
            description: "Foundation pouring marked as complete",
            project: "City Center Mall",
            time: "2 hours ago",
            user: "John Doe"
        },
        {
            icon: MessageSquare,
            title: "New Comment",
            description: "Added a comment on structural drawings",
            project: "Highway 45",
            time: "4 hours ago",
            user: "Jane Smith"
        },
        {
            icon: AlertCircle,
            title: "Issue Reported",
            description: "Material shortage reported for cement",
            project: "Green Valley",
            time: "1 day ago",
            user: "Mike Johnson"
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Recent Activity</h1>
                <p className="text-muted-foreground">Track latest updates across all projects</p>
            </div>

            <div className="space-y-4">
                {activities.map((item, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <Badge variant="secondary" className="font-normal">{item.project}</Badge>
                                    <span>•</span>
                                    <span>by {item.user}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecentActivityPage;
