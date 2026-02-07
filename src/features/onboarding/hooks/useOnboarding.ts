import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    completeOnboarding,
    getOnboardingProgress,
    saveCustomFirmType,
    saveEnlistmentDepartments,
    saveFirmDetails,
    saveFirmType,
    saveOccupation,
    saveOwnershipType,
    saveShareType,
} from "../api/onboardingApi";
import type {
    SaveCustomFirmTypeDto,
    SaveEnlistmentDepartmentsDto,
    SaveFirmDetailsDto,
    SaveFirmTypeDto,
    SaveOccupationDto,
    SaveOwnershipTypeDto,
    SaveShareTypeDto,
} from "../types/onboarding.types";

export const ONBOARDING_KEYS = {
    all: ["onboarding"] as const,
    progress: () => [...ONBOARDING_KEYS.all, "progress"] as const,
};

export const useOnboardingProgress = () => {
    return useQuery({
        queryKey: ONBOARDING_KEYS.progress(),
        queryFn: getOnboardingProgress,
    });
};

export const useSaveOccupation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveOccupationDto) => saveOccupation(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useSaveOwnershipType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveOwnershipTypeDto) => saveOwnershipType(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useSaveShareType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveShareTypeDto) => saveShareType(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useSaveFirmType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveFirmTypeDto) => saveFirmType(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useSaveCustomFirmType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveCustomFirmTypeDto) => saveCustomFirmType(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useSaveFirmDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveFirmDetailsDto) => saveFirmDetails(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useSaveEnlistmentDepartments = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SaveEnlistmentDepartmentsDto) => saveEnlistmentDepartments(data),
        onSuccess: (data) => {
            queryClient.setQueryData(ONBOARDING_KEYS.progress(), data);
        },
    });
};

export const useCompleteOnboarding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ONBOARDING_KEYS.all });
            // Invalidate current user to update onboarding status in auth state if needed
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        },
    });
};
