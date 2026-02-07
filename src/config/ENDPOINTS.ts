export const ENDPOINTS = {
    AUTH: {
        SEND_OTP: '/auth/send-otp',
        VERIFY_OTP: '/auth/verify-otp',
        ME: '/auth/me',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
        SEND_EMAIL_VERIFICATION: '/auth/send-email-verification',
        VERIFY_EMAIL_VERIFICATION: '/auth/verify-email',
    },
    ONBOARDING: {
        PROGRESS: '/onboarding/progress',
        OCCUPATION: '/onboarding/occupation',
        OWNERSHIP_TYPE: '/onboarding/ownership-type',
        SHARE_TYPE: '/onboarding/share-type',
        FIRM_TYPE: '/onboarding/firm-type',
        CUSTOM_FIRM_TYPE: '/onboarding/custom-firm-type',
        FIRM_DETAILS: '/onboarding/firm-details',
        ENLISTMENT_DEPARTMENTS: '/onboarding/enlistment-departments',
        COMPLETE: '/onboarding/complete',
    }
}