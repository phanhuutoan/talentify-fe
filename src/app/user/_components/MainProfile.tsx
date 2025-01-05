"use client";
import { Button } from "@/_components/lib/ui/button";
import { authService } from "@/_services/auth";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

export const MainProfile = () => {
  const onClick = async () => {
    console.log("CLICK");
    await authService.logout();
  };

  return (
    <Box
      bg="rgb(255, 255, 255, 0.1)"
      width="100vh"
      height="50vh"
      m="20px"
      rounded="lg"
      border={"2px"}
      shadow={"lg"}
      borderColor="brand.100"
      overflow="hidden"
    >
      <Flex
        align="center"
        justifyContent="space-between" // Correct camelCase
        width="full"
        lineHeight="24px"
        px="16px" // Shortened paddingX
        py="8px" // Shortened paddingY
        bg="rgb(0, 0, 0, 1)"
      >
        <Text fontSize="2xl" fontWeight="bold" color="#ffffff">
          Bro, Welcome Back!
        </Text>
        <Button onClick={onClick} rounded="36px" bg="rgb(255, 87, 34, 1)">
          Logout
        </Button>
      </Flex>
      <Flex padding="20px" align="center" justify="center" height="80%">
        <Image
          objectFit="cover"
          width="300px"
          alt="Empty box"
          src="https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2Fempty-box.pngaf556a34-d5a8-42f3-8e83-870ed94989a6?alt=media&token=ec5db543-9666-4d0d-9e60-d74b8263c31c"
        />
      </Flex>
    </Box>
  );
};
