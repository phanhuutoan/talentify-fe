"use client";
import { InputField } from "@/_components/ui/form/InputField";
import { ILoginPayload } from "@/_models/auth";
import {
  Box,
  Center,
  Flex,
  Text,
  Field as ChakraField,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const loginValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const form = useForm({ resolver: yupResolver(loginValidation) });
  const loginUser = async (data: ILoginPayload) => {
    console.log("LOGIN", data);
  };
  return (
    <Center w="full" h="full" mt="5%">
      <Box border="1px solid" borderColor={"gray.200"} p={8} borderRadius={8}>
        <Text as="h1" textStyle="3xl" fontWeight={700} mb={2}>
          Login
        </Text>
        <Text as="h4" textStyle="md" mb={8} color="gray.400">
          Enter your email below to login to your account
        </Text>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(loginUser)}>
            <InputField
              name="email"
              label="Email"
              placeholder="example@email.com"
              fieldStyles={{ mb: 6 }}
            />

            <InputField
              name="password"
              labelBuilder={() => (
                <Flex h="1.2rem">
                  <ChakraField.Label mr="8rem">Password</ChakraField.Label>
                  <Link href="#">Forgot your password?</Link>
                </Flex>
              )}
              type="password"
              placeholder="*******"
            />

            <Button w="full" mt="2rem" type="submit">
              Login
            </Button>
            <Button w="full" mt={3} variant="outline">
              Login with Google
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Center>
  );
};

export default LoginForm;
