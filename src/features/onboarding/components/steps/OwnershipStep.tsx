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
import { useSaveOwnershipType } from "../../hooks/useOnboarding";
import { ownershipTypeSchema, type OwnershipTypeFormValues } from "../../schemas/onboarding.schemas";
import { OwnershipType } from "../../types/onboarding.types";

interface OwnershipStepProps {
    initialValue?: OwnershipType;
    onSuccess: () => void;
}

export const OwnershipStep = ({ initialValue, onSuccess }: OwnershipStepProps) => {
    const saveOwnershipMutation = useSaveOwnershipType();

    const form = useForm<OwnershipTypeFormValues>({
        resolver: zodResolver(ownershipTypeSchema),
        defaultValues: {
            ownershipType: initialValue,
        },
    });

    const onSubmit = (values: OwnershipTypeFormValues) => {
        saveOwnershipMutation.mutate(values, {
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
                    name="ownershipType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Ownership Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ownership type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(OwnershipType).map((type) => (
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
                    isLoading={saveOwnershipMutation.isPending}
                    loadingText="Saving..."
                >
                    Next
                </LoaderButton>
            </form>
        </Form>
    );
};
