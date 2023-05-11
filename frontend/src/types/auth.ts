import { IRepository } from ".";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IProject {
  id: number;
  name: string;
  repositories: IRepository[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  projects: IProject[];
}
