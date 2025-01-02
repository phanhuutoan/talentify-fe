import {
  SimpleGrid,
  GridItem,
  Text,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import RegisterImg from "@/_images/register.jpg";
import { ROLE_ID } from "@/_models/enum";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/_components/lib/ui/button";
import { MdOutlineWorkOutline } from "react-icons/md";
import { ReactNode } from "react";

interface Props {
  onSelectRole: (role: ROLE_ID) => void;
}

export const SelectRole = (props: Props) => {
  const { onSelectRole } = props;
  const renderButton = (role: ROLE_ID, label: string, icon: ReactNode) => {
    return (
      <Button
        colorPalette="brand"
        onClick={() => onSelectRole(role)}
        fontWeight="600"
        minW={40}
      >
        <Icon boxSize={4} fill="white">
          {icon}
        </Icon>{" "}
        {label}
      </Button>
    );
  };

  return (
    <SimpleGrid id="login-grid" columns={3} gap={0} w="full" bgColor="gray.200">
      <GridItem>
        <Image
          style={{ height: "100vh", objectFit: "cover" }}
          src={RegisterImg}
          alt="logo"
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Flex
          alignItems={"flex-start"}
          h="100vh"
          flexDir="column"
          justify="center"
          ml="6rem"
        >
          <Text fontSize="3xl" mb={4} fontWeight={400}>
            Register as ?
          </Text>
          <HStack gap={8}>
            {renderButton(ROLE_ID.CANDIDATE, "A Job seeker", <FaRegUser />)}
            {renderButton(
              ROLE_ID.EMPLOYER,
              "An Employer",
              <MdOutlineWorkOutline />
            )}
          </HStack>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
