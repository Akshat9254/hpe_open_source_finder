import {
  CalendarIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { SearchBox } from "../Home";
import { useRecoilState } from "recoil";
import { authModalAtom, searchAtom } from "../../atoms";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { FiLogOut } from "react-icons/fi";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchState, setSearchState] = useRecoilState(searchAtom);
  const { keyword } = searchState;
  const [authState, setAuthModalState] = useRecoilState(authModalAtom);
  const { user } = authState;

  return (
    <Container maxW={"container.xl"} py={6}>
      <AuthModal />
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

        {user ? (
          <Menu>
            <MenuButton>
              <HStack cursor={"pointer"}>
                <Text>{user.name}</Text>
                <ChevronDownIcon fontSize={"xl"} />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem flexDirection={"column"}>
                <Text>{user.email}</Text>
              </MenuItem>
              <MenuDivider />
              <Link to={`/project/${user.id}`}>
                <MenuItem icon={<CalendarIcon fontSize={"16px"} />}>
                  My Projects
                </MenuItem>
              </Link>
              <MenuItem
                icon={<FiLogOut size={"16px"} />}
                onClick={() =>
                  setAuthModalState((prev) => ({ ...prev, user: null }))
                }
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            variant={"ghost"}
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                open: true,
                view: "login",
              }))
            }
          >
            Sign In
          </Button>
        )}
      </HStack>
    </Container>
  );
};
export default Navbar;
