import { atom } from "recoil";
import { ILicense } from "../types";

interface ILicenseState {
  allLicenses: ILicense[];
  selectedLicenses: ILicense[];
  loading: boolean;
}

const defaultPlatformState: ILicenseState = {
  allLicenses: [],
  selectedLicenses: [],
  loading: false,
};

const licenseAtom = atom<ILicenseState>({
  key: "licenseAtom",
  default: defaultPlatformState,
});

export default licenseAtom;
