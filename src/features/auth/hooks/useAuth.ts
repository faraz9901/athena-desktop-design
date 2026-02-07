import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setCheckedAuth, setLoading, setUser } from '@/store/slices/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  fetchCurrentUser,
  logoutRequest,
  sendEmailVerification,
  sendOtp,
  verifyEmailVerification,
  verifyOtp,
  type SendEmailVerificationPayload,
  type SendOtpPayload,
  type VerifyEmailVerificationPayload,
  type VerifyOtpPayload,
} from './authApi';


const ME_QUERY_KEY = ['auth', 'me'] as const;

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: fetchCurrentUser,
    retry: 1,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }
    if (query.isSuccess) {
      dispatch(setUser(query.data));
    }
    if (query.isError) {
      dispatch(setUser(null));
    }
    if (!query.isLoading) {
      dispatch(setCheckedAuth(true));
    }
  }, [query.isLoading, query.isSuccess, query.isError, query.data, dispatch]);

  return query.data;
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => sendOtp(payload),
  });
};

export const useVerifyOtp = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: async () => {
      const user = await queryClient.fetchQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: fetchCurrentUser,
      });
      dispatch(setUser(user));
    },
  });
};

export const useSendEmailVerification = () => {
  return useMutation({
    mutationFn: (payload: SendEmailVerificationPayload) => sendEmailVerification(payload),
  });
};

export const useVerifyEmailVerification = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyEmailVerificationPayload) => verifyEmailVerification(payload),
    onSuccess: async () => {
      const user = await queryClient.fetchQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: fetchCurrentUser,
      });
      dispatch(setUser(user));
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutRequest(),
    onSuccess: () => {
      dispatch(logout());
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
    },
  });
};

export const useAuthState = () => {
  return useAppSelector((state) => state.auth);
};
