import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/ui/loader-button";
import { onError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSaveCustomFirmType } from "../../hooks/useOnboarding";
import { customFirmTypeSchema, type CustomFirmTypeFormValues } from "../../schemas/onboarding.schemas";


interface CustomFirmTypeStepProps {
    initialValue?: string;
    onSuccess: () => void;
}

export const CustomFirmTypeStep = ({ initialValue, onSuccess }: CustomFirmTypeStepProps) => {
    const saveCustomFirmTypeMutation = useSaveCustomFirmType();

    const form = useForm<CustomFirmTypeFormValues>({
        resolver: zodResolver(customFirmTypeSchema),
        defaultValues: {
            customFirmType: initialValue || "",
        },
    });

    const onSubmit = (values: CustomFirmTypeFormValues) => {
        saveCustomFirmTypeMutation.mutate(values, {
            onSuccess: () => {
                onSuccess();
            },
            onError: onError,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="customFirmType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Custom Firm Type</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Cooperative Society" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoaderButton
                    type="submit"
                    className="w-full"
                    isLoading={saveCustomFirmTypeMutation.isPending}
                    loadingText="Saving..."
                >
                    Next
                </LoaderButton>
            </form>
        </Form>
    );
};
