import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    FirmType,
    OccupationType,
    type OnboardingData,
    OnboardingStep,
    OwnershipType
} from '../../features/onboarding/types/onboarding.types';
import type { RootState } from '../store';

interface OnboardingState {
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
    onboardingData: OnboardingData;
    progress: number;
}

const initialState: OnboardingState = {
    currentStep: OnboardingStep.NOT_STARTED,
    completedSteps: [],
    onboardingData: {},
    progress: 0,
};

// Helper to calculate total value for progress bar
const calculateProgress = (step: OnboardingStep): number => {
    // Approximate progress mapping
    const stepWeights: Record<OnboardingStep, number> = {
        [OnboardingStep.NOT_STARTED]: 0,
        [OnboardingStep.SELECT_OCCUPATION]: 10,
        [OnboardingStep.OWNERSHIP_TYPE]: 30,
        [OnboardingStep.SHARE_IN_PROJECT]: 45,
        [OnboardingStep.TYPE_OF_FIRM]: 60,
        [OnboardingStep.FIRM_TYPE_INPUT]: 70,
        [OnboardingStep.FIRM_DETAILS]: 80,
        [OnboardingStep.ENLISTMENT_DEPARTMENTS]: 90,
        [OnboardingStep.COMPLETED]: 100,
    };
    return stepWeights[step] || 0;
};

// Helper to determine next step logic (moved from OnboardingPage)
const getNextStep = (
    step: OnboardingStep,
    data: OnboardingData
): OnboardingStep => {
    const { occupation, ownershipType, firmType } = data;

    // Start
    if (step === OnboardingStep.NOT_STARTED) {
        return OnboardingStep.SELECT_OCCUPATION;
    }

    // Occupation selection
    if (step === OnboardingStep.SELECT_OCCUPATION) {
        // Only govt contractors continue onboarding
        if (occupation === OccupationType.GOVERNMENT_CONTRACTOR) {
            return OnboardingStep.OWNERSHIP_TYPE;
        }
        return OnboardingStep.COMPLETED;
    }

    // Ownership (only for govt contractors)
    if (step === OnboardingStep.OWNERSHIP_TYPE) {
        // Single owner ends onboarding
        if (ownershipType === OwnershipType.SINGLE_OWNER) {
            return OnboardingStep.COMPLETED;
        }

        // Partnership continues
        if (ownershipType === OwnershipType.PARTNERSHIP) {
            return OnboardingStep.SHARE_IN_PROJECT;
        }
    }

    // From here on: PARTNERSHIP ONLY
    if (step === OnboardingStep.SHARE_IN_PROJECT) {
        return OnboardingStep.TYPE_OF_FIRM;
    }

    if (step === OnboardingStep.TYPE_OF_FIRM) {
        return firmType === FirmType.OTHER
            ? OnboardingStep.FIRM_TYPE_INPUT
            : OnboardingStep.FIRM_DETAILS;
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

export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        startOnboarding: (state) => {
            state.currentStep = OnboardingStep.SELECT_OCCUPATION;
            state.progress = calculateProgress(OnboardingStep.SELECT_OCCUPATION);
        },
        setStep: (state, action: PayloadAction<OnboardingStep>) => {
            state.currentStep = action.payload;
            state.progress = calculateProgress(action.payload);
        },
        updateOnboardingData: (state, action: PayloadAction<Partial<OnboardingData>>) => {
            state.onboardingData = { ...state.onboardingData, ...action.payload };
        },
        completeStep: (state, action: PayloadAction<Partial<OnboardingData> | undefined>) => {
            // 1. Update Data
            if (action.payload) {
                state.onboardingData = { ...state.onboardingData, ...action.payload };
            }

            // 2. Mark current as completed if not already
            if (!state.completedSteps.includes(state.currentStep)) {
                state.completedSteps.push(state.currentStep);
            }

            // 3. Determine Next Step
            const nextStep = getNextStep(state.currentStep, state.onboardingData);
            state.currentStep = nextStep;

            // 4. Update Progress
            state.progress = calculateProgress(nextStep);
        },
        resetOnboarding: () => {
            return initialState;
        }
    },
});

export const { startOnboarding, setStep, updateOnboardingData, completeStep, resetOnboarding } = onboardingSlice.actions;

export const selectCurrentStep = (state: RootState) => state.onboarding.currentStep;
export const selectCompletedSteps = (state: RootState) => state.onboarding.completedSteps;
export const selectOnboardingData = (state: RootState) => state.onboarding.onboardingData;
export const selectOnboardingProgress = (state: RootState) => state.onboarding.progress;

export default onboardingSlice.reducer;
