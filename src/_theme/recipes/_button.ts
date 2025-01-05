import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    fontFamily: "heading",
  },
  variants: {
    visual: {
      primary: {
        borderRadius: "50px",
      },
    },
    size: {
      sm: { padding: "4", fontSize: "12px" },
      md: { padding: "6", fontSize: "16px" },
      lg: { padding: "8", fontSize: "24px" },
    },
  },
  defaultVariants: {
    visual: "primary",
  },
});
