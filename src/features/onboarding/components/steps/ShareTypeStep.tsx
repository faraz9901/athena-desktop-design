import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Percent, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { shareTypeSchema, type ShareTypeFormValues } from "../../schemas/onboarding.schemas";
import { ShareType } from "../../types/onboarding.types";

interface ShareTypeStepProps {
    initialValue?: ShareType;
    onNext: (data: { shareType: ShareType }) => void;
}

const shareTypeOptions = [
    {
        value: ShareType.FIXED_SHARE,
        label: "Fixed Share",
        icon: Percent,
        description: "Fixed percentage of ownership across all projects"
    },
    {
        value: ShareType.FLEXIBLE_SHARE,
        label: "Flexible Share",
        icon: TrendingUp,
        description: "Variable ownership percentage per project"
    },
];

export const ShareTypeStep = ({ initialValue, onNext }: ShareTypeStepProps) => {
    const [selected, setSelected] = useState<ShareType | undefined>(initialValue);

    const form = useForm<ShareTypeFormValues>({
        resolver: zodResolver(shareTypeSchema),
        defaultValues: {
            shareType: initialValue,
        },
    });

    const handleSelect = (value: ShareType) => {
        setSelected(value);
        form.setValue("shareType", value);
    };

    const onSubmit = (values: ShareTypeFormValues) => {
        onNext({ shareType: values.shareType });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shareTypeOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selected === option.value;

                    return (
                        <Card
                            key={option.value}
                            className={`
                                relative p-6 cursor-pointer transition-all duration-300
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
                                    w-14 h-14 rounded-xl flex items-center justify-center
                                    transition-colors duration-300
                                    ${isSelected
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }
                                `}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className={`
                                        font-semibold text-lg mb-1 transition-colors duration-300
                                        ${isSelected ? 'text-primary' : 'text-foreground'}
                                    `}>
                                        {option.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {option.description}
                                    </p>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {form.formState.errors.shareType && (
                <p className="text-sm text-destructive">
                    {form.formState.errors.shareType.message}
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
