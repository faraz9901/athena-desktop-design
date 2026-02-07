import { ENDPOINTS } from '@/config/ENDPOINTS';
import { api } from '@/lib/api';

export interface SendOtpPayload {
  mobileNumber: string;
}

export interface VerifyOtpPayload {
  mobileNumber: string;
  otp: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email?: string;
  mobileNumber: string;
}

export const sendOtp = async (payload: SendOtpPayload): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.SEND_OTP, payload);
};

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.VERIFY_OTP, payload);
};

export const fetchCurrentUser = async (): Promise<CurrentUser> => {
  return api.get<CurrentUser>(ENDPOINTS.AUTH.ME);
};

export const refreshAccessToken = async (): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.REFRESH);
};

export const logoutRequest = async (): Promise<void> => {
  await api.post<void>(ENDPOINTS.AUTH.LOGOUT);
};
