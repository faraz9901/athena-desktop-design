import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    CheckCircle2,
    Clock,
    HardHat,
    Phone,
    Plus,
    Search,
    UserCheck,
    Users,
    XCircle
} from "lucide-react";

const LaborPage = () => {
    const workers = [
        {
            name: "Rajesh Kumar",
            role: "Mason",
            phone: "+91 98765 43210",
            status: "Present",
            attendance: 28,
            totalDays: 30,
            project: "Highway Expansion",
            experience: "8 years",
        },
        {
            name: "Amit Singh",
            role: "Carpenter",
            phone: "+91 98765 43211",
            status: "Present",
            attendance: 30,
            totalDays: 30,
            project: "Metro Station",
            experience: "5 years",
        },
        {
            name: "Suresh Yadav",
            role: "Electrician",
            phone: "+91 98765 43212",
            status: "Absent",
            attendance: 25,
            totalDays: 30,
            project: "Residential Complex",
            experience: "10 years",
        },
        {
            name: "Vijay Sharma",
            role: "Plumber",
            phone: "+91 98765 43213",
            status: "Present",
            attendance: 27,
            totalDays: 30,
            project: "Highway Expansion",
            experience: "6 years",
        },
    ];

    const attendanceStats = [
        { label: "Total Workers", value: "156", icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "Present Today", value: "142", icon: UserCheck, color: "text-green-600", bgColor: "bg-green-50" },
        { label: "Absent Today", value: "14", icon: XCircle, color: "text-red-600", bgColor: "bg-red-50" },
        { label: "Avg. Attendance", value: "91%", icon: CheckCircle2, color: "text-purple-600", bgColor: "bg-purple-50" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Labor Management</h1>
                    <p className="text-muted-foreground mt-1">Worker directory and attendance tracking</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-5 h-5" />
                        Mark Attendance
                    </Button>
                    <Button className="gap-2 h-11 shadow-md">
                        <Plus className="w-5 h-5" />
                        Add Worker
                    </Button>
                </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {attendanceStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={i}
                            className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary"
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Search and Filter */}
            <Card className="shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search workers by name, role, or project..."
                                className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <HardHat className="w-4 h-4" />
                            Filter by Role
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Workers List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workers.map((worker, i) => (
                    <Card
                        key={i}
                        className={`hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 ${worker.status === "Present" ? "border-l-green-500" : "border-l-red-500"
                            }`}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center font-bold text-lg text-primary ring-2 ring-primary/20">
                                        {worker.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                            {worker.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <HardHat className="w-3.5 h-3.5" />
                                            {worker.role}
                                        </CardDescription>
                                    </div>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${worker.status === "Present"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {worker.status}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Attendance Progress */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-muted-foreground">Monthly Attendance</span>
                                    <span className="text-sm font-bold text-foreground">
                                        {worker.attendance}/{worker.totalDays} days
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${(worker.attendance / worker.totalDays) * 100 >= 90
                                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                                : "bg-gradient-to-r from-orange-500 to-orange-600"
                                            }`}
                                        style={{ width: `${(worker.attendance / worker.totalDays) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Worker Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">Contact</p>
                                        <p className="text-sm font-semibold text-foreground truncate">{worker.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-4 h-4 text-accent-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">Experience</p>
                                        <p className="text-sm font-semibold text-foreground">{worker.experience}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Assigned Project */}
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <HardHat className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Assigned Project</p>
                                    <p className="text-sm font-semibold text-foreground">{worker.project}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LaborPage;
