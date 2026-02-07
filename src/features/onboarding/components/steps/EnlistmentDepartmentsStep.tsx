import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { enlistmentDepartmentsSchema, type EnlistmentDepartmentsFormValues } from "../../schemas/onboarding.schemas";
import { DepartmentType, type OnboardingData } from "../../types/onboarding.types";

interface EnlistmentDepartmentsStepProps {
    initialData?: OnboardingData['enlistmentDepartments'];
    onNext: (data: EnlistmentDepartmentsFormValues) => void;
}

export const EnlistmentDepartmentsStep = ({ initialData, onNext }: EnlistmentDepartmentsStepProps) => {
    const form = useForm<EnlistmentDepartmentsFormValues>({
        resolver: zodResolver(enlistmentDepartmentsSchema),
        defaultValues: {
            departments: initialData && initialData.length > 0
                ? initialData.map(d => ({
                    department: d.department,
                    customDepartmentName: d.customDepartmentName,
                    expiryDate: d.expiryDate,
                }))
                : [{ department: undefined as any, expiryDate: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "departments",
    });

    const onSubmit = (values: EnlistmentDepartmentsFormValues) => {
        onNext(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="relative border-primary/20 hover:border-primary/40 transition-colors">
                            <CardContent className="pt-6">
                                {fields.length > 1 && (
                                    <div className="flex justify-end absolute top-2 right-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`departments.${index}.department`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Department</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-11">
                                                            <SelectValue placeholder="Select department" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(DepartmentType).map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`departments.${index}.expiryDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Expiry Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" className="h-11" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch(`departments.${index}.department`) === DepartmentType.OTHER && (
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name={`departments.${index}.customDepartmentName`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Custom Department Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter department name" className="h-11" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ department: undefined as any, expiryDate: "" })}
                    className="w-full h-11 border-dashed border-2 hover:border-primary hover:bg-primary/5"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Department
                </Button>

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
