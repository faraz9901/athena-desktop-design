
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoaderButton } from "@/components/ui/loader-button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomFirmTypeStep } from "../components/steps/CustomFirmTypeStep";
import { EnlistmentDepartmentsStep } from "../components/steps/EnlistmentDepartmentsStep";
import { FirmDetailsStep } from "../components/steps/FirmDetailsStep";
import { FirmTypeStep } from "../components/steps/FirmTypeStep";
import { OccupationStep } from "../components/steps/OccupationStep";
import { OwnershipStep } from "../components/steps/OwnershipStep";
import { ShareTypeStep } from "../components/steps/ShareTypeStep";
import { useCompleteOnboarding, useOnboardingProgress } from "../hooks/useOnboarding";
import { OnboardingStep } from "../types/onboarding.types";

const OnboardingPage = () => {
    const { data: progress, isLoading, refetch } = useOnboardingProgress();
    const completeOnboardingMutation = useCompleteOnboarding();
    const navigate = useNavigate();

    useEffect(() => {
        if (progress?.isCompleted) {
            navigate("/");
        }
    }, [progress?.isCompleted, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!progress) {
        return null;
    }


    const renderStep = () => {
        switch (progress.currentStep) {

            case OnboardingStep.NOT_STARTED:
                return (
                    <OccupationStep
                        initialValue={progress.occupation}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.SELECT_OCCUPATION:
                return (
                    <OwnershipStep
                        initialValue={progress.ownershipType}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.OWNERSHIP_TYPE:
                return (
                    <ShareTypeStep
                        initialValue={progress.shareType}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.SHARE_IN_PROJECT:
                return (
                    <FirmTypeStep
                        initialValue={progress.firmType}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.TYPE_OF_FIRM:
                return (
                    <CustomFirmTypeStep
                        initialValue={progress.customFirmType}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.FIRM_TYPE_INPUT:
                return (
                    <FirmDetailsStep
                        initialData={progress.firmDetails}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.FIRM_DETAILS:
                return (
                    <EnlistmentDepartmentsStep
                        initialData={progress.enlistmentDepartments}
                        onSuccess={refetch}
                    />
                );
            case OnboardingStep.ENLISTMENT_DEPARTMENTS:
                return (
                    <div className="space-y-4">
                        <p className="text-center text-muted-foreground">
                            You have completed all the steps. Click below to finish.
                        </p>
                        <LoaderButton
                            onClick={() => completeOnboardingMutation.mutate(undefined, {
                                onSuccess: () => navigate("/")
                            })}
                            isLoading={completeOnboardingMutation.isPending}
                            className="w-full"
                        >
                            Complete Onboarding
                        </LoaderButton>
                    </div>
                );
            default:
                return null
        }
    };

    const getStepTitle = () => {
        switch (progress.currentStep) {
            case OnboardingStep.SELECT_OCCUPATION:
                return "Select Occupation";
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg shadow-xl pt-0 rounded-xl overflow-hidden">
                <CardHeader className="text-primary px-8 pt-8 pb-4 border-b/10 border-b">
                    <h1 className="text-2xl font-bold">{getStepTitle()}</h1>
                    <p className="text-sm text-muted-foreground">
                        Please provide the required details to continue.
                    </p>
                </CardHeader>
                <CardContent className="p-8">
                    {renderStep()}
                </CardContent>
            </Card>
        </div>
    );
};

export default OnboardingPage;