import { ENDPOINTS } from '@/config/ENDPOINTS';
import { api } from '@/lib/api';

export interface SendOtpPayload {
  mobileNumber: string;
}

export interface VerifyOtpPayload {
  mobileNumber: string;
  otp: string;
}

export interface SendEmailVerificationPayload {
  name: string;
  email: string;
}

export interface VerifyEmailVerificationPayload {
  email: string;
  code: string;
}

export interface User {
  "id": string,
  "mobileNumber": string,
  "mobileVerified": boolean,
  "email": string,
  "emailVerified": boolean,
  "isGoogleUser": boolean,
  "onboardingCompleted": boolean,
  "isActive": boolean,
  "isBlocked": boolean,
  "createdAt": string,
  "updatedAt": string

}

export const sendOtp = async (payload: SendOtpPayload): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.SEND_OTP, payload);
};

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.VERIFY_OTP, payload);
};

export const sendEmailVerification = async (payload: SendEmailVerificationPayload): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.SEND_EMAIL_VERIFICATION, payload);
};

export const verifyEmailVerification = async (payload: VerifyEmailVerificationPayload): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.VERIFY_EMAIL_VERIFICATION, payload);
};

export const fetchCurrentUser = async (): Promise<User> => {
  return api.get<User>(ENDPOINTS.AUTH.ME);
};

export const refreshAccessToken = async (): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.REFRESH);
};

export const logoutRequest = async (): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.LOGOUT);
};
