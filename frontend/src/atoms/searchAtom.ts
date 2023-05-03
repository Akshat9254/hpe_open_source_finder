import { atom } from "recoil";

interface ISearchState {
  keyword: string;
}

const defaultSearchState: ISearchState = {
  keyword: "",
};

const searchAtom = atom<ISearchState>({
  key: "searchAtom",
  default: defaultSearchState,
});

export default searchAtom;
