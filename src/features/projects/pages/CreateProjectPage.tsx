import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProjectPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Step 1: Upload (Mock)
    // Step 2: Form
    // Step 3: Success/Share

    return (
        <div className="max-w-3xl mx-auto space-y-8 py-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Create New Project</h1>
                    <p className="text-muted-foreground">Step {step} of 3</p>
                </div>
            </div>

            {step === 1 && (
                <div className="space-y-6">
                    <Card className="border-dashed border-2 p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Upload className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Upload Project Documents</h3>
                        <p className="text-muted-foreground max-w-sm mb-6">
                            Drag and drop project files (plans, tenders, etc.) here to auto-fill details, or skip to manual entry.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep(2)}>Skip & Enter Manually</Button>
                            <Button onClick={() => setStep(2)}>Select Files</Button>
                        </div>
                    </Card>
                </div>
            )}

            {step === 2 && (
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Project Name</Label>
                                <Input placeholder="e.g. City Center Mall Renovation" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Est. End Date</Label>
                                    <Input type="date" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Budget (₹)</Label>
                                <Input type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input placeholder="Project site address" />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Brief description of the project scope..." />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)}>Create Project</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {step === 3 && (
                <Card className="text-center py-12">
                    <CardContent className="space-y-6">
                        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                            <FileText className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Project Created Successfully!</h2>
                            <p className="text-muted-foreground">
                                "City Center Mall Renovation" has been added to your dashboard.
                            </p>
                        </div>

                        <div className="max-w-md mx-auto p-4 bg-secondary/20 rounded-lg flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-sm font-semibold">Invite Team Members</p>
                                <p className="text-xs text-muted-foreground">Share project access link</p>
                            </div>
                            <Button size="sm" variant="outline">Copy Link</Button>
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={() => navigate('/projects')}>Go to Projects</Button>
                            <Button onClick={() => navigate('/tasks/add')}>Add First Task</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default CreateProjectPage;
