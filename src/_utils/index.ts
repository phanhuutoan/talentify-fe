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
  ERROR500: "Undefined error",
  ERROR106: "User already verified",
};

export const getMessageFromError = (error: AxiosError<ApiErrorResponse>) => {
  const code = error.response?.data.code;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return code ? (errorList as any)[code] : error.message;
};

export const storageStore = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getStorageData = <T>(key: string) => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};
