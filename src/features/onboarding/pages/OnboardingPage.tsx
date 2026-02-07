import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressStepper } from "../components/ProgressStepper";
import { CustomFirmTypeStep } from "../components/steps/CustomFirmTypeStep";
import { EnlistmentDepartmentsStep } from "../components/steps/EnlistmentDepartmentsStep";
import { FirmDetailsStep } from "../components/steps/FirmDetailsStep";
import { FirmTypeStep } from "../components/steps/FirmTypeStep";
import { OccupationStep } from "../components/steps/OccupationStep";
import { OwnershipStep } from "../components/steps/OwnershipStep";
import { ShareTypeStep } from "../components/steps/ShareTypeStep";
import {
    FirmType,
    OccupationType,
    OnboardingStep,
    OwnershipType,
    type OnboardingData,
} from "../types/onboarding.types";

const OnboardingPage = () => {
    const navigate = useNavigate();

    // Local state management - no API calls
    const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.NOT_STARTED);
    const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>([]);
    const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

    const getNextStep = (
        step: OnboardingStep,
        occupation?: OccupationType,
        ownershipType?: OwnershipType,
        firmType?: FirmType,
    ): OnboardingStep => {
        if (step === OnboardingStep.NOT_STARTED) {
            return OnboardingStep.SELECT_OCCUPATION;
        }

        if (step === OnboardingStep.SELECT_OCCUPATION) {
            if (occupation === OccupationType.GOVERNMENT_CONTRACTOR) {
                return OnboardingStep.OWNERSHIP_TYPE;
            }
            return OnboardingStep.COMPLETED;
        }

        if (step === OnboardingStep.OWNERSHIP_TYPE) {
            if (ownershipType === OwnershipType.SINGLE_OWNER) {
                return OnboardingStep.COMPLETED;
            }
            if (ownershipType === OwnershipType.PARTNERSHIP) {
                return OnboardingStep.SHARE_IN_PROJECT;
            }
        }

        if (step === OnboardingStep.SHARE_IN_PROJECT) {
            return OnboardingStep.TYPE_OF_FIRM;
        }

        if (step === OnboardingStep.TYPE_OF_FIRM) {
            if (firmType === FirmType.OTHER) {
                return OnboardingStep.FIRM_TYPE_INPUT;
            }
            return OnboardingStep.FIRM_DETAILS;
        }

        if (step === OnboardingStep.FIRM_TYPE_INPUT) {
            return OnboardingStep.FIRM_DETAILS;
        }

        if (step === OnboardingStep.FIRM_DETAILS) {
            return OnboardingStep.ENLISTMENT_DEPARTMENTS;
        }

        if (step === OnboardingStep.ENLISTMENT_DEPARTMENTS) {
            return OnboardingStep.COMPLETED;
        }

        return OnboardingStep.COMPLETED;
    };

    const handleStepComplete = (stepData: Partial<OnboardingData>) => {
        const newData = { ...onboardingData, ...stepData };
        setOnboardingData(newData);

        // Mark current step as completed
        setCompletedSteps([...completedSteps, currentStep]);

        // Determine next step
        const nextStep = getNextStep(
            currentStep,
            newData.occupation,
            newData.ownershipType,
            newData.firmType
        );

        setCurrentStep(nextStep);
    };

    const handleComplete = () => {
        // Navigate to home or dashboard
        navigate("/");
    };

    const getStepTitle = (step: OnboardingStep) => {
        switch (step) {
            case OnboardingStep.NOT_STARTED:
            case OnboardingStep.SELECT_OCCUPATION:
                return "Select Your Occupation";
            case OnboardingStep.OWNERSHIP_TYPE:
                return "Ownership Type";
            case OnboardingStep.SHARE_IN_PROJECT:
                return "Share in Project";
            case OnboardingStep.TYPE_OF_FIRM:
                return "Type of Firm";
            case OnboardingStep.FIRM_TYPE_INPUT:
                return "Custom Firm Type";
            case OnboardingStep.FIRM_DETAILS:
                return "Firm Details";
            case OnboardingStep.ENLISTMENT_DEPARTMENTS:
                return "Enlistment Departments";
            case OnboardingStep.COMPLETED:
                return "All Done!";
            default:
                return "Onboarding";
        }
    };

    const getStepDescription = (step: OnboardingStep) => {
        switch (step) {
            case OnboardingStep.NOT_STARTED:
            case OnboardingStep.SELECT_OCCUPATION:
                return "Tell us about your profession to personalize your experience";
            case OnboardingStep.OWNERSHIP_TYPE:
                return "How is your business structured?";
            case OnboardingStep.SHARE_IN_PROJECT:
                return "Define how ownership is distributed";
            case OnboardingStep.TYPE_OF_FIRM:
                return "Select your firm's legal structure";
            case OnboardingStep.FIRM_TYPE_INPUT:
                return "Specify your unique firm type";
            case OnboardingStep.FIRM_DETAILS:
                return "Provide your firm's registration information";
            case OnboardingStep.ENLISTMENT_DEPARTMENTS:
                return "Add government departments you're enlisted with";
            case OnboardingStep.COMPLETED:
                return "Your profile is ready to go!";
            default:
                return "";
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case OnboardingStep.NOT_STARTED:
            case OnboardingStep.SELECT_OCCUPATION:
                return (
                    <OccupationStep
                        initialValue={onboardingData.occupation}
                        onNext={handleStepComplete}
                    />
                );
            case OnboardingStep.OWNERSHIP_TYPE:
                return (
                    <OwnershipStep
                        initialValue={onboardingData.ownershipType}
                        onNext={handleStepComplete}
                    />
                );
            case OnboardingStep.SHARE_IN_PROJECT:
                return (
                    <ShareTypeStep
                        initialValue={onboardingData.shareType}
                        onNext={handleStepComplete}
                    />
                );
            case OnboardingStep.TYPE_OF_FIRM:
                return (
                    <FirmTypeStep
                        initialValue={onboardingData.firmType}
                        onNext={handleStepComplete}
                    />
                );
            case OnboardingStep.FIRM_TYPE_INPUT:
                return (
                    <CustomFirmTypeStep
                        initialValue={onboardingData.customFirmType}
                        onNext={handleStepComplete}
                    />
                );
            case OnboardingStep.FIRM_DETAILS:
                return (
                    <FirmDetailsStep
                        initialData={onboardingData.firmDetails}
                        onNext={(data) => handleStepComplete({ firmDetails: data })}
                    />
                );
            case OnboardingStep.ENLISTMENT_DEPARTMENTS:
                return (
                    <EnlistmentDepartmentsStep
                        initialData={onboardingData.enlistmentDepartments}
                        onNext={(data) => handleStepComplete({ enlistmentDepartments: data.departments })}
                    />
                );
            case OnboardingStep.COMPLETED:
                return (
                    <div className="space-y-6 py-8 text-center">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-foreground">
                                Onboarding Complete!
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Your profile has been set up successfully. You're all ready to start managing your projects.
                            </p>
                        </div>
                        <Button
                            onClick={handleComplete}
                            className="w-full max-w-xs h-11"
                            size="lg"
                        >
                            Get Started
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-8">
            <Card className="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border-primary/10">
                {/* Header with gradient */}
                <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 px-8 pt-8 pb-6 border-b">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-foreground">
                            {getStepTitle(currentStep)}
                        </h1>
                        <p className="text-base text-muted-foreground">
                            {getStepDescription(currentStep)}
                        </p>
                    </div>

                    {/* Progress Stepper - only show if not completed */}
                    {currentStep !== OnboardingStep.COMPLETED && (
                        <div className="mt-6">
                            <ProgressStepper
                                currentStep={currentStep}
                                completedSteps={completedSteps}
                            />
                        </div>
                    )}
                </CardHeader>

                {/* Content */}
                <CardContent className="p-8">
                    <div className="animate-in fade-in duration-500">
                        {renderStep()}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OnboardingPage;