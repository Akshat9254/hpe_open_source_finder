import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalAtom } from "../../atoms";
import { ILoginUser } from "../../types/auth";
import { loginUser } from "../../http/auth";

type LoginModalProps = {};

interface FormValues {
  email: string;
  password: string;
}

interface FieldProps {
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  form: {
    errors: {
      [key: string]: string;
    };
    touched: {
      [key: string]: boolean;
    };
  };
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const LoginModal: React.FC<LoginModalProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const toast = useToast();
  const registerSuccessToastId = "register-success-toast";
  const registerFailureToastId = "register-failure-toast";
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const user: ILoginUser = {
      ...values,
    };
    try {
      const { data } = await loginUser(user);
      if (!toast.isActive(registerSuccessToastId)) {
        toast({
          id: registerSuccessToastId,
          title: "User LoggedIn Successfully!!!",
          position: "top-right",
          isClosable: true,
          status: "success",
          duration: 1000,
        });
      }

      if (typeof data === "string") throw new Error();

      setAuthModalState((prev) => ({ ...prev, open: false, user: data }));
    } catch (error) {
      // const { response } = error;
      // const message =
      //   response?.status === 400 ? response?.data : "Something went wrong!!!";
      if (!toast.isActive(registerFailureToastId)) {
        toast({
          id: registerFailureToastId,
          title: "Something went wrong!!!",
          position: "top-right",
          isClosable: true,
          status: "error",
          duration: 1000,
        });
      }

      actions.setSubmitting(false);
    }
  };
  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form style={{ width: "100%" }}>
          <VStack gap={4}>
            <Field name="email">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={Boolean(form.errors.email && form.touched.email)}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="Enter your email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={Boolean(
                    form.errors.password && form.touched.password
                  )}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex direction={"column"} gap={2}>
              <Button mt={4} isLoading={isSubmitting} type="submit">
                Log In
              </Button>
              <Flex alignItems={"center"} justifyContent={"center"} gap={1}>
                <Text fontSize={"sm"}>New Here? </Text>
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={() =>
                    setAuthModalState((prev) => ({
                      ...prev,
                      view: "register",
                    }))
                  }
                >
                  Register
                </Button>
              </Flex>
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
export default LoginModal;
