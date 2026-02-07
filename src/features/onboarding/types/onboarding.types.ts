// OnboardingStep
export const OnboardingStep = {
  NOT_STARTED: "not_started",
  SELECT_OCCUPATION: "select_occupation",
  OWNERSHIP_TYPE: "ownership_type",
  SHARE_IN_PROJECT: "share_in_project",
  TYPE_OF_FIRM: "type_of_firm",
  FIRM_TYPE_INPUT: "firm_type_input",
  FIRM_DETAILS: "firm_details",
  ENLISTMENT_DEPARTMENTS: "enlistment_departments",
  COMPLETED: "completed",
} as const;

export type OnboardingStep =
  typeof OnboardingStep[keyof typeof OnboardingStep];

// OccupationType
export const OccupationType = {
  GOVERNMENT_CONTRACTOR: "government_contractor",
  NON_GOVERNMENT_CONTRACTOR: "non_government_contractor",
  CONSULTANT: "consultant",
  ARCHITECT: "architect",
  INTERIOR_DESIGNER: "interior_designer",
  FREELANCER: "freelancer",
} as const;

export type OccupationType =
  typeof OccupationType[keyof typeof OccupationType];

// OwnershipType
export const OwnershipType = {
  SINGLE_OWNER: "single_owner",
  PARTNERSHIP: "partnership",
} as const;

export type OwnershipType =
  typeof OwnershipType[keyof typeof OwnershipType];

// ShareType
export const ShareType = {
  FIXED_SHARE: "fixed_share",
  FLEXIBLE_SHARE: "flexible_share",
} as const;

export type ShareType =
  typeof ShareType[keyof typeof ShareType];

// FirmType
export const FirmType = {
  PARTNERSHIP_FIRM: "partnership_firm",
  LLP: "llp",
  PRIVATE_LIMITED: "private_limited",
  OTHER: "other",
} as const;

export type FirmType =
  typeof FirmType[keyof typeof FirmType];

// DepartmentType
export const DepartmentType = {
  PWD: "pwd",
  WATER_RESOURCES: "water_resources",
  SANITATION: "sanitation",
  MES: "mes",
  BRIDGES: "bridges",
  LOCAL_BODIES: "local_bodies",
  PANCHAYAT: "panchayat",
  OTHER: "other",
} as const;

export type DepartmentType =
  typeof DepartmentType[keyof typeof DepartmentType];

export interface OnboardingData {
  occupation?: OccupationType;
  ownershipType?: OwnershipType;
  shareType?: ShareType;
  firmType?: FirmType;
  customFirmType?: string;
  firmDetails?: {
    firmName: string;
    address: string;
    gstin: string;
    pan: string;
    epfo?: string;
    esic?: string;
    tan?: string;
  };
  enlistmentDepartments?: {
    department: DepartmentType;
    customDepartmentName?: string;
    expiryDate: string;
  }[];
}

export interface OnboardingProgressResponse extends OnboardingData {
  currentStep: OnboardingStep;
  isCompleted: boolean;
  allowedNextSteps: OnboardingStep[];
}

export interface SaveOccupationDto {
  occupation: OccupationType;
}

export interface SaveOwnershipTypeDto {
  ownershipType: OwnershipType;
}

export interface SaveShareTypeDto {
  shareType: ShareType;
}

export interface SaveFirmTypeDto {
  firmType: FirmType;
}

export interface SaveCustomFirmTypeDto {
  customFirmType: string;
}

export interface SaveFirmDetailsDto {
  firmName: string;
  address: string;
  gstin: string;
  pan: string;
  epfo?: string;
  esic?: string;
  tan?: string;
}

export interface DepartmentSelectionDto {
  department: DepartmentType;
  customDepartmentName?: string;
  expiryDate: string;
}

export interface SaveEnlistmentDepartmentsDto {
  departments: DepartmentSelectionDto[];
}
