import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Building2,
    Calendar,
    Clock,
    FolderOpen,
    MapPin,
    Plus,
    Search,
    Users
} from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
    const projects = [
        {
            name: "Highway Expansion Project",
            location: "Mumbai-Pune Highway",
            status: "In Progress",
            progress: 75,
            team: 45,
            deadline: "Dec 2026",
            budget: "₹25 Cr",
            type: "Government",
        },
        {
            name: "Metro Station Phase 2",
            location: "Bangalore Metro",
            status: "Delayed",
            progress: 45,
            team: 32,
            deadline: "Mar 2027",
            budget: "₹18 Cr",
            type: "Government",
        },
        {
            name: "Residential Complex",
            location: "Sector 62, Noida",
            status: "On Track",
            progress: 90,
            team: 28,
            deadline: "Aug 2026",
            budget: "₹12 Cr",
            type: "Private",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                    <p className="text-muted-foreground mt-1">Manage your construction projects</p>
                </div>
                <Button className="gap-2 h-11 shadow-md">
                    <Link to="/projects/create" className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        New Project
                    </Link>
                </Button>
            </div>

            {/* Search and Filter */}
            <Card className="shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            Filter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <Card
                            key={i}
                            className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4"
                            style={{
                                borderLeftColor:
                                    project.status === "On Track"
                                        ? "#10b981"
                                        : project.status === "Delayed"
                                            ? "#f59e0b"
                                            : "hsl(var(--primary))",
                            }}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {project.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1.5 mt-2">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {project.location}
                                        </CardDescription>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "On Track"
                                            ? "bg-green-100 text-green-700"
                                            : project.status === "Delayed"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Progress Bar */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Progress</span>
                                        <span className="text-sm font-bold text-foreground">{project.progress}%</span>
                                    </div>
                                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Project Info Grid */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Users className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Team Size</p>
                                            <p className="text-sm font-semibold text-foreground">{project.team} members</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Deadline</p>
                                            <p className="text-sm font-semibold text-foreground">{project.deadline}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                            <Building2 className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Type</p>
                                            <p className="text-sm font-semibold text-foreground">{project.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                            <FolderOpen className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Budget</p>
                                            <p className="text-sm font-semibold text-foreground">{project.budget}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="shadow-sm">
                    <CardContent className="py-16">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                <FolderOpen className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Yet</h3>
                            <p className="text-muted-foreground mb-6 max-w-sm">
                                Get started by creating your first construction project
                            </p>
                            <Button className="gap-2">
                                <Plus className="w-5 h-5" />
                                Create Your First Project
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ProjectsPage;
