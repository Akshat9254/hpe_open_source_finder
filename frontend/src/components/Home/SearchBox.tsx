import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

type SearchBoxProps = {
  size: "sm" | "md" | "lg";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ size, value, onChange }) => {
  return (
    <InputGroup>
      <Input
        placeholder="Search for Repositories..."
        variant={"filled"}
        size={size}
        focusBorderColor={"gray.700"}
        value={value}
        onChange={onChange}
      />
      <InputRightElement children={<Search2Icon />} />
    </InputGroup>
  );
};
export default SearchBox;
