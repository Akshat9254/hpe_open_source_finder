import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import { authModalAtom } from "../../atoms";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalAtom);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const initialRef = React.useRef(null);
  return (
    <Modal
      isOpen={modalState.open}
      onClose={handleClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf={"center"}>
          {modalState.view === "login" && "Login"}
          {modalState.view === "register" && "Register"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AuthInputs />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
