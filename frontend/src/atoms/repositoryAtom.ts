import { atom } from "recoil";
import { IRepository } from "../types";

interface IRepositoryState {
  allRepositories: IRepository[];
  loading: boolean;
}

const defaultRepositoryState: IRepositoryState = {
  allRepositories: [],
  loading: false,
};

const repositoryAtom = atom<IRepositoryState>({
  key: "repositoryAtom",
  default: defaultRepositoryState,
});

export default repositoryAtom;
