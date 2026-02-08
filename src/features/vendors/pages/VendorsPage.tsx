import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Search, Plus, Filter, Building2 } from "lucide-react";

const VendorsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Vendors & Partners</h1>
                    <p className="text-muted-foreground">Manage your supply chain network</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Vendor
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vendors..." className="pl-9" />
                </div>
                <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                                    {i % 2 === 0 ? "Active" : "Inactive"}
                                </Badge>
                            </div>

                            <h3 className="font-bold text-lg mb-1">ABC Supplies Ltd.</h3>
                            <p className="text-sm text-muted-foreground mb-4">Construction Materials</p>

                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>+91 98765 43210</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Mumbai, Maharashtra</span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <Button variant="outline" className="flex-1">View Details</Button>
                                <Button variant="ghost" size="icon"><Mail className="h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default VendorsPage;
