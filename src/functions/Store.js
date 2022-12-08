import create from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist((set) => ({
    user: null,
    loginUser: (userObj) => set((state) => ({ user: userObj })),
    logoutUser: () => set((state) => ({ user: null })),
    reset: () => {useUser.persist.clearStorage();
      set({user:null})
    }
  }),
  )
);

export default useUser;
