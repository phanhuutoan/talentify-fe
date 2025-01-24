import { ILoginResponse, ISignupPayload } from "@/_models/auth";
import { ApiErrorResponse } from "@/_models/common";
import { removeCookie, setCookie } from "@/app/api/jwt/fetcher";
import { mainApiInstance } from "./_axiosInstance";

const login = async (email: string, password: string) => {
  try {
    const response = await mainApiInstance.post<
      ILoginResponse | ApiErrorResponse
    >(`/auth/sign-in`, {
      email,
      password,
    });
    const data = response.data as ILoginResponse;
    await setCookie(data.token, data.expiredAt);
    return data;
  } catch (error) {
    throw error as ApiErrorResponse;
  }
};

const forgotPassword = async (email: string) => {
  const response = await mainApiInstance.post<ApiErrorResponse>(
    `/auth/forgot-password?email=${email}`,
  );
  return response;
};

export interface ResetPayload {
  email: string;
  password: string;
  code: string;
}
const resetPassword = async (payload: ResetPayload) => {
  const { email, password, code } = payload;
  const response = await mainApiInstance.post<ApiErrorResponse>(
    `/auth/reset-password`,
    {
      email,
      password,
      code,
    },
  );
  return response;
};

const logout = async () => {
  await removeCookie();
  window.location.reload();
};

const signup = async (payload: ISignupPayload) => {
  const response = await mainApiInstance.post<
    ISignupPayload | ApiErrorResponse
  >(`/auth/sign-up`, payload);
  return response;
};

const verifyOTP = async (email: string, otp: string) => {
  const response = await mainApiInstance.post<ApiErrorResponse>(
    `/auth/verify`,
    {
      email,
      code: otp,
    },
  );
  return response;
};

const resendOTP = async (email: string) => {
  const response = await mainApiInstance.post<ApiErrorResponse>(
    `/auth/resend-code?email=${email}`,
  );
  return response;
};

export const authService = {
  login,
  logout,
  signup,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
};
