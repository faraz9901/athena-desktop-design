import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const SubscriptionPage = () => {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Upgrade Your Plan</h1>
                <p className="text-xl text-muted-foreground">
                    Choose the perfect plan for your construction management needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Basic Plan */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">Basic</CardTitle>
                        <CardDescription>For small contractors</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">₹0</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <ul className="space-y-3">
                            {["Up to 2 Projects", "Basic Task Management", "5 Team Members", "1GB Storage"].map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Current Plan</Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="flex flex-col border-primary relative shadow-lg">
                    <div className="absolute top-0 right-0 -mr-2 -mt-2">
                        <Badge className="px-3 py-1">Popular</Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl">Professional</CardTitle>
                        <CardDescription>For growing construction firms</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">₹999</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <ul className="space-y-3">
                            {["Unlimited Projects", "Advanced Analytics", "20 Team Members", "50GB Storage", "Priority Support"].map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Upgrade Now</Button>
                    </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">Custom</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <ul className="space-y-3">
                            {["SSO & Custom Security", "Dedicated Success Manager", "Unlimited Team Members", "Unlimited Storage", "Custom Integration"].map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Contact Sales</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SubscriptionPage;
