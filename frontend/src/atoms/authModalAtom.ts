import { atom } from "recoil";
import { IUser } from "../types/auth";

export interface AuthState {
  open: boolean;
  view: "login" | "register" | "resetPassword";
  user: IUser | null;
}

const defaultModalState: AuthState = {
  open: false,
  view: "login",
  user: null,
};

const authModalState = atom<AuthState>({
  key: "authModalState",
  default: defaultModalState,
});

export default authModalState;
