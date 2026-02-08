import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, FileText, Flag, Paperclip, User, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock task data
const mockTask = {
    id: 1,
    title: "Finalize Structural Drawings",
    description: "Complete all structural drawings for the foundation and first floor. Include detailed specifications for materials and construction methods. Review with engineering team before final submission.",
    project: "City Center Mall",
    assignee: {
        id: 1,
        name: "John Doe",
        avatar: "JD"
    },
    priority: "High",
    status: "In Progress",
    dueDate: "2025-02-15",
    createdAt: "2025-01-20",
    attachments: [
        { id: 1, name: "draft_drawing_v1.pdf", size: "2.4 MB" },
        { id: 2, name: "specifications.docx", size: "850 KB" }
    ],
};

const TaskDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [priority, setPriority] = useState(mockTask.priority);
    const [status, setStatus] = useState(mockTask.status);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-700 border-red-200";
            case "Medium":
                return "bg-orange-100 text-orange-700 border-orange-200";
            case "Low":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "In Progress":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "To Do":
                return "bg-gray-100 text-gray-700 border-gray-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-foreground">Task Details</h1>
                    <p className="text-muted-foreground">View and manage task information</p>
                </div>
                <Button variant="outline" onClick={() => navigate("/tasks")}>
                    Back to Tasks
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Task Title & Basic Info */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-3">{mockTask.title}</h2>
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge className={`${getPriorityColor(priority)} border font-medium`}>
                                        <Flag className="h-3 w-3 mr-1" />
                                        {priority}
                                    </Badge>
                                    <Badge className={`${getStatusColor(status)} border font-medium`}>
                                        {status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Due Date:</span>
                                    <span className="font-medium">{new Date(mockTask.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Assignee:</span>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                                {mockTask.assignee.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{mockTask.assignee.name}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Project:</span>
                                    <span className="font-medium">{mockTask.project}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {mockTask.description}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Attachments */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Attachments</CardTitle>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Paperclip className="h-4 w-4" />
                                    Add File
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {mockTask.attachments.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{file.name}</p>
                                                <p className="text-xs text-muted-foreground">{file.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Priority & Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select value={priority} onValueChange={setPriority}>
                                    <SelectTrigger className="h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="w-full">Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
