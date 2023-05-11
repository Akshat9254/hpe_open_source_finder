import api from ".";
import { ILoginUser, IRegisterUser } from "../types/auth";

export const registerUser = async (user: IRegisterUser) => {
  return api.post("/user/register", { ...user });
};

export const loginUser = async (user: ILoginUser) => {
  return api.post("/user/login", { ...user });
};
