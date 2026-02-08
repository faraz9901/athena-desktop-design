import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, LayoutGrid, List, FileIcon } from "lucide-react";
import { useState } from "react";

// ---- Mock Data ----
const mockFiles = [
    {
        id: 1,
        name: "Site_Plan_v1.pdf",
        size: "2.4 MB",
        uploadedAt: "2 days ago",
        category: "Tender Documents",
        type: "PDF",
    },
    {
        id: 2,
        name: "BOQ_Final.xlsx",
        size: "780 KB",
        uploadedAt: "4 days ago",
        category: "Tender Documents",
        type: "XLS",
    },
    {
        id: 3,
        name: "Technical_Specifications.pdf",
        size: "1.9 MB",
        uploadedAt: "1 week ago",
        category: "Tender Documents",
        type: "PDF",
    },

    {
        id: 4,
        name: "Environmental_Clearance.pdf",
        size: "1.1 MB",
        uploadedAt: "5 days ago",
        category: "Approvals & NOCs",
        type: "PDF",
    },
    {
        id: 5,
        name: "Fire_NOC.pdf",
        size: "620 KB",
        uploadedAt: "2 weeks ago",
        category: "Approvals & NOCs",
        type: "PDF",
    },
    {
        id: 6,
        name: "Municipal_Approval_Letter.pdf",
        size: "950 KB",
        uploadedAt: "10 days ago",
        category: "Approvals & NOCs",
        type: "PDF",
    },

    {
        id: 7,
        name: "Floor_Plan_Ground_Floor.dwg",
        size: "4.2 MB",
        uploadedAt: "3 days ago",
        category: "Drawings",
        type: "DWG",
    },
    {
        id: 8,
        name: "Elevation_View.pdf",
        size: "2.8 MB",
        uploadedAt: "6 days ago",
        category: "Drawings",
        type: "PDF",
    },
    {
        id: 9,
        name: "Structural_Layout_v3.pdf",
        size: "3.5 MB",
        uploadedAt: "1 week ago",
        category: "Drawings",
        type: "PDF",
    },

    {
        id: 10,
        name: "Invoice_Jan_2026.pdf",
        size: "900 KB",
        uploadedAt: "3 days ago",
        category: "Invoices",
        type: "PDF",
    },
    {
        id: 11,
        name: "Invoice_Feb_2026.pdf",
        size: "1.2 MB",
        uploadedAt: "1 day ago",
        category: "Invoices",
        type: "PDF",
    },
    {
        id: 12,
        name: "Payment_Receipt_#4582.pdf",
        size: "420 KB",
        uploadedAt: "5 days ago",
        category: "Invoices",
        type: "PDF",
    },
];


const FileRow = ({ file }: { file: any }) => (
    <div className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors border-b last:border-0">
        <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                {file.type}
            </div>
            <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                    {file.size} • {file.uploadedAt}
                </p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] hidden sm:flex">
                {file.category}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Download className="h-4 w-4" />
            </Button>
        </div>
    </div>
);

const FileCard = ({ file }: { file: any }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                    {file.type}
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground -mr-2 -mt-2">
                    <Download className="h-4 w-4" />
                </Button>
            </div>
            <div>
                <h4 className="font-medium text-sm truncate" title={file.name}>{file.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{file.size} • {file.uploadedAt}</p>
            </div>
        </div>
        <div className="bg-muted/30 px-4 py-2 border-t flex justify-between items-center">
            <Badge variant="outline" className="text-[10px] h-5 font-normal bg-background">
                {file.category}
            </Badge>
        </div>
    </Card>
)

export function ProjectFiles() {
    const [viewMode, setViewMode] = useState<"grouped" | "list" | "grid">("grouped");

    const groupedFiles = mockFiles.reduce((acc: any, file) => {
        acc[file.category] = acc[file.category] || [];
        acc[file.category].push(file);
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            {/* View Toggle */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                    Project Documents
                </h3>
                <div className="flex bg-muted/50 p-1 rounded-lg">
                    <Button
                        variant={viewMode === "grouped" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => setViewMode("grouped")}
                    >
                        <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> Grouped
                    </Button>
                    <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => setViewMode("grid")}
                    >
                        <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> Grid
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-3.5 w-3.5 mr-1.5" /> List
                    </Button>
                </div>
            </div>

            {viewMode === "grouped" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(groupedFiles).map(([category, files]: any) => (
                        <Card key={category} className="border shadow-sm overflow-hidden h-fit">
                            <CardHeader className="bg-muted/30 py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-background rounded-md shadow-sm text-primary">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <CardTitle className="text-sm font-medium">{category}</CardTitle>
                                </div>
                                <Badge variant="secondary" className="text-[10px]">
                                    {files.length} Files
                                </Badge>
                            </CardHeader>
                            <div className="divide-y divide-border/50 bg-card">
                                {files.map((file: any) => (
                                    <FileRow key={file.id} file={file} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {viewMode === "grid" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockFiles.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>
            )}

            {viewMode === "list" && (
                <Card className="border shadow-sm overflow-hidden">
                    <div className="divide-y divide-border/50">
                        {mockFiles
                            .sort((a, b) => a.id - b.id)
                            .map((file) => (
                                <FileRow key={file.id} file={file} />
                            ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
