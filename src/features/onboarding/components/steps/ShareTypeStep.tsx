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
import { useSaveShareType } from "../../hooks/useOnboarding";
import { shareTypeSchema, type ShareTypeFormValues } from "../../schemas/onboarding.schemas";
import { ShareType } from "../../types/onboarding.types";


interface ShareTypeStepProps {
    initialValue?: ShareType;
    onSuccess: () => void;
}

export const ShareTypeStep = ({ initialValue, onSuccess }: ShareTypeStepProps) => {
    const saveShareTypeMutation = useSaveShareType();

    const form = useForm<ShareTypeFormValues>({
        resolver: zodResolver(shareTypeSchema),
        defaultValues: {
            shareType: initialValue,
        },
    });

    const onSubmit = (values: ShareTypeFormValues) => {
        saveShareTypeMutation.mutate(values, {
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
                    name="shareType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Share Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select share type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(ShareType).map((type) => (
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
                    isLoading={saveShareTypeMutation.isPending}
                    loadingText="Saving..."
                >
                    Next
                </LoaderButton>
            </form>
        </Form>
    );
};
