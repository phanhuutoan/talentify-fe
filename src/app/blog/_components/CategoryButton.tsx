"use client";
import { StarLogoIcon } from "@/_images/svgs/Logo";
import { Button } from "@chakra-ui/react/button";

interface CategoryButtonProps {
  onClick?: () => void;
  category: string;
}

export const CategoryButton = ({ category, onClick }: CategoryButtonProps) => {
  return (
    <Button
      colorPalette="white"
      color="white"
      variant="outline"
      size="md"
      onClick={onClick}
      _hover={{ bg: "none" }}
      py={2}
    >
      <StarLogoIcon fill="white" boxSize={5} />
      {category}
    </Button>
  );
};
