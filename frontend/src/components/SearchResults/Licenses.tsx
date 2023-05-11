import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getAllLicenses } from "../../http";
import { useRecoilState } from "recoil";
import { licenseAtom } from "../../atoms";
import { ILicense } from "../../types";

type LicensesProps = {};

const Licenses: React.FC<LicensesProps> = () => {
  const [licenseState, setLicenseState] = useRecoilState(licenseAtom);
  const { allLicenses, selectedLicenses, loading } = licenseState;
  const fetchAllLicenses = async () => {
    try {
      setLicenseState((prev) => ({ ...prev, loading: true }));
      const { data } = await getAllLicenses();
      setLicenseState((prev) => ({ ...prev, allLicenses: data }));
    } catch (error) {
      console.log(error);
    } finally {
      setLicenseState((prev) => ({ ...prev, loading: false }));
    }
  };
  useEffect(() => {
    fetchAllLicenses();
  }, []);

  const toggleLicense = (license: ILicense) => {
    const isSelected = Boolean(
      selectedLicenses.find((sl) => sl.id === license.id)
    );

    if (isSelected) {
      const newSelectedLicenses = selectedLicenses.filter(
        (sl) => sl.id !== license.id
      );
      setLicenseState((prev) => ({
        ...prev,
        selectedLicenses: newSelectedLicenses,
      }));
    } else {
      setLicenseState((prev) => ({
        ...prev,
        selectedLicenses: [...prev.selectedLicenses, license],
      }));
    }
  };

  if (loading || allLicenses.length === 0) return <Text>Loading...</Text>;

  return (
    <Card variant={"outline"} size={"sm"}>
      <CardHeader bgColor={"gray.700"}>
        <Heading size="md">Licenses</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack>
          {allLicenses.map((license) => (
            <Checkbox
              key={license.id}
              onChange={() => toggleLicense(license)}
              isChecked={Boolean(
                selectedLicenses.find((sl) => sl.id === license.id)
              )}
            >
              {license.name}
            </Checkbox>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
export default Licenses;
