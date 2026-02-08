
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
  // await api.post<void>(ENDPOINTS.AUTH.SEND_OTP, payload);
  // Mocking API response for development
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 1000);
  });
};

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<void> => {
  // await api.post<void>(ENDPOINTS.AUTH.VERIFY_OTP, payload);
  // Mocking API response for development
  localStorage.setItem("mock_token", "mock_access_token");
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 1000);
  });
};

export const sendEmailVerification = async (payload: SendEmailVerificationPayload): Promise<void> => {
  // await api.post<void>(ENDPOINTS.AUTH.SEND_EMAIL_VERIFICATION, payload);
  // Mocking API response for development
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 1000);
  });
};

export const verifyEmailVerification = async (payload: VerifyEmailVerificationPayload): Promise<void> => {
  // await api.post<void>(ENDPOINTS.AUTH.VERIFY_EMAIL_VERIFICATION, payload);
  // Mocking API response for development
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 1000);
  });
};

export const fetchCurrentUser = async (): Promise<User> => {
  if (localStorage.getItem("mock_token")) {
    // Mocking API response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "1",
          mobileNumber: "9876543210",
          mobileVerified: true,
          email: "B6TtQ@example.com",
          emailVerified: true,
          isGoogleUser: false,
          onboardingCompleted: true,
          isActive: true,
          isBlocked: false,
          createdAt: "2022-01-01T00:00:00.000Z",
          updatedAt: "2022-01-01T00:00:00.000Z",
        });
      }, 1000);
    });
  } else {
    throw new Error("Unauthorized");
  }
  // return api.get<User>(ENDPOINTS.AUTH.ME);
};

export const refreshAccessToken = async (): Promise<void> => {
  localStorage.setItem("mock_token", "mock_access_token");
  // await api.post<void>(ENDPOINTS.AUTH.REFRESH);
};

export const logoutRequest = async (): Promise<void> => {
  localStorage.removeItem("mock_token");
  //await api.post<void>(ENDPOINTS.AUTH.LOGOUT);
};
