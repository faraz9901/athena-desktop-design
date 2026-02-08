import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================
   Workflow Status Types
========================= */

const workflowStatuses = [
    "Draft",
    "Tender Submitted",
    "Tender Failed",
    "Tender Secured",
    "Project Ready for Execution",
    "Active",
    "Completed",
    "Closed",
] as const;

export type WorkflowStatus = (typeof workflowStatuses)[number];

/* =========================
   UI Action Types
========================= */

type ActionType =
    | "button"
    | "upload"
    | "input"
    | "email"
    | "decision"
    | "whatsapp";

interface WorkflowAction {
    id: string;
    label: string;
    type: ActionType;
    placeholder?: string;
    accept?: string;
    variant?: "primary" | "danger" | "outline";
}

/* =========================
   CENTRAL DEMO FLOW CONFIG
========================= */

const WORKFLOW_FLOW = [
    {
        key: "Draft",
        title: "Draft Created",
        date: "01 Jan 2025",
        description: "Tender documents uploaded & reviewed",
        actions: [
            { id: "upload_tender_docs", label: "Upload Tender Docs", type: "upload" },
            { id: "review_extracted_data", label: "Review Extracted Data", type: "button" },
        ],
    },
    {
        key: "Tender Submitted",
        title: "Tender Submitted",
        date: "05 Jan 2025",
        actions: [
            {
                id: "tender_secured",
                label: "Tender Secured",
                type: "decision",
                variant: "primary",
            },
            {
                id: "tender_failed",
                label: "Tender Failed",
                type: "decision",
                variant: "danger",
            },
        ],
    },
    {
        key: "Tender Failed",
        title: "Tender Failed",
        date: "08 Jan 2025",
        actions: [
            { id: "verify_emd_refund", label: "Verify EMD Refund", type: "decision" },
        ],
    },
    {
        key: "Tender Secured",
        title: "Tender Secured",
        date: "10 Jan 2025",
        actions: [
            { id: "upload_bid_comparative", label: "Upload Bid Comparative", type: "upload" },
            { id: "upload_negotiation_letters", label: "Upload Negotiation Letters", type: "upload" },
            { id: "negotiation_decision", label: "Negotiation Outcome", type: "decision", variant: "primary" },
        ],
    },
    {
        key: "Project Ready for Execution",
        title: "Execution Ready",
        date: "15 Jan 2025",
        actions: [
            { id: "upload_loa_work_order", label: "Upload LOA/WO", type: "upload" },
            { id: "performance_security_details", label: "Performance Security", type: "input" },
            { id: "upload_performance_security", label: "Upload Security Doc", type: "upload" },
            { id: "upload_project_drawings", label: "Upload Drawings", type: "upload" },
            { id: "review_final_data", label: "Review Final Data", type: "button" },
        ],
    },
    {
        key: "Active",
        title: "Project Active_Execution",
        date: "20 Jan 2025",
        actions: [
            { id: "daily_progress_tracking", label: "Daily Progress", type: "button" },
            // { id: "daily_expense_report", label: "Daily Expenses", type: "upload" },
            { id: "send_whatsapp_summary", label: "Send WhatsApp Summary", type: "whatsapp" },
            { id: "running_bill_received", label: "Running Bill Received", type: "input" },
            { id: "check_project_timeline", label: "Can the project be completed on time?", type: "decision" },
        ],
    },
    {
        key: "Completed",
        title: "Project Completed",
        date: "28 Jan 2025",
        actions: [
            { id: "project_completed_check", label: "Final Payment Check", type: "button" },
            { id: "payment_received_check", label: "Payment & Security", type: "decision" },
        ],
    },
    {
        key: "Closed",
        title: "Workflow Closed",
        date: "31 Jan 2025",
        actions: [
            { id: "calculate_taxes", label: "Calculate Taxes", type: "button" },
            { id: "mark_taxes_paid", label: "Pay Taxes", type: "decision" },
            { id: "calculate_profit", label: "Final Profit", type: "button" },
            { id: "mark_project_done", label: "Close Project", type: "decision" },
            { id: "download_final_report", label: "Download Final Report", type: "decision" }
        ],
    },
] satisfies {
    key: WorkflowStatus;
    title: string;
    date: string;
    description?: string;
    actions: WorkflowAction[];
}[];

/* =========================
   Helpers
 ========================= */

type StepState = "completed" | "current" | "pending";

function resolveStepState(index: number, currentIndex: number): StepState {
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "pending";
}

/* =========================
   Props
 ========================= */

interface ProjectWorkflowProps {
    projectId?: string | null;
    projectStatus: WorkflowStatus;
}

/* =========================
   DROP-IN COMPONENT
 ========================= */

export function ProjectWorkflow({
    projectId,
    projectStatus,
}: ProjectWorkflowProps) {
    const currentIndex = useMemo(
        () => WORKFLOW_FLOW.findIndex((s) => s.key === projectStatus),
        [projectStatus]
    );

    const [selectedStep, setSelectedStep] =
        useState<string | undefined>(undefined);

    // State for the side panel (replacing Drawer)
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeStepForPanel, setActiveStepForPanel] = useState<typeof WORKFLOW_FLOW[number] | null>(null);

    // Initial effect to select the current status
    useMemo(() => {
        const currentFlow = WORKFLOW_FLOW.find(f => f.key === projectStatus);
        if (currentFlow) setSelectedStep(currentFlow.key);
    }, [projectStatus]);

    const navigate = useNavigate();

    function handleActionClick(actionId: string) {
        if (!projectId) return;
        // Correct route to match PendingTaskPage

        if (actionId === "tender_secured") {
            return
        }

        navigate(`/projects/${projectId}/${actionId}`);
    }

    const openActionPanel = (step: typeof WORKFLOW_FLOW[number]) => {
        setActiveStepForPanel(step);
        setIsPanelOpen(true);
    };

    // Separate actions into types
    const getStepActions = (actions: WorkflowAction[]) => {
        const decisions = actions.filter(a => a.type === "decision");
        const pendingTasks = actions.filter(a => a.type !== "decision");
        return { decisions, pendingTasks };
    };

    function renderDecision(action: WorkflowAction) {
        return (
            <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-colors hover:shadow-sm",
                    action.variant === "primary" &&
                    "bg-primary text-white border-primary hover:bg-primary/90",
                    action.variant === "danger" &&
                    "bg-red-500 text-white border-red-500 hover:bg-red-600",
                    !action.variant && "hover:bg-accent"
                )}
            >
                {action.label}
            </button>
        );
    }

    return (
        <>
            <Card className="border shadow-sm h-full">
                <CardHeader className="pb-4 border-b bg-muted/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">Project Workflow</CardTitle>
                            {projectId && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Project ID: {projectId}
                                </p>
                            )}
                        </div>

                        <Badge variant="outline" className="text-xs rounded-full bg-background px-3 py-1">
                            {projectStatus}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-0 p-0">
                    {WORKFLOW_FLOW.map((step, index) => {
                        const state = resolveStepState(index, currentIndex);
                        const { decisions, pendingTasks } = getStepActions(step.actions);
                        const isLast = index === WORKFLOW_FLOW.length - 1;

                        return (
                            <div key={step.key} className={cn("flex gap-4 relative p-4 transition-colors hover:bg-muted/10", step.key === selectedStep && "bg-muted/30")}>
                                {/* Connector Line */}
                                {!isLast && (
                                    <div className="absolute left-[29px] top-10 bottom-[-10px] w-[2px] bg-border" />
                                )}

                                {/* Status Indicator */}
                                <div
                                    className={cn(
                                        "h-7 w-7 rounded-full border-2 z-10 flex items-center justify-center bg-background shrink-0 mt-0.5 transition-all",
                                        state === "completed" && "border-primary bg-primary text-primary-foreground",
                                        state === "current" && "border-primary ring-4 ring-primary/10",
                                        state === "pending" && "border-muted-foreground/30"
                                    )}
                                >
                                    {state === "completed" && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    {state === "current" && (
                                        <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse" />
                                    )}
                                </div>

                                <div className="flex-1 pb-2">
                                    <div
                                        onClick={() => setSelectedStep(step.key)}
                                        className="cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className={cn(
                                                "text-sm font-semibold transition-colors",
                                                step.key === selectedStep ? "text-primary" : "text-foreground group-hover:text-primary"
                                            )}>
                                                {step.title}
                                            </h4>
                                            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                                {step.date}
                                            </span>
                                        </div>

                                        {step.description && (
                                            <p className="text-xs text-muted-foreground mt-1 max-w-[90%]">
                                                {step.description}
                                            </p>
                                        )}
                                    </div>

                                    {step.key === selectedStep && (
                                        <div className="relative mt-4 flex flex-wrap gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
                                            {/* 1. Render Decisions Inline */}
                                            {decisions.map(renderDecision)}

                                            {/* 2. Render "View Actions" Button if there are pending tasks */}
                                            {pendingTasks.length > 0 && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 text-xs rounded-full border-dashed border-primary/50 text-primary hover:bg-primary/5 hover:border-solid hover:border-primary"
                                                    onClick={() => openActionPanel(step)}
                                                >
                                                    View Actions ({pendingTasks.length})
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {/* Side Panel Overlay */}
            {isPanelOpen && activeStepForPanel && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsPanelOpen(false)}
                    />

                    {/* Panel */}
                    <div className="relative w-full max-w-md bg-background h-full shadow-2xl border-l animate-in slide-in-from-right duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <div>
                                <h3 className="font-semibold text-lg">{activeStepForPanel.title}</h3>
                                <p className="text-xs text-muted-foreground">Pending Actions</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsPanelOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="p-4 overflow-y-auto flex-1 space-y-3">
                            {getStepActions(activeStepForPanel.actions).pendingTasks.map((action) => (
                                <div
                                    key={action.id}
                                    onClick={() => {
                                        handleActionClick(action.id);
                                        setIsPanelOpen(false);
                                    }}
                                    className="flex items-center p-3 rounded-xl border bg-card hover:bg-accent/50 hover:border-primary/30 cursor-pointer transition-all gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        {action.type === "upload" && "📎"}
                                        {action.type === "email" && "📧"}
                                        {action.type === "whatsapp" && "💬"}
                                        {action.type === "input" && "✏️"}
                                        {["button", "decision"].includes(action.type) && "⚡"}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</p>
                                        {action.placeholder && (
                                            <p className="text-xs text-muted-foreground">{action.placeholder}</p>
                                        )}
                                    </div>
                                    <div className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t bg-muted/10">
                            <Button className="w-full" onClick={() => setIsPanelOpen(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
