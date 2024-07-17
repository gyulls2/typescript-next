import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set(() => ({ user: data })),
    }),
    { name: "loginUser", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useUserStore;
