import { LegacyRef, useRef } from "react";
import { atom } from "recoil";

interface ISearchState {
  keyword: string;
  ref: undefined | React.RefObject<HTMLInputElement>;
}

const defaultSearchState: ISearchState = {
  keyword: "",
  ref: undefined,
};

const searchAtom = atom<ISearchState>({
  key: "searchAtom",
  default: defaultSearchState,
});

export default searchAtom;
