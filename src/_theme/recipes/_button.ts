import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      primary: {
        borderRadius: "50px",
        boxShadow: "lg",
      },
    },
    size: {
      sm: { padding: "4", fontSize: "12px" },
      lg: { padding: "8", fontSize: "24px" },
    },
  },
});
