import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building2, Database, FileSpreadsheet, FileText, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { GanttGraph } from "../components/project-detail/GanttGraph";
import { ProjectFiles } from "../components/project-detail/ProjectFiles";
import { ProjectPartners } from "../components/project-detail/ProjectPartners";
import { ProjectWorkflow } from "../components/project-detail/ProjectWorkflow";
import { RiskPieChart } from "../components/project-detail/RiskPieChart";

// Recreate Mock Project to avoid missing dependency
const MOCK_PROJECTS = [
    {
        id: "1",
        name: "City Center Mall Renovation",
        status: "Active",
        location: "Downtown District, Metro City",
        totalAmount: 1200000,
        startDate: "2025-01-01",
        endDate: "2025-12-30"
    }
];

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find project from mock data
    const projectData = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];

    // Fallback or derived data
    const project = {
        title: projectData?.name || "City Center Mall Renovation",
        status: projectData?.status || "Active",
        department: "Urban Development Authority",
        tenderId: "TDR-2024-892",
        location: projectData?.location || "Downtown District, Metro City",
        progress: 65,
        budget: {
            total: projectData?.totalAmount || 1200000,
            spent: 450000,
            remaining: (projectData?.totalAmount || 1200000) - 450000
        },
        dates: {
            start: "01 Jan 2025",
            end: "30 Dec 2025"
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="bg-card border shadow-sm hover:bg-muted"
                            onClick={() => navigate("/projects")}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none text-white px-2.5 py-0.5">
                                    {project.status}
                                </Badge>
                                <span className="text-xs font-mono text-muted-foreground border rounded px-1.5 py-0.5">{project.tenderId}</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                                <div className="flex items-center gap-1.5">
                                    <Building2 className="h-4 w-4" />
                                    <span>{project.department}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span>{project.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline">
                            Edit Project
                        </Button>
                        <Button onClick={() => navigate(`/projects/${id}/pending-actions`)}>
                            View Pending Actions
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-primary text-primary-foreground border-none shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Database className="h-20 w-20" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Total Budget</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rs. {(project.budget.total / 1000).toFixed(0)}k</div>
                            <p className="text-xs opacity-70 mt-1">Allocated Funds</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Spent Budget</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rs. {(project.budget.spent / 1000).toFixed(0)}k</div>
                            <Progress value={(project.budget.spent / project.budget.total) * 100} className="h-1.5 mt-3" />
                            <p className="text-xs text-muted-foreground mt-2">
                                {((project.budget.spent / project.budget.total) * 100).toFixed(1)}% utilised
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Time Elapsed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45 Days</div>
                            <Progress value={35} className="h-1.5 mt-3" />
                            <p className="text-xs text-muted-foreground mt-2">
                                35% timeline completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Project Health</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">On Track</div>
                            <p className="text-xs text-muted-foreground mt-1">No critical risks flagged</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="workflow" className="w-full space-y-6">
                <div className="flex justify-between items-center border-b pb-1">
                    <TabsList className="bg-transparent h-auto p-0 gap-6">
                        {["Workflow", "Files", "Report & Analytics", "Team & Partners"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab === "Team & Partners" ? "others" : tab.toLowerCase()}
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-2.5 font-medium bg-transparent shadow-none transition-none"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left/Main Column - Context aware */}
                    <div className="col-span-1 lg:col-span-12">
                        <TabsContent value="workflow" className="mt-0 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                                <div className="lg:col-span-1 h-full overflow-hidden">
                                    <ProjectWorkflow projectId={id} projectStatus={project.status as any} />
                                </div>
                                <div className="lg:col-span-2 h-full flex flex-col gap-6">
                                    <div className="flex-1 bg-card border rounded-lg overflow-hidden">
                                        {/* Use Gantt Chart Here */}
                                        <GanttGraph />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="files" className="mt-0">
                            <ProjectFiles />
                        </TabsContent>

                        <TabsContent value="report & analytics" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card className="border shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Cost Breakdown</CardTitle>
                                        <CardDescription className="text-xs mt-1">Budget allocation analysis</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-4 py-4">
                                            {/* Simple visual representation if heavy charts not needed */}
                                            <div className="relative h-24 w-24 flex-shrink-0">
                                                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted/20" />
                                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="100" className="text-primary" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-xs text-muted-foreground">Top Spend</span>
                                                    <span className="font-bold">Materials</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2 flex-1 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                        <span>Materials</span>
                                                    </div>
                                                    <span className="font-semibold">45%</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        <span>Labour</span>
                                                    </div>
                                                    <span className="font-semibold">25%</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                                                        <span>Subcontract</span>
                                                    </div>
                                                    <span className="font-semibold">18%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Risk Distribution</CardTitle>
                                        <CardDescription className="text-xs mt-1">Project risk factors</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RiskPieChart />
                                    </CardContent>
                                </Card>

                                <Card className="border shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Export Reports</CardTitle>
                                        <CardDescription className="text-xs mt-1">Download project data</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-3">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Reports</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button variant="outline" size="sm" className="w-full justify-start">
                                                    <FileText className="h-4 w-4 mr-2 text-red-500" /> PDF Report
                                                </Button>
                                                <Button variant="outline" size="sm" className="w-full justify-start">
                                                    <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" /> Excel Sheet
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2 border-t">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Final Reports</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button variant="secondary" size="sm" className="w-full justify-start" disabled={project.status !== "Completed"}>
                                                    <Database className="h-4 w-4 mr-2" /> Tally Data
                                                </Button>
                                                <Button variant="secondary" size="sm" className="w-full justify-start" disabled={project.status !== "Completed"}>
                                                    <FileText className="h-4 w-4 mr-2" /> Final Stmt
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="others" className="mt-0">
                            <div className="">
                                <ProjectPartners />
                            </div>
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
