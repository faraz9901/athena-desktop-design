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
import { useSaveOccupation } from "../../hooks/useOnboarding";
import { occupationSchema, type OccupationFormValues } from "../../schemas/onboarding.schemas";
import { OccupationType } from "../../types/onboarding.types";

interface OccupationStepProps {
    initialValue?: OccupationType;
    onSuccess: () => void;
}

export const OccupationStep = ({ initialValue, onSuccess }: OccupationStepProps) => {
    const saveOccupationMutation = useSaveOccupation();

    const form = useForm<OccupationFormValues>({
        resolver: zodResolver(occupationSchema),
        defaultValues: {
            occupation: initialValue,
        },
    });

    const onSubmit = (values: OccupationFormValues) => {
        saveOccupationMutation.mutate(values, {
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
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Occupation</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your occupation" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(OccupationType).map((type) => (
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
                    isLoading={saveOccupationMutation.isPending}
                    loadingText="Saving..."
                >
                    Next
                </LoaderButton>
            </form>
        </Form>
    );
};
