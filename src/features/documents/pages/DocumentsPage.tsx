import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Filter, Download, MoreVertical, Upload } from "lucide-react";

const DocumentsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Documents</h1>
                    <p className="text-muted-foreground">Manage project files and documents</p>
                </div>
                <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Document
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search documents..." className="pl-9" />
                </div>
                <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: "Project_Plan.pdf", project: "City Center", type: "PDF", size: "2.4 MB", date: "2024-02-08" },
                            { name: "Invoice_001.pdf", project: "City Center", type: "PDF", size: "156 KB", date: "2024-02-07" },
                            { name: "Site_Photo_01.jpg", project: "Highway 45", type: "Image", size: "4.2 MB", date: "2024-02-06" },
                        ].map((doc, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {doc.name}
                                    </div>
                                </TableCell>
                                <TableCell>{doc.project}</TableCell>
                                <TableCell>{doc.type}</TableCell>
                                <TableCell>{doc.size}</TableCell>
                                <TableCell>{doc.date}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default DocumentsPage;
