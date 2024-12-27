import { ILoginResponse } from "@/_models/auth";
import { ApiErrorResponse } from "@/_models/common";
import { removeCookie } from "@/app/api/jwt/fetcher";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<ILoginResponse | ApiErrorResponse>(
    `/auth/sign-in`,
    {
      email,
      password,
    }
  );
  return response;
};

const logout = async () => {
  await removeCookie();
  window.location.reload();
};

export const authService = {
  login,
  logout,
};
