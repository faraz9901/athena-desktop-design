import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CreditCard, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { firmDetailsSchema, type FirmDetailsFormValues } from "../../schemas/onboarding.schemas";
import type { OnboardingData } from "../../types/onboarding.types";

interface FirmDetailsStepProps {
    initialData?: OnboardingData['firmDetails'];
    onNext: (data: FirmDetailsFormValues) => void;
}

export const FirmDetailsStep = ({ initialData, onNext }: FirmDetailsStepProps) => {
    const form = useForm<FirmDetailsFormValues>({
        resolver: zodResolver(firmDetailsSchema),
        defaultValues: {
            firmName: initialData?.firmName || "",
            address: initialData?.address || "",
            gstin: initialData?.gstin || "",
            pan: initialData?.pan || "",
            epfo: initialData?.epfo || "",
            esic: initialData?.esic || "",
            tan: initialData?.tan || "",
        },
    });

    const onSubmit = (values: FirmDetailsFormValues) => {
        onNext(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <Card className="border-primary/20">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Basic Information</CardTitle>
                                <CardDescription>Your firm's primary details</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="firmName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Firm Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ABC Construction Pvt Ltd" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registered Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123, Street Name, City, State - PIN" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Tax Information */}
                <Card className="border-accent/20">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-accent-foreground" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Tax Information</CardTitle>
                                <CardDescription>Required tax registration details</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="gstin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GSTIN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="29ABCDE1234F1Z5" maxLength={15} className="h-11 font-mono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="pan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PAN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ABCDE1234F" maxLength={10} className="h-11 font-mono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <Card className="border-muted">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Additional Information</CardTitle>
                                <CardDescription>Optional registration details</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="epfo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>EPFO <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="DLCPM1234567000" className="h-11 font-mono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="esic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ESIC <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="12-34-567890" className="h-11 font-mono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>TAN <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="ABCD12345E" maxLength={10} className="h-11 font-mono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    className="w-full h-11"
                >
                    Continue
                </Button>
            </form>
        </Form>
    );
};
