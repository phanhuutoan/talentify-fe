import { create } from "zustand";

interface IAuthState {
  token: string;
  expiredAt: Date | null;
  setToken(token: string, expiredAt: Date): void;
  removeToken(): void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  token: "",
  expiredAt: null,
  setToken: (token, expiredAt) => set({ token, expiredAt }),
  removeToken: () => set({ token: "", expiredAt: null }),
}));
