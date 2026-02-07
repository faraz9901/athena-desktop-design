import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertCircle,
    Box,
    Package,
    Plus,
    Search,
    TrendingDown,
    TrendingUp,
    Warehouse
} from "lucide-react";

const MaterialsPage = () => {
    const materials = [
        {
            name: "Cement (OPC 53 Grade)",
            category: "Binding Materials",
            quantity: 450,
            unit: "bags",
            minStock: 200,
            status: "In Stock",
            lastUpdated: "2 hours ago",
            supplier: "UltraTech",
        },
        {
            name: "Steel Bars (10mm)",
            category: "Reinforcement",
            quantity: 85,
            unit: "tons",
            minStock: 50,
            status: "In Stock",
            lastUpdated: "1 day ago",
            supplier: "TATA Steel",
        },
        {
            name: "Sand (M-Sand)",
            category: "Aggregates",
            quantity: 12,
            unit: "cubic meters",
            minStock: 30,
            status: "Low Stock",
            lastUpdated: "3 hours ago",
            supplier: "Local Supplier",
        },
        {
            name: "Bricks (Red Clay)",
            category: "Masonry",
            quantity: 8500,
            unit: "pieces",
            minStock: 5000,
            status: "In Stock",
            lastUpdated: "5 hours ago",
            supplier: "Brickworks Ltd",
        },
    ];

    const categories = [
        { name: "Binding Materials", count: 12, icon: Box },
        { name: "Aggregates", count: 8, icon: Warehouse },
        { name: "Reinforcement", count: 15, icon: Package },
        { name: "Masonry", count: 6, icon: Box },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Materials Inventory</h1>
                    <p className="text-muted-foreground mt-1">Track and manage construction materials</p>
                </div>
                <Button className="gap-2 h-11 shadow-md">
                    <Plus className="w-5 h-5" />
                    Add Material
                </Button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, i) => {
                    const Icon = category.icon;
                    return (
                        <Card
                            key={i}
                            className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-t-4 border-t-primary"
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{category.name}</p>
                                        <p className="text-2xl font-bold text-foreground mt-1">{category.count}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Search */}
            <Card className="shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Package className="w-4 h-4" />
                            Filter by Category
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Materials List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {materials.map((material, i) => (
                    <Card
                        key={i}
                        className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${material.status === "Low Stock" ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-green-500"
                            }`}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {material.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1">{material.category}</CardDescription>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${material.status === "In Stock"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-orange-100 text-orange-700"
                                        }`}
                                >
                                    {material.status}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Quantity Info */}
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Stock</p>
                                        <p className="text-xl font-bold text-foreground">
                                            {material.quantity} {material.unit}
                                        </p>
                                    </div>
                                </div>
                                {material.quantity < material.minStock ? (
                                    <TrendingDown className="w-6 h-6 text-orange-600" />
                                ) : (
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                )}
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Min. Stock Level</p>
                                    <p className="font-semibold text-foreground mt-1">
                                        {material.minStock} {material.unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Supplier</p>
                                    <p className="font-semibold text-foreground mt-1">{material.supplier}</p>
                                </div>
                            </div>

                            {/* Warning Alert */}
                            {material.status === "Low Stock" && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 border border-orange-200">
                                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                    <p className="text-sm text-orange-800">
                                        Stock is below minimum level. Reorder recommended.
                                    </p>
                                </div>
                            )}

                            <div className="text-xs text-muted-foreground pt-2 border-t">
                                Last updated: {material.lastUpdated}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MaterialsPage;
