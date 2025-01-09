/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "@/_components/lib/ui/alert";
import { Button } from "@/_components/lib/ui/button";
import { Checkbox } from "@/_components/lib/ui/checkbox";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { PiArrowBendUpRightBold } from "react-icons/pi";

interface Props<F extends FieldValues> extends PropsWithChildren {
  formName: string;
  form: UseFormReturn<F, any, undefined>;
  signUpErr: string | null;
  isMutating?: boolean;
  onSubmit: (data: F) => void;
  setSignupErr: (err: string | null) => void;
  onBackClick?: () => void;
  isAn?: boolean;
}

export const FormLayout = <F extends FieldValues>(props: Props<F>) => {
  const {
    formName,
    form,
    signUpErr,
    isMutating,
    setSignupErr,
    onSubmit,
    onBackClick,
    children,
    isAn = false,
  } = props;
  const [enableButton, setEnableButton] = useState(false);

  return (
    <Flex
      bgColor="gray.200"
      flexDir="column"
      p={8}
      minH="100vh"
      pl="10rem"
      py="4rem"
      color="gray.900"
    >
      <Text
        as="h1"
        textStyle="4xl"
        mb={4}
        color="brand.100"
        fontFamily="heading"
      >
        Register as {isAn ? "an" : "a"}{" "}
        <Text display="inline-block" bgColor="brand.100" color="white" px={2}>
          {formName}
        </Text>
      </Text>
      <Flex
        as="form"
        bgColor="white"
        p={8}
        borderRadius={8}
        boxShadow="md"
        w="80%"
        minW="57rem"
        flexDir="column"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {signUpErr && (
          <Alert
            colorPalette="red"
            title="Signup errors!"
            mb={4}
            onClose={() => setSignupErr(null)}
          >
            {signUpErr}
          </Alert>
        )}
        {/* Form part */}
        {children}

        {/* Additional links */}
        <Flex justifyContent="space-between" mt="1rem">
          <Flex>
            <Text textStyle="sm" color="gray.600" mt={4}>
              Already have account?
            </Text>
            <Link href="/auth/login">
              <Text textStyle="sm" color="brand.100" mt={4} ml={1}>
                Sign-in
              </Text>
            </Link>
          </Flex>
          <Box>
            <Checkbox
              colorPalette="brand"
              display="flex"
              alignItems="flex-start"
              variant="subtle"
              size="sm"
              strokeColor="white"
              onChange={(event) =>
                setEnableButton((event.target as HTMLInputElement).checked)
              }
            >
              <Text color="gray.700">Accepts terms and conditions</Text>
              <Link href="#">
                <Text as="span" textStyle="sm" color="gray.400" mt={4}>
                  You agree to our Terms of Service and Privacy Policy.
                </Text>
              </Link>
            </Checkbox>
          </Box>
        </Flex>

        {/* Button group */}
        <Flex mt={8} justifyContent="flex-end">
          <Button variant="outline" colorPalette="gray" onClick={onBackClick}>
            <Icon boxSize={4} ml={1} color="brand.100">
              <MdArrowBackIos />
            </Icon>
            Go back
          </Button>
          <Button
            type="submit"
            colorPalette="brand"
            disabled={!enableButton}
            ml={4}
            loading={isMutating}
          >
            Complete register
            <Icon boxSize={4} fill="white" ml={1}>
              <PiArrowBendUpRightBold />
            </Icon>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
