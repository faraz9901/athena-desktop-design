import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, DollarSign, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock notifications data
const taskAlerts = [
    { id: 1, title: "Task Deadline Approaching", message: "Foundation Inspection is due in 2 hours", project: "Highway 45", time: "5m ago", read: false, type: "task" },
    { id: 2, title: "Task Completed", message: "Structural Drawings finalized by John Doe", project: "City Center Mall", time: "1h ago", read: false, type: "task" },
    { id: 3, title: "New Task Assigned", message: "You have been assigned to 'Material Procurement'", project: "Green Valley", time: "3h ago", read: true, type: "task" }
];

const budgetAlerts = [
    { id: 1, title: "Budget Threshold Reached", message: "City Center Mall has reached 85% of allocated budget", project: "City Center Mall", amount: "Rs 1,020,000", threshold: 85, time: "10m ago", read: false, type: "budget" },
    { id: 2, title: "Budget Warning", message: "Highway 45 has reached 70% of allocated budget", project: "Highway 45", amount: "Rs 3,150,000", threshold: 70, time: "2h ago", read: false, type: "budget" },
];

const systemMessages = [
    { id: 1, title: "System Maintenance", message: "Scheduled maintenance on Feb 1, 2025 from 2:00 AM to 4:00 AM", time: "2d ago", read: false, type: "system" },
    { id: 2, title: "New Feature Available", message: "OCR document scanning is now available for all projects", time: "5d ago", read: true, type: "system" },
];

const getThresholdColor = (threshold: number) => {
    if (threshold >= 100) return "bg-red-100 text-red-700 border-red-200";
    if (threshold >= 85) return "bg-orange-100 text-orange-700 border-orange-200";
    if (threshold >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
};

const NotificationsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your project activities</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="budget">Project</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3 mt-6">
                    {[...taskAlerts, ...budgetAlerts, ...systemMessages].map((item: any) => (
                        <Card key={item.id} className={cn("border-none shadow-sm", !item.read && "ring-2 ring-primary/20 bg-primary/5")}>
                            <CardContent className="p-4">
                                <div className="flex gap-3">
                                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                        item.type === "task" ? "bg-blue-100 text-blue-600" :
                                            item.type === "budget" ? "bg-orange-100 text-orange-600" :
                                                "bg-gray-100 text-gray-600")}>
                                        {item.type === "task" ? <CheckCircle2 className="h-5 w-5" /> :
                                            item.type === "budget" ? <DollarSign className="h-5 w-5" /> :
                                                <Info className="h-5 w-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className={cn("text-sm font-semibold", !item.read && "text-foreground")}>{item.title}</h4>
                                            {!item.read && <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{item.message}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            {item.project && <span className="text-xs text-muted-foreground">{item.project}</span>}
                                            {item.project && <span className="text-xs text-muted-foreground">•</span>}
                                            <span className="text-xs text-muted-foreground">{item.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="tasks" className="space-y-3 mt-6">
                    {taskAlerts.map((alert) => (
                        <Card key={alert.id} className={cn("border-none shadow-sm", !alert.read && "ring-2 ring-primary/20 bg-primary/5")}>
                            <CardContent className="p-4">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className={cn("text-sm font-semibold", !alert.read && "text-foreground")}>{alert.title}</h4>
                                            {!alert.read && <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs text-muted-foreground">{alert.project}</span>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="budget" className="space-y-3 mt-6">
                    {budgetAlerts.map((alert) => (
                        <Card key={alert.id} className={cn("border-none shadow-sm", !alert.read && "ring-2 ring-primary/20 bg-primary/5")}>
                            <CardContent className="p-4">
                                <div className="flex gap-3">
                                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", getThresholdColor(alert.threshold).replace("border", "bg"))}>
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className={cn("text-sm font-semibold", !alert.read && "text-foreground")}>{alert.title}</h4>
                                            {!alert.read && <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <Badge className={cn("text-xs font-semibold border", getThresholdColor(alert.threshold))}>{alert.threshold}%</Badge>
                                            <span className="text-xs font-medium">{alert.amount}</span>
                                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="system" className="space-y-3 mt-6">
                    {systemMessages.map((message) => (
                        <Card key={message.id} className={cn("border-none shadow-sm", !message.read && "ring-2 ring-primary/20 bg-primary/5")}>
                            <CardContent className="p-4">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                                        <Info className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className={cn("text-sm font-semibold", !message.read && "text-foreground")}>{message.title}</h4>
                                            {!message.read && <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{message.message}</p>
                                        <span className="text-xs text-muted-foreground mt-2 block">{message.time}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default NotificationsPage;
