import { z } from "zod";
import {
    DepartmentType,
    FirmType,
    OccupationType,
    OwnershipType,
    ShareType,
} from "../types/onboarding.types";

export const occupationSchema = z.object({
    occupation: z.enum(Object.values(OccupationType), "Please select a valid occupation")
});

export const ownershipTypeSchema = z.object({
    ownershipType: z.enum(Object.values(OwnershipType), "Please select a valid ownership"),
});

export const shareTypeSchema = z.object({
    shareType: z.enum(Object.values(ShareType), "Please select a valid share type"),
});

export const firmTypeSchema = z.object({
    firmType: z.enum(Object.values(FirmType), "Please select a valid firm type"),
});

export const customFirmTypeSchema = z.object({
    customFirmType: z
        .string()
        .min(1, "Custom firm type is required")
        .max(100, "Custom firm type must be less than 100 characters"),
});

export const firmDetailsSchema = z.object({
    firmName: z
        .string()
        .min(1, "Firm name is required")
        .max(255, "Firm name must be less than 255 characters"),
    address: z.string().min(1, "Address is required"),
    gstin: z
        .string()
        .length(15, "GSTIN must be exactly 15 characters")
    // .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format")
    ,
    pan: z
        .string()
        .length(10, "PAN must be exactly 10 characters")
    // .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    ,
    epfo: z.string().max(50, "EPFO must be less than 50 characters").optional(),
    esic: z.string().max(50, "ESIC must be less than 50 characters").optional(),
    tan: z.preprocess((val) => (val === "" ? undefined : val), z.string().length(10, "TAN must be exactly 10 characters").optional()),
});

export const departmentSelectionSchema = z
    .object({
        department: z.enum(DepartmentType, "Please select a valid department"),
        customDepartmentName: z
            .string()
            .max(100, "Custom department name must be less than 100 characters")
            .optional(),
        expiryDate: z
            .string()
            .min(1, "Expiry date is required")
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    })
    .refine(
        (data) => {
            if (data.department === DepartmentType.OTHER) {
                return !!data.customDepartmentName && data.customDepartmentName.length > 0;
            }
            return true;
        },
        {
            message: "Custom department name is required when 'Other' is selected",
            path: ["customDepartmentName"],
        }
    );

export const enlistmentDepartmentsSchema = z.object({
    departments: z
        .array(departmentSelectionSchema)
        .min(1, "At least one department is required"),
});

export type OccupationFormValues = z.infer<typeof occupationSchema>;
export type OwnershipTypeFormValues = z.infer<typeof ownershipTypeSchema>;
export type ShareTypeFormValues = z.infer<typeof shareTypeSchema>;
export type FirmTypeFormValues = z.infer<typeof firmTypeSchema>;
export type CustomFirmTypeFormValues = z.infer<typeof customFirmTypeSchema>;
export type FirmDetailsFormValues = z.infer<typeof firmDetailsSchema>;
export type EnlistmentDepartmentsFormValues = z.infer<typeof enlistmentDepartmentsSchema>;
export type DepartmentSelectionFormValues = z.infer<typeof departmentSelectionSchema>;
