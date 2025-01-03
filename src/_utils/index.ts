import { ApiErrorResponse } from "@/_models/common";
import { AxiosError } from "axios";

const errorList = {
  ERROR001: "Invalid email or password",
  ERROR002: "Account already exists",
  ERROR003: "Email already exists",
  ERROR004: "Password and confirm password do not match",
  ERROR005: "Invalid verification code",
  ERROR006: "Incorrect password",
  ERROR007: "Account with email does not exist",
  ERROR008: "User not verified/not active yet",
  ERROR009: "User cannot resend code now! retry after 2 minutes",
  ERROR500: "Undefined error",
  ERROR106: "User already verified",
};

export const getMessageFromError = (error: unknown) => {
  const code = (error as AxiosError<ApiErrorResponse>).response?.data.code;

  return code
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (errorList as any)[code]
    : (error as AxiosError<ApiErrorResponse>).message;
};

export const setStorageData = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getStorageData = <T>(key: string) => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};

export const removeStorageData = (key: string) => {
  localStorage.removeItem(key);
};
