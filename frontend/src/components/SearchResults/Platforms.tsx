import React, { useEffect } from "react";
import { getPlatforms } from "../../http";
import { useRecoilState } from "recoil";
import { platformAtom } from "../../atoms";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Heading,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { IPlatform } from "../../types";

type PlatformsProps = {};

const Platforms: React.FC<PlatformsProps> = () => {
  const [platformState, setPlatformState] = useRecoilState(platformAtom);
  const { allPlatforms, selectedPlatforms } = platformState;
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const { data } = await getPlatforms();
        setPlatformState((prev) => ({ ...prev, allPlatforms: data }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlatforms();
  }, [setPlatformState]);

  const addPlatform = (platform: IPlatform) => {
    if (selectedPlatforms.has(platform)) {
      selectedPlatforms.delete(platform);
    } else {
      selectedPlatforms.add(platform);
    }

    setPlatformState((prev) => ({
      ...prev,
      selectedPlatforms: new Set(Array.from(selectedPlatforms)),
    }));
  };

  return (
    <Card variant={"outline"} size={"sm"}>
      <CardHeader bgColor={colorMode === "dark" ? "gray.700" : "gray.300"}>
        <Heading size="md">Platforms</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack>
          {allPlatforms.map((platform, index) => (
            <Checkbox
              key={index}
              onChange={() => addPlatform(platform)}
              isChecked={selectedPlatforms.has(platform)}
            >
              {platform.name}
            </Checkbox>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
export default Platforms;
