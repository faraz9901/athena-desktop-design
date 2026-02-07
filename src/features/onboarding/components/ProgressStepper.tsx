import { Check } from "lucide-react";
import { OnboardingStep } from "../types/onboarding.types";

interface ProgressStepperProps {
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
}

const stepOrder: OnboardingStep[] = [
    OnboardingStep.SELECT_OCCUPATION,
    OnboardingStep.OWNERSHIP_TYPE,
    OnboardingStep.SHARE_IN_PROJECT,
    OnboardingStep.TYPE_OF_FIRM,
    OnboardingStep.FIRM_TYPE_INPUT,
    OnboardingStep.FIRM_DETAILS,
    OnboardingStep.ENLISTMENT_DEPARTMENTS,
];

const getStepLabel = (step: OnboardingStep): string => {
    const labels: Record<OnboardingStep, string> = {
        [OnboardingStep.NOT_STARTED]: "Start",
        [OnboardingStep.SELECT_OCCUPATION]: "Occupation",
        [OnboardingStep.OWNERSHIP_TYPE]: "Ownership",
        [OnboardingStep.SHARE_IN_PROJECT]: "Share Type",
        [OnboardingStep.TYPE_OF_FIRM]: "Firm Type",
        [OnboardingStep.FIRM_TYPE_INPUT]: "Custom Firm",
        [OnboardingStep.FIRM_DETAILS]: "Firm Details",
        [OnboardingStep.ENLISTMENT_DEPARTMENTS]: "Departments",
        [OnboardingStep.COMPLETED]: "Complete",
    };
    return labels[step];
};

export const ProgressStepper = ({ currentStep, completedSteps }: ProgressStepperProps) => {
    const visibleSteps = stepOrder.filter(step => {
        // Show all steps that are completed or current
        return completedSteps.includes(step) || step === currentStep;
    });

    const currentIndex = visibleSteps.findIndex(step => step === currentStep);
    const totalSteps = visibleSteps.length;

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                {/* Progress bar background */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />

                {/* Active progress bar */}
                <div
                    className="absolute top-5 left-0 h-1 bg-gradient-to-r from-primary via-primary/90 to-primary rounded-full transition-all duration-500 ease-out"
                    style={{
                        width: totalSteps > 1
                            ? `${(currentIndex / (totalSteps - 1)) * 100}%`
                            : '0%'
                    }}
                />

                {/* Steps */}
                {visibleSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step);
                    const isCurrent = step === currentStep;
                    const isPast = index < currentIndex;

                    return (
                        <div
                            key={step}
                            className="relative flex flex-col items-center"
                            style={{ zIndex: 10 }}
                        >
                            {/* Circle */}
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    transition-all duration-300 ease-out
                                    ${isCurrent
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-110'
                                        : isCompleted || isPast
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-card border-2 border-border text-muted-foreground'
                                    }
                                `}
                            >
                                {isCompleted || isPast ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-semibold">{index + 1}</span>
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={`
                                    absolute top-12 text-xs font-medium whitespace-nowrap
                                    transition-colors duration-300
                                    ${isCurrent
                                        ? 'text-primary font-semibold'
                                        : isCompleted || isPast
                                            ? 'text-foreground'
                                            : 'text-muted-foreground'
                                    }
                                `}
                            >
                                {getStepLabel(step)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
