"use client";
import { InputField } from "@/_components/ui/form/InputField";
import { ILoginPayload, ILoginResponse } from "@/_models/auth";
import {
  Box,
  Center,
  Flex,
  Text,
  Field as ChakraField,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import LoginImage from "@/_images/login-1.jpg";
import useSWRMutation from "swr/mutation";
import { authService } from "@/_services/auth";
import { Button } from "@/_components/lib/ui/button";
import { setCookie } from "@/app/api/jwt/fetcher";
import { useRouter } from "next/navigation";
import { toaster } from "@/_components/lib/ui/toaster";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/_models/common";
import { getMessageFromError } from "@/_utils";
import { Alert } from "@/_components/lib/ui/alert";
import { useState } from "react";
import { Metadata } from "next";

const loginValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const metadata: Metadata = {
  title: "Talentify login",
};

const LoginForm = () => {
  const form = useForm({ resolver: yupResolver(loginValidation) });
  const { isMutating, trigger } = useSWRMutation(
    "auth/sign-in",
    (_1, { arg }: { arg: ILoginPayload }) =>
      authService.login(arg.email, arg.password)
  );
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const loginUser = async (payload: ILoginPayload) => {
    try {
      const responseData = await trigger({ ...payload });
      const { token, expiredAt } = responseData.data as ILoginResponse;
      await setCookie(token, expiredAt);
      toaster.success({
        title: "Login successfully! navigating...",
      });
      router.push("/user");
    } catch (error) {
      setErrorMsg(getMessageFromError(error as AxiosError<ApiErrorResponse>));
    }
  };
  return (
    <SimpleGrid id="login-grid" columns={3} gap={0} w="full">
      <GridItem>
        <Image
          style={{ height: "100vh", objectFit: "cover" }}
          src={LoginImage}
          alt="logo"
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Center alignItems={"center"} h="100vh">
          <Box
            border="1px solid"
            borderColor={"gray.200"}
            p={8}
            borderRadius={8}
          >
            <Text as="h1" textStyle="3xl" fontWeight={700} mb={2}>
              Login
            </Text>
            <Text as="h4" textStyle="md" mb={8} color="gray.400">
              Enter your email below to login to your account
            </Text>
            {errorMsg && (
              <Alert
                status="error"
                title="Login errors!"
                mb={4}
                closable
                onClose={() => setErrorMsg("")}
              >
                {errorMsg}
              </Alert>
            )}

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

                <Button
                  loading={isMutating}
                  w="full"
                  mt="2rem"
                  type="submit"
                  colorPalette="brand"
                >
                  Login
                </Button>
                <Button w="full" mt={3} variant="outline">
                  Login with Google
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Center>
      </GridItem>
    </SimpleGrid>
  );
};

export default LoginForm;
