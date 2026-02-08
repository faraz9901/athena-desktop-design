import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Building2, Hammer, Palette, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { occupationSchema, type OccupationFormValues } from "../../schemas/onboarding.schemas";
import { OccupationType } from "../../types/onboarding.types";

interface OccupationStepProps {
    initialValue?: OccupationType;
    onNext: (data: { occupation: OccupationType }) => void;
}

const occupationOptions = [
    {
        value: OccupationType.GOVERNMENT_CONTRACTOR,
        label: "Government Contractor",
        icon: Building2,
        description: "Work on government projects and tenders"
    },
    {
        value: OccupationType.NON_GOVERNMENT_CONTRACTOR,
        label: "Non-Government Contractor",
        icon: Hammer,
        description: "Private sector construction projects"
    },
    {
        value: OccupationType.CONSULTANT,
        label: "Consultant",
        icon: Briefcase,
        description: "Provide expert consulting services"
    },
    {
        value: OccupationType.ARCHITECT,
        label: "Architect",
        icon: Palette,
        description: "Design and plan construction projects"
    },
    {
        value: OccupationType.INTERIOR_DESIGNER,
        label: "Interior Designer",
        icon: Palette,
        description: "Interior design and decoration"
    },
    {
        value: OccupationType.FREELANCER,
        label: "Freelancer",
        icon: Users,
        description: "Independent project work"
    },
];

export const OccupationStep = ({ initialValue, onNext }: OccupationStepProps) => {
    const [selected, setSelected] = useState<OccupationType | undefined>(initialValue);

    const form = useForm<OccupationFormValues>({
        resolver: zodResolver(occupationSchema),
        defaultValues: {
            occupation: initialValue,
        },
    });

    const handleSelect = (value: OccupationType) => {
        setSelected(value);
        form.setValue("occupation", value);
    };

    const onSubmit = (values: OccupationFormValues) => {
        onNext({ occupation: values.occupation });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid grid-cols-4 gap-5">
                {occupationOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selected === option.value;

                    return (
                        <Card
                            key={option.value}
                            className={`
                                relative p-5 cursor-pointer transition-all duration-300
                                hover:shadow-lg  hover:border-primary/50
                                ${isSelected
                                    ? 'border border-primary bg-primary/5 shadow-md'
                                    : 'border border-border hover:bg-accent/50'
                                }
                            `}
                            onClick={() => handleSelect(option.value)}
                        >
                            <div className="flex flex-col gap-4">
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

            {form.formState.errors.occupation && (
                <p className="text-sm text-destructive">
                    {form.formState.errors.occupation.message}
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
