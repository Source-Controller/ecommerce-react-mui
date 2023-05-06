import { create } from "zustand";

const useAuthStore = create((set) => ({
  authUser: null,
  accessToken: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useAuthStore;
