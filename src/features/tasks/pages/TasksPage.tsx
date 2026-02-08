import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertCircle, Calendar, MoreHorizontal, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tasks = [
    {
        id: 1,
        title: "Finalize Structural Drawings",
        project: "City Center Mall",
        assignee: "JD",
        priority: "High",
        dueDate: "Today",
        status: "todo",
        tag: "Design"
    },
    {
        id: 2,
        title: "Procure Cement - Batch 4",
        project: "City Center Mall",
        assignee: "AS",
        priority: "Medium",
        dueDate: "Tomorrow",
        status: "todo",
        tag: "Procurement"
    },
    {
        id: 3,
        title: "Foundation Inspection",
        project: "Highway 45",
        assignee: "MK",
        priority: "High",
        dueDate: "Overdue",
        status: "inprogress",
        tag: "Site"
    },
    {
        id: 4,
        title: "Submit Monthly Report",
        project: "Green Valley",
        assignee: "JD",
        priority: "Low",
        dueDate: "Next Week",
        status: "done",
        tag: "Admin"
    }
];

const TasksPage = () => {
    const navigate = useNavigate();
    const projectNames = Array.from(new Set(tasks.map((t) => t.project)));
    const [selectedProject, setSelectedProject] = useState<string>(projectNames[0] ?? "");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                    <p className="text-muted-foreground">Manage and track your project tasks</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">U{i}</AvatarFallback>
                            </Avatar>
                        ))}
                        <div className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs text-muted-foreground font-medium">
                            +4
                        </div>
                    </div>
                    <Button onClick={() => navigate("/tasks/add")} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Task
                    </Button>
                </div>
            </div>

            {/* Project Filter */}
            {projectNames.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">Filter by Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            value={selectedProject}
                            onValueChange={(val) => setSelectedProject(val)}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-3 bg-secondary/30">
                                {projectNames.map((name) => (
                                    <TabsTrigger key={name} value={name}>
                                        {name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </CardContent>
                </Card>
            )}

            {/* Tasks Board */}
            <Tabs defaultValue="todo" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary/30">
                    <TabsTrigger value="todo">To Do</TabsTrigger>
                    <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                    <TabsTrigger value="done">Done</TabsTrigger>
                </TabsList>

                {["todo", "inprogress", "done"].map((status) => (
                    <TabsContent key={status} value={status} className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.filter((t) => t.status === status && t.project === selectedProject).length === 0 ? (
                                <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                                    <p className="text-sm">No tasks in this column</p>
                                </div>
                            ) : (
                                tasks
                                    .filter((t) => t.status === status && t.project === selectedProject)
                                    .map((task) => (
                                        <Card
                                            key={task.id}
                                            onClick={() => navigate(`/tasks/${task.id}`)}
                                            className="cursor-pointer hover:shadow-lg transition-shadow"
                                        >
                                            <CardContent className="p-4 pb-2">
                                                <div className="flex justify-between items-start mb-3">
                                                    <Badge
                                                        variant="outline"
                                                        className={`
                                                            ${task.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                task.priority === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                                    'bg-blue-50 text-blue-600 border-blue-100'}
                                                            border-none font-medium
                                                        `}
                                                    >
                                                        {task.priority}
                                                    </Badge>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6 text-muted-foreground"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigate(`/tasks/${task.id}/edit`);
                                                                }}
                                                            >
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-destructive"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                Remove
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <h3 className="font-semibold text-base leading-snug mb-1">{task.title}</h3>
                                                <p className="text-xs text-muted-foreground">{task.project}</p>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">{task.assignee}</AvatarFallback>
                                                    </Avatar>
                                                    <div className={`flex items-center gap-1 text-xs font-medium ${task.dueDate === 'Overdue' ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                        {task.dueDate === 'Overdue' ? <AlertCircle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                                                        {task.dueDate}
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="text-xs font-normal">{task.tag}</Badge>
                                            </CardFooter>
                                        </Card>
                                    ))
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default TasksPage;
