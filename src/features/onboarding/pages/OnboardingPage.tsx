import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    completeStep,
    selectCompletedSteps,
    selectCurrentStep,
    selectOnboardingData,
    selectOnboardingProgress,
    startOnboarding
} from "@/store/slices/onboardingSlice";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    OnboardingStep,
    type OnboardingData
} from "../types/onboarding.types";

const OnboardingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentStep = useSelector(selectCurrentStep);
    const completedSteps = useSelector(selectCompletedSteps);
    const onboardingData = useSelector(selectOnboardingData);
    const progress = useSelector(selectOnboardingProgress);

    const handleStepComplete = (stepData: Partial<OnboardingData>) => {
        dispatch(completeStep(stepData));
    };

    useEffect(() => {
        dispatch(startOnboarding());
    }, []);

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
        <div className="bg-background">
            <div className="mx-auto max-w-[1440px]">
                <Card className="flex pt-0 flex-col rounded-none border border-border/60 shadow-xl">
                    {/* Header */}
                    <CardHeader className="border-b bg-linear-to-r from-primary/5 via-primary/10 to-accent/5 px-10 py-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <h1 className="text-primary text-3xl font-semibold tracking-tight">
                                    {getStepTitle(currentStep)}
                                </h1>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    {getStepDescription(currentStep)}
                                </p>
                            </div>

                            {currentStep !== OnboardingStep.COMPLETED && (
                                <div className="text-right text-sm">
                                    <p className="mt-1 text-muted-foreground">
                                        Complete your onboarding
                                    </p>
                                </div>
                            )}
                        </div>

                        {currentStep !== OnboardingStep.COMPLETED && (
                            <div className="mt-5">
                                <ProgressStepper
                                    currentStep={currentStep}
                                    completedSteps={completedSteps}
                                />
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        {renderStep()}
                    </CardContent>
                </Card>
            </div>
        </div >
    );
};

export default OnboardingPage;