import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/ui/loader-button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { onError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSaveFirmType } from "../../hooks/useOnboarding";
import { firmTypeSchema, type FirmTypeFormValues } from "../../schemas/onboarding.schemas";
import { FirmType } from "../../types/onboarding.types";


interface FirmTypeStepProps {
    initialValue?: FirmType;
    onSuccess: () => void;
}

export const FirmTypeStep = ({ initialValue, onSuccess }: FirmTypeStepProps) => {
    const saveFirmTypeMutation = useSaveFirmType();

    const form = useForm<FirmTypeFormValues>({
        resolver: zodResolver(firmTypeSchema),
        defaultValues: {
            firmType: initialValue,
        },
    });

    const onSubmit = (values: FirmTypeFormValues) => {
        saveFirmTypeMutation.mutate(values, {
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
                    name="firmType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Firm Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select firm type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(FirmType).map((type) => (
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

                <LoaderButton
                    type="submit"
                    className="w-full"
                    isLoading={saveFirmTypeMutation.isPending}
                    loadingText="Saving..."
                >
                    Next
                </LoaderButton>
            </form>
        </Form>
    );
};
