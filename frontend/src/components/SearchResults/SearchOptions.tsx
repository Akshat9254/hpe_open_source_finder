import { Stack } from "@chakra-ui/react";
import React from "react";
import Platforms from "./Platforms";
import Licenses from "./Licenses";

type SearchOptionsProps = {};

const SearchOptions: React.FC<SearchOptionsProps> = () => {
  return (
    <Stack gap={4}>
      <Licenses />
      <Platforms />
    </Stack>
  );
};
export default SearchOptions;
