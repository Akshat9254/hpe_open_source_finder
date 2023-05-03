import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  HStack,
  Heading,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { SearchBox } from "../Home";
import { useRecoilState } from "recoil";
import { searchAtom } from "../../atoms";
import { Link } from "react-router-dom";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchState, setSearchState] = useRecoilState(searchAtom);
  const { keyword } = searchState;

  return (
    <Container maxW={"container.xl"} py={6}>
      <HStack justifyContent={"space-evenly"}>
        <Heading flex={1}>
          <Link to={"/"}>Open Source Finder</Link>
        </Heading>
        <Box flex={1}>
          <SearchBox
            size={"md"}
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchState((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />
        </Box>

        <IconButton
          aria-label={"change-color-theme"}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant={"ghost"}
          onClick={toggleColorMode}
        />
      </HStack>
    </Container>
  );
};
export default Navbar;
