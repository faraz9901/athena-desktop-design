import { Gantt, Willow, Tooltip } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

export const ganttTasks = [
    /* =======================
       PARENT 1 : TASKS & ACTIONS
    ======================== */
    {
        id: 100,
        text: "Tasks & Actions",
        financeText: "",
        start: new Date(2024, 5, 10),
        end: new Date(2024, 8, 30),
        progress: 40,
        type: "summary",
        parent: 0,
    },

    {
        id: 101,
        text: "Upload Tender Documents",
        financeText: "—",
        start: new Date(2024, 5, 10),
        end: new Date(2024, 5, 12),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 102,
        text: "Review Extracted Tender Data",
        financeText: "EMD ₹90,000",
        start: new Date(2024, 5, 13),
        end: new Date(2024, 5, 15),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 103,
        text: "Tender Secured",
        financeText: "Bid ₹45,00,000",
        start: new Date(2024, 5, 16),
        end: new Date(2024, 5, 18),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 104,
        text: "Upload LOA / Work Order",
        financeText: "Advance ₹4,50,000",
        start: new Date(2024, 5, 19),
        end: new Date(2024, 5, 22),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 105,
        text: "Daily Progress Tracking",
        financeText: "Execution Phase",
        start: new Date(2024, 5, 23),
        end: new Date(2024, 7, 31),
        progress: 40,
        type: "task",
        parent: 100,
    },
    {
        id: 106,
        text: "Running Bill Submitted",
        financeText: "₹12,00,000",
        start: new Date(2024, 7, 10),
        end: new Date(2024, 7, 12),
        progress: 0,
        type: "task",
        parent: 100,
    },
    {
        id: 107,
        text: "Payment Received",
        financeText: "₹11,40,000",
        start: new Date(2024, 7, 20),
        end: new Date(2024, 7, 22),
        progress: 0,
        type: "task",
        parent: 100,
    },
    {
        id: 108,
        text: "Project Closure",
        financeText: "Final Settlement",
        start: new Date(2024, 8, 20),
        end: new Date(2024, 8, 30),
        progress: 0,
        type: "task",
        parent: 100,
    },

    /* =======================
       PARENT 2 : FINANCES
    ======================== */
    {
        id: 200,
        text: "Finances",
        financeText: "",
        start: new Date(2024, 5, 23),
        end: new Date(2024, 8, 30),
        progress: 55,
        type: "summary",
        parent: 0,
    },

    {
        id: 201,
        text: "Material Procurement",
        financeText: "₹42,000 | Cement",
        start: new Date(2024, 6, 1),
        end: new Date(2024, 6, 5),
        progress: 100,
        type: "task",
        parent: 200,
    },
    {
        id: 202,
        text: "Labour Expenses",
        financeText: "₹10,500 | Cash",
        start: new Date(2024, 6, 2),
        end: new Date(2024, 6, 6),
        progress: 100,
        type: "task",
        parent: 200,
    },
    {
        id: 203,
        text: "Machine & Transport",
        financeText: "₹9,500",
        start: new Date(2024, 6, 3),
        end: new Date(2024, 6, 7),
        progress: 100,
        type: "task",
        parent: 200,
    },
    {
        id: 204,
        text: "GST & Taxes",
        financeText: "₹2,10,000",
        start: new Date(2024, 8, 10),
        end: new Date(2024, 8, 15),
        progress: 0,
        type: "task",
        parent: 200,
    },
    {
        id: 205,
        text: "Final Profit",
        financeText: "₹6,80,000",
        start: new Date(2024, 8, 20),
        end: new Date(2024, 8, 30),
        progress: 0,
        type: "task",
        parent: 200,
    },
];

export function GanttGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [api, setApi] = useState<any>(null);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!isFullscreen) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
                setIsFullscreen(false);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div ref={containerRef} className="bg-card border rounded-lg overflow-hidden flex flex-col h-[500px]">
            <div className="bg-muted/30 p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Project Timeline</span>
                </div>
                <Button
                    onClick={toggleFullscreen}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
            </div>
            <div className="flex-1 overflow-hidden" style={{ "--gantt-background": "transparent" } as any}>
                <Willow >
                    <Tooltip api={api}>
                        <Gantt
                            readonly
                            tasks={ganttTasks}
                            zoom={true}
                            init={setApi}

                        // Customize look if possible via props, or use global CSS
                        />
                    </Tooltip>
                </Willow>
            </div>
        </div>
    )
}
