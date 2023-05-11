import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { repositoryAtom, searchAtom } from "../../atoms";

type SearchBoxProps = {
  size: "sm" | "md" | "lg";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ size, value, onChange }) => {
  const { loading } = useRecoilValue(repositoryAtom);
  const setSearchState = useSetRecoilState(searchAtom);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, [ref.current]);
  return (
    <InputGroup>
      <Input
        placeholder="Search for Repositories..."
        variant={"filled"}
        size={size}
        focusBorderColor={"gray.700"}
        value={value}
        onChange={onChange}
        disabled={loading}
        ref={ref}
      />
      <InputRightElement children={<Search2Icon />} />
    </InputGroup>
  );
};
export default SearchBox;
