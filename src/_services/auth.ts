import { ILoginResponse, ISignupPayload } from "@/_models/auth";
import { ApiErrorResponse } from "@/_models/common";
import { removeCookie, setCookie } from "@/app/api/jwt/fetcher";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<
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

const logout = async () => {
  await removeCookie();
  window.location.reload();
};

const signup = async (payload: ISignupPayload) => {
  const response = await axiosInstance.post<ISignupPayload | ApiErrorResponse>(
    `/auth/sign-up`,
    payload
  );
  return response;
};

const verifyOTP = async (email: string, otp: string) => {
  const response = await axiosInstance.post<ApiErrorResponse>(`/auth/verify`, {
    email,
    code: otp,
  });
  return response;
};

const resendOTP = async (email: string) => {
  const response = await axiosInstance.post<ApiErrorResponse>(
    `/auth/resend-code?email=${email}`
  );
  return response;
};

export const authService = {
  login,
  logout,
  signup,
  verifyOTP,
  resendOTP,
};
