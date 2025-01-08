import {
  Text,
  Center,
  Flex,
  SimpleGrid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import img from "@/_images/svgs/SuccessSignup.svg";
import Image from "next/image";
import { Button } from "@/_components/lib/ui/button";
import { LuUserRoundPen } from "react-icons/lu";
import useSWRMutation from "swr/mutation";
import { ILoginPayload } from "@/_models/auth";
import { authService } from "@/_services/auth";
import { toaster } from "@/_components/lib/ui/toaster";
import { useRouter } from "next/navigation";
import { LuChevronRight } from "react-icons/lu";

interface Props {
  email: string | null;
  password: string | null;
  onFinish: () => void;
}
export const SuccessfulScreen = (props: Props) => {
  const { isMutating, trigger: signinTrigger } = useSWRMutation(
    "auth/sign-in",
    (_1, { arg }: { arg: ILoginPayload }) =>
      authService.login(arg.email, arg.password)
  );
  const router = useRouter();

  const loginUser = async (payload: ILoginPayload, route: string) => {
    try {
      await signinTrigger({ ...payload });
      toaster.success({
        title: "Navigating..., please wait",
      });
      setTimeout(() => {
        router.push(route);
      }, 1000);
    } catch {
      toaster.error({
        title: "Some error occurred!",
        description: "Cannot auto navigate to correct page",
      });
    }
  };

  const onPrepareProfile = async () => {
    await loginUser(
      {
        email: props.email || "",
        password: atob(props.password || ""),
      },
      "/user"
    );
    props.onFinish();
  };

  const onStartNow = async () => {
    await loginUser(
      {
        email: props.email || "",
        password: atob(props.password || ""),
      },
      "/"
    );
    props.onFinish();
  };

  return (
    <Center w="100vw" h="100vh" bg="gray.100">
      <Flex flexDir="column" alignItems="center">
        <Image src={img} alt="success" width={600} />
        <Text fontFamily="heading" textStyle="4xl" my="6" color="green.600">
          Your account has been created!
        </Text>
        <SimpleGrid columns={2} justifyItems="center">
          <GridItem w="13.5rem">
            <Button
              colorPalette="brand"
              onClick={onPrepareProfile}
              loading={isMutating}
            >
              Prepare your profile!{" "}
              <Icon stroke="white" boxSize={5} ml={1}>
                <LuUserRoundPen />
              </Icon>
            </Button>
            <Text textStyle="xs" color="gray.500" mt="1">
              Get ready for lots of opportunities!
            </Text>
          </GridItem>
          <GridItem>
            <Button
              variant="outline"
              colorPalette="brand"
              bgColor="white"
              _hover={{ bgColor: "orange.100" }}
              onClick={onStartNow}
              loading={isMutating}
            >
              Start now{" "}
              <Icon stroke="brand.100" boxSize={5}>
                <LuChevronRight />
              </Icon>
            </Button>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Center>
  );
};
