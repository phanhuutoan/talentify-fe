import { Button } from "@/_components/lib/ui/button";
import { PropsWithChildren } from "react";
import GoogleLogo from "@/_images/google-logo.png";
import Image from "next/image";

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

export const GoogleButton = (props: Props) => {
  return (
    <Button
      variant="outline"
      size="lg"
      w="18rem"
      onClick={props.onClick}
      fontSize={16}
      colorPalette="brand"
      bgColor="white"
      _hover={{ bgColor: "orange.100" }}
    >
      <Image src={GoogleLogo} alt="google" height={35} width={35} />
      {props.children}
    </Button>
  );
};
