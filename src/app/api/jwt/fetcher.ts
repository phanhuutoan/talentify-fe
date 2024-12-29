import axios from "axios";

export const setCookie = async (token: string, expiredAt: string) => {
  return axios.post("/api/jwt", { token, expiredAt });
};

export const removeCookie = async () => {
  return axios.delete("/api/jwt");
};
