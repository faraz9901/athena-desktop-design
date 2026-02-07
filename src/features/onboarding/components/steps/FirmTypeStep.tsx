import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Building2, FileText, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { firmTypeSchema, type FirmTypeFormValues } from "../../schemas/onboarding.schemas";
import { FirmType } from "../../types/onboarding.types";

interface FirmTypeStepProps {
    initialValue?: FirmType;
    onNext: (data: { firmType: FirmType }) => void;
}

const firmTypeOptions = [
    {
        value: FirmType.PARTNERSHIP_FIRM,
        label: "Partnership Firm",
        icon: Building2,
        description: "Traditional partnership business structure"
    },
    {
        value: FirmType.LLP,
        label: "LLP",
        icon: FileText,
        description: "Limited Liability Partnership"
    },
    {
        value: FirmType.PRIVATE_LIMITED,
        label: "Private Limited",
        icon: Building,
        description: "Private Limited Company"
    },
    {
        value: FirmType.OTHER,
        label: "Other",
        icon: HelpCircle,
        description: "Specify custom firm type"
    },
];

export const FirmTypeStep = ({ initialValue, onNext }: FirmTypeStepProps) => {
    const [selected, setSelected] = useState<FirmType | undefined>(initialValue);

    const form = useForm<FirmTypeFormValues>({
        resolver: zodResolver(firmTypeSchema),
        defaultValues: {
            firmType: initialValue,
        },
    });

    const handleSelect = (value: FirmType) => {
        setSelected(value);
        form.setValue("firmType", value);
    };

    const onSubmit = (values: FirmTypeFormValues) => {
        onNext({ firmType: values.firmType });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {firmTypeOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selected === option.value;

                    return (
                        <Card
                            key={option.value}
                            className={`
                                relative p-5 cursor-pointer transition-all duration-300
                                hover:shadow-lg hover:scale-[1.02] hover:border-primary/50
                                ${isSelected
                                    ? 'border-2 border-primary bg-primary/5 shadow-md'
                                    : 'border border-border hover:bg-accent/50'
                                }
                            `}
                            onClick={() => handleSelect(option.value)}
                        >
                            <div className="flex flex-col gap-3">
                                <div className={`
                                    w-12 h-12 rounded-lg flex items-center justify-center
                                    transition-colors duration-300
                                    ${isSelected
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }
                                `}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className={`
                                        font-semibold text-base mb-1 transition-colors duration-300
                                        ${isSelected ? 'text-primary' : 'text-foreground'}
                                    `}>
                                        {option.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {option.description}
                                    </p>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {form.formState.errors.firmType && (
                <p className="text-sm text-destructive">
                    {form.formState.errors.firmType.message}
                </p>
            )}

            <Button
                type="submit"
                className="w-full h-11"
                disabled={!selected}
            >
                Continue
            </Button>
        </form>
    );
};
