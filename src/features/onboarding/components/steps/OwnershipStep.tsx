import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ownershipTypeSchema, type OwnershipTypeFormValues } from "../../schemas/onboarding.schemas";
import { OwnershipType } from "../../types/onboarding.types";

interface OwnershipStepProps {
    initialValue?: OwnershipType;
    onNext: (data: { ownershipType: OwnershipType }) => void;
}

const ownershipOptions = [
    {
        value: OwnershipType.SINGLE_OWNER,
        label: "Single Owner",
        icon: User,
        description: "Sole proprietorship - you own the business independently"
    },
    {
        value: OwnershipType.PARTNERSHIP,
        label: "Partnership",
        icon: Building2,
        description: "Multiple partners sharing ownership and responsibilities"
    },
];

export const OwnershipStep = ({ initialValue, onNext }: OwnershipStepProps) => {
    const [selected, setSelected] = useState<OwnershipType | undefined>(initialValue);

    const form = useForm<OwnershipTypeFormValues>({
        resolver: zodResolver(ownershipTypeSchema),
        defaultValues: {
            ownershipType: initialValue,
        },
    });

    const handleSelect = (value: OwnershipType) => {
        setSelected(value);
        form.setValue("ownershipType", value);
    };

    const onSubmit = (values: OwnershipTypeFormValues) => {
        onNext({ ownershipType: values.ownershipType });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {ownershipOptions.map((option) => {
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
                            <div className="flex flex-col gap-4">
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

            {form.formState.errors.ownershipType && (
                <p className="text-sm text-destructive">
                    {form.formState.errors.ownershipType.message}
                </p>
            )}

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="h-11 px-8 min-w-[180px]"
                    disabled={!selected}
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};
