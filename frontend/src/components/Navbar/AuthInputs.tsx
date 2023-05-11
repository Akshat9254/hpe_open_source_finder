import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { authModalAtom } from "../../atoms";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalAtom);
  return (
    <Flex direction={"column"} align={"center"} width={"full"} mt={4}>
      {modalState.view === "register" && <RegisterModal />}
      {modalState.view === "login" && <LoginModal />}
    </Flex>
  );
};
export default AuthInputs;
