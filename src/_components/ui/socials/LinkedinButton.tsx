import { Button } from "@/_components/lib/ui/button";
import { PropsWithChildren } from "react";
import LinkedinLogo from "@/_images/linkedin-logo.png";
import Image from "next/image";

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

export const LinkedinButton = (props: Props) => {
  return (
    <Button
      size="lg"
      w="full"
      onClick={props.onClick}
      fontSize={16}
      colorPalette="brand"
    >
      <Image src={LinkedinLogo} alt="google" height={35} width={35} />
      {props.children}
    </Button>
  );
};
