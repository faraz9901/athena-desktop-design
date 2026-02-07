import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    Calendar,
    Clock,
    FolderOpen,
    Package,
    TrendingUp,
    Users
} from "lucide-react";

const DashboardPage = () => {
    const stats = [
        {
            title: "Total Projects",
            value: "12",
            change: "+2 this month",
            icon: FolderOpen,
            trend: "up",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Active Sites",
            value: "8",
            change: "3 need attention",
            icon: Activity,
            trend: "neutral",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Materials Low",
            value: "5",
            change: "Reorder needed",
            icon: Package,
            trend: "down",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Pending Tasks",
            value: "23",
            change: "Due this week",
            icon: Clock,
            trend: "up",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    const recentProjects = [
        { name: "Highway Expansion", status: "On Track", progress: 75 },
        { name: "Metro Station Phase 2", status: "Delayed", progress: 45 },
        { name: "Residential Complex", status: "On Track", progress: 90 },
    ];

    const quickActions = [
        { label: "Create Project", icon: FolderOpen, description: "Start a new construction project" },
        { label: "Add Material", icon: Package, description: "Log new material inventory" },
        { label: "Add Worker", icon: Users, description: "Register new team member" },
        { label: "View Reports", icon: BarChart3, description: "Access analytics & insights" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={i}
                            className="border-l-4 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                            style={{ borderLeftColor: `hsl(var(--primary))` }}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardDescription className="text-sm font-medium">
                                            {stat.title}
                                        </CardDescription>
                                        <CardTitle className="text-3xl font-bold mt-2 text-foreground">
                                            {stat.value}
                                        </CardTitle>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
                                    {stat.trend === "down" && <AlertCircle className="w-4 h-4 text-orange-600" />}
                                    <span>{stat.change}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Projects */}
                <Card className="lg:col-span-2 shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Recent Projects</CardTitle>
                                <CardDescription>Your active construction projects</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                                View All
                                <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentProjects.map((project, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {project.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right">
                                                {project.progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "On Track"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                                }`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Quick Actions</CardTitle>
                        <CardDescription>Common tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {quickActions.map((action, i) => {
                                const Icon = action.icon;
                                return (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        className="w-full h-auto py-3 px-4 justify-start hover:bg-primary/5 hover:border-primary/50 transition-all group"
                                    >
                                        <div className="flex items-start gap-3 text-left">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm text-foreground">
                                                    {action.label}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart Placeholder */}
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Project Timeline</CardTitle>
                            <CardDescription>Overview of project schedules and milestones</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            This Month
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-64 rounded-lg bg-gradient-to-br from-muted/50 via-muted/30 to-accent/10 flex flex-col items-center justify-center border-2 border-dashed border-border">
                        <BarChart3 className="w-16 h-16 text-muted-foreground/40 mb-4" />
                        <p className="text-muted-foreground font-medium">Chart visualization will appear here</p>
                        <p className="text-sm text-muted-foreground/70 mt-1">Project analytics and insights</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
