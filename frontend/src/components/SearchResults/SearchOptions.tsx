import { Stack } from "@chakra-ui/react";
import React from "react";
import Platforms from "./Platforms";

type SearchOptionsProps = {};

const SearchOptions: React.FC<SearchOptionsProps> = () => {
  return (
    <Stack>
      <Platforms />
    </Stack>
  );
};
export default SearchOptions;
