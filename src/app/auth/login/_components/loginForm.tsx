"use client";
import { InputField } from "@/_components/ui/form/InputField";
import { ILoginPayload } from "@/_models/auth";
import {
  Box,
  Center,
  Text,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import LoginImage from "@/_images/login-1.jpg";
import useSWRMutation from "swr/mutation";
import { authService } from "@/_services/auth";
import { Button } from "@/_components/lib/ui/button";
import { useRouter } from "next/navigation";
import { toaster } from "@/_components/lib/ui/toaster";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/_models/common";
import { getMessageFromError } from "@/_utils";
import { Alert } from "@/_components/lib/ui/alert";
import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";

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
      await trigger({ ...payload });
      toaster.success({
        title: "Login successfully! navigating...",
      });
      setTimeout(() => {
        router.push("/user");
      }, 1000);
    } catch (error) {
      setErrorMsg(getMessageFromError(error as AxiosError<ApiErrorResponse>));
    }
  };
  return (
    <SimpleGrid
      id="login-grid"
      columns={3}
      gap={0}
      w="full"
      bgColor="gray.200"
      px={{ base: ".5rem", md: 0 }}
    >
      <GridItem hideBelow="md">
        <Image
          style={{ height: "100vh", objectFit: "cover" }}
          src={LoginImage}
          alt="logo"
        />
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <Center alignItems={"center"} h="100vh">
          <Box
            border="1px solid"
            borderColor={"gray.200"}
            p={8}
            borderRadius={8}
            bgColor="white"
            boxShadow="md"
            w={{ base: "full", sm: "27rem" }}
          >
            <Text
              as="h1"
              textStyle={{ base: "2xl", md: "3xl", lg: "5xl" }}
              fontWeight={700}
              mb={2}
              fontFamily="heading"
            >
              Login
            </Text>
            {errorMsg ? (
              <></>
            ) : (
              <Text as="h4" textStyle="md" mb={8} color="gray.400">
                Enter your email below to login to your account
              </Text>
            )}
            {errorMsg && (
              <Alert
                colorPalette="red"
                title="Login errors!"
                mb={4}
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
                  label="Password"
                  type="password"
                  placeholder="*******"
                />
                <Link href="#">
                  <Text
                    textStyle="sm"
                    color="brand.100"
                    mt={2}
                    display="inline-block"
                  >
                    Forgot your password?
                  </Text>
                </Link>

                <Button
                  loading={isMutating}
                  w="full"
                  mt="2rem"
                  type="submit"
                  colorPalette="brand"
                >
                  Login
                </Button>
                <Button w="full" mt={3} variant="outline" boxShadow="xs">
                  Login with Google
                </Button>
                <Flex>
                  <Text textStyle="sm" color="gray.400" mt={4}>
                    Don&apos;t have an account?
                  </Text>
                  <Link href="/auth/register">
                    <Text textStyle="sm" color="brand.100" mt={4} ml={1}>
                      Register
                    </Text>
                  </Link>
                </Flex>
              </form>
            </FormProvider>
          </Box>
        </Center>
      </GridItem>
    </SimpleGrid>
  );
};

export default LoginForm;
