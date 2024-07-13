import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginAtom = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
    user: {},
  },
  effects_UNSTABLE: [persistAtom],
});
