import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Filter, Plus, Receipt, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const expenses = [
    {
        id: 1,
        title: "Cement Bags (50kg)",
        vendor: "UltraTech Supplies",
        amount: "Rs 450.00",
        date: "Today, 10:30 AM",
        category: "Materials",
        project: "City Center Mall",
        status: "Approved",
        receipt: true
    },
    {
        id: 2,
        title: "Worker Lunch",
        vendor: "Local Canteen",
        amount: "Rs 85.50",
        date: "Yesterday",
        category: "Food",
        project: "Highway 45",
        status: "Pending",
        receipt: true
    },
    {
        id: 3,
        title: "Fuel for Excavator",
        vendor: "Shell Station",
        amount: "Rs 120.00",
        date: "23 Jan 2025",
        category: "Fuel",
        project: "Green Valley",
        status: "Approved",
        receipt: false
    },
    {
        id: 4,
        title: "Safety Helmets",
        vendor: "Safety First Gear",
        amount: "Rs 320.00",
        date: "20 Jan 2025",
        category: "Safety",
        project: "City Center Mall",
        status: "Rejected",
        receipt: true
    }
];

const ExpensesPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
                    <p className="text-muted-foreground">Track and manage project expenses</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button onClick={() => navigate("/expenses/add")} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Expense
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search expenses..."
                        className="pl-9 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="secondary" size="icon" className="h-11 w-11">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            {/* Summary */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total this month</span>
                        <span className="font-bold text-2xl text-foreground">Rs 3,420.50</span>
                    </div>
                </CardContent>
            </Card>

            {/* Expenses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenses.map((expense) => (
                    <Card key={expense.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className={`h-1 w-full ${expense.status === 'Approved' ? 'bg-emerald-500' :
                            expense.status === 'Pending' ? 'bg-orange-400' : 'bg-red-500'
                            }`} />
                        <CardContent className="p-4 flex items-start gap-4">
                            <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                                <Receipt className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-base truncate">{expense.title}</h3>
                                    <span className="font-bold text-base ml-2">{expense.amount}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{expense.vendor}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <Badge variant="secondary" className="text-xs font-normal">
                                        {expense.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{expense.date}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ExpensesPage;
