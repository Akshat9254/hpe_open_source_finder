import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
  Flex,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { authModalAtom } from "../../atoms";
import { IRegisterUser } from "../../types/auth";
import { registerUser } from "../../http/auth";

// import { registerUserByEmailAndPassword } from "@/http";

interface FormValues {
  name: string;
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
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const toast = useToast();
  const registerSuccessToastId = "register-success-toast";
  const registerFailureToastId = "register-failure-toast";

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const user: IRegisterUser = {
      ...values,
    };
    try {
      await registerUser(user);
      if (!toast.isActive(registerSuccessToastId)) {
        toast({
          id: registerSuccessToastId,
          title: "User Registered Successfully!!!",
          position: "top-right",
          isClosable: true,
          status: "success",
          duration: 1000,
        });
      }

      setAuthModalState((prev) => ({ ...prev, open: false }));
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
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={Boolean(form.errors.name && form.touched.name)}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} id="name" placeholder="Enter your name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

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
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                variant={"solid"}
              >
                Register
              </Button>
              <Flex alignItems={"center"} justifyContent={"center"} gap={1}>
                <Text fontSize={"sm"}>Already Registered? </Text>
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={() =>
                    setAuthModalState((prev) => ({ ...prev, view: "login" }))
                  }
                >
                  Log In
                </Button>
              </Flex>
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
