import { ENDPOINTS } from "@/config/ENDPOINTS";
import axios, { type AxiosRequestConfig } from "axios";
import { extractErrorMessage } from "./error-extractor";


const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

interface BaseResponse<T> {
    success: boolean;
    message: string;
    code: string;
    data: T;
}

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiError";
    }
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

/* -------------------------------------------------------------------------- */
/*                               REFRESH LOGIC                                 */
/* -------------------------------------------------------------------------- */

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

const refreshToken = async () => {
    if (!refreshPromise) {
        refreshPromise = axiosInstance
            .post(ENDPOINTS.AUTH.REFRESH)
            .then(() => {
                refreshPromise = null;
            })
            .catch((err) => {
                refreshPromise = null;
                throw err;
            });
    }

    return refreshPromise;
};

/* -------------------------------------------------------------------------- */
/*                            RESPONSE INTERCEPTOR                              */
/* -------------------------------------------------------------------------- */

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config;
        const data = error.response?.data as BaseResponse<any> | undefined;

        // ⛔ Don't intercept refresh endpoint
        if (originalConfig?.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        // 🔥 Handle 401 + SESSION_EXPIRED
        if (
            error.response?.status === 401 &&
            data?.code === "SESSION_EXPIRED"
        ) {
            try {
                if (!isRefreshing) {
                    isRefreshing = true;
                    await refreshToken();
                    isRefreshing = false;
                } else {
                    await refreshPromise;
                }

                return axiosInstance(originalConfig);
            } catch (err) {
                isRefreshing = false;
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    },
);


/* -------------------------------------------------------------------------- */
/*                                   API                                       */
/* -------------------------------------------------------------------------- */

export const api = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = await axiosInstance.get<BaseResponse<T>>(url, config);
            if (!res.data.success) {
                throw new ApiError(extractErrorMessage(res.data));
            }
            return res.data.data;
        } catch (error) {
            throw new ApiError(extractErrorMessage(error));
        }
    },

    async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const res = await axiosInstance.post<BaseResponse<T>>(url, data, config);
            if (!res.data.success) {
                throw new ApiError(extractErrorMessage(res.data));
            }
            return res.data.data;
        } catch (error) {
            throw new ApiError(extractErrorMessage(error));
        }
    },

    async put<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const res = await axiosInstance.put<BaseResponse<T>>(url, data, config);
            if (!res.data.success) {
                throw new ApiError(extractErrorMessage(res.data));
            }
            return res.data.data;
        } catch (error) {
            throw new ApiError(extractErrorMessage(error));
        }
    },

    async patch<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const res = await axiosInstance.patch<BaseResponse<T>>(url, data, config);
            if (!res.data.success) {
                throw new ApiError(extractErrorMessage(res.data));
            }
            return res.data.data;
        } catch (error) {
            throw new ApiError(extractErrorMessage(error));
        }
    },

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = await axiosInstance.delete<BaseResponse<T>>(url, config);
            if (!res.data.success) {
                throw new ApiError(extractErrorMessage(res.data));
            }
            return res.data.data;
        } catch (error) {
            throw new ApiError(extractErrorMessage(error));
        }
    },
};