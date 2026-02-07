import { z } from "zod";

export const mobileSchema = z.object({
    mobileNumber: z
        .string()
        .min(10, "Mobile number is required")
        .regex(/^\+?\d{10,15}$/, "Invalid mobile number"),
});

export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be 6 digits"),
});

export type MobileFormValues = z.infer<typeof mobileSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;

export const emailVerificationSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),
    email: z
        .email("Invalid email address"),
});

export const emailCodeSchema = z.object({
    code: z
        .string()
        .length(6, "Code must be 6 characters"),
});

export type EmailVerificationFormValues = z.infer<typeof emailVerificationSchema>;
export type EmailCodeFormValues = z.infer<typeof emailCodeSchema>;
