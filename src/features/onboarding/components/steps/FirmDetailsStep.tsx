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
import { useSaveFirmDetails } from "../../hooks/useOnboarding";
import { firmDetailsSchema, type FirmDetailsFormValues } from "../../schemas/onboarding.schemas";
import type { OnboardingData } from "../../types/onboarding.types";

interface FirmDetailsStepProps {
    initialData?: OnboardingData['firmDetails'];
    onSuccess: () => void;
}

export const FirmDetailsStep = ({ initialData, onSuccess }: FirmDetailsStepProps) => {
    const saveFirmDetailsMutation = useSaveFirmDetails();

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
        saveFirmDetailsMutation.mutate(values, {
            onSuccess: () => {
                onSuccess();
            },
            onError: onError,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="firmName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firm Name</FormLabel>
                            <FormControl>
                                <Input placeholder="ABC Construction App" {...field} />
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
                                <Input placeholder="123, Street Name, City" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="gstin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GSTIN</FormLabel>
                                <FormControl>
                                    <Input placeholder="29ABCDE1234F1Z5" maxLength={15} {...field} />
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
                                    <Input placeholder="ABCDE1234F" maxLength={10} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="epfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>EPFO (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="DLCPM1234567000" {...field} />
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
                                <FormLabel>ESIC (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="12-34-567890-000-0000" {...field} />
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
                                <FormLabel>TAN (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="ABCD12345E" maxLength={10} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <LoaderButton
                    type="submit"
                    className="w-full mt-4"
                    isLoading={saveFirmDetailsMutation.isPending}
                    loadingText="Saving..."
                >
                    Next
                </LoaderButton>
            </form>
        </Form>
    );
};
