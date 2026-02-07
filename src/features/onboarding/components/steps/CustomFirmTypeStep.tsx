import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { customFirmTypeSchema, type CustomFirmTypeFormValues } from "../../schemas/onboarding.schemas";

interface CustomFirmTypeStepProps {
    initialValue?: string;
    onNext: (data: { customFirmType: string }) => void;
}

export const CustomFirmTypeStep = ({ initialValue, onNext }: CustomFirmTypeStepProps) => {
    const form = useForm<CustomFirmTypeFormValues>({
        resolver: zodResolver(customFirmTypeSchema),
        defaultValues: {
            customFirmType: initialValue || "",
        },
    });

    const onSubmit = (values: CustomFirmTypeFormValues) => {
        onNext({ customFirmType: values.customFirmType });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="customFirmType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold">Enter Custom Firm Type</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Cooperative Society, Trust, etc."
                                    className="h-11 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-sm text-muted-foreground mt-2">
                                Please specify the type of firm or organization structure
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
