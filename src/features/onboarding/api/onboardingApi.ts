import { ENDPOINTS } from "@/config/ENDPOINTS";
import { api } from "@/lib/api";
import type {
    OnboardingProgressResponse,
    SaveCustomFirmTypeDto,
    SaveEnlistmentDepartmentsDto,
    SaveFirmDetailsDto,
    SaveFirmTypeDto,
    SaveOccupationDto,
    SaveOwnershipTypeDto,
    SaveShareTypeDto,
} from "../types/onboarding.types";

export const getOnboardingProgress = async (): Promise<OnboardingProgressResponse> => {
    return api.get(ENDPOINTS.ONBOARDING.PROGRESS);
};

export const saveOccupation = async (data: SaveOccupationDto): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.OCCUPATION, data);
};

export const saveOwnershipType = async (data: SaveOwnershipTypeDto): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.OWNERSHIP_TYPE, data);
};

export const saveShareType = async (data: SaveShareTypeDto): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.SHARE_TYPE, data);
};

export const saveFirmType = async (data: SaveFirmTypeDto): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.FIRM_TYPE, data);
};

export const saveCustomFirmType = async (data: SaveCustomFirmTypeDto): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.CUSTOM_FIRM_TYPE, data);
};

export const saveFirmDetails = async (data: SaveFirmDetailsDto): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.FIRM_DETAILS, data);
};

export const saveEnlistmentDepartments = async (
    data: SaveEnlistmentDepartmentsDto
): Promise<OnboardingProgressResponse> => {
    return api.post(ENDPOINTS.ONBOARDING.ENLISTMENT_DEPARTMENTS, data);
};

export const completeOnboarding = async (): Promise<void> => {
    return api.post(ENDPOINTS.ONBOARDING.COMPLETE);
};
