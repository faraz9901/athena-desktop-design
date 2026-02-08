import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDown, Printer } from "lucide-react";

// Placeholder for charts to avoid dependency issues if recharts is missing
const ChartPlaceholder = ({ title }: { title: string }) => (
    <div className="h-[300px] w-full bg-secondary/10 rounded-lg flex items-center justify-center border border-dashed">
        <div className="text-center">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">Chart visual placeholder</p>
        </div>
    </div>
);

const ReportsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reports</h1>
                    <p className="text-muted-foreground">Analytics and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <FileDown className="h-4 w-4" /> Export
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Printer className="h-4 w-4" /> Print
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Progress</CardTitle>
                        <CardDescription>Completion status across active projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Project Progress Chart" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Expense Analysis</CardTitle>
                        <CardDescription>Monthly spending breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Expense Chart" />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Resource Utilization</CardTitle>
                        <CardDescription>Labor and material usage trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Resource Utilization Graph" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ReportsPage;
