import { atom } from "recoil";
import { IPlatform } from "../types";

interface IPlatformState {
  allPlatforms: IPlatform[];
  selectedPlatforms: Set<IPlatform>;
  loading: boolean;
}

const defaultPlatformState: IPlatformState = {
  allPlatforms: [],
  selectedPlatforms: new Set([]),
  loading: false,
};

const platformAtom = atom<IPlatformState>({
  key: "platformAtom",
  default: defaultPlatformState,
});

export default platformAtom;
