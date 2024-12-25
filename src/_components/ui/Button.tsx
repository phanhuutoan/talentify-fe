import { buttonRecipe } from "@/_theme/recipes/_button";
import { useRecipe, type RecipeVariantProps } from "@chakra-ui/react";
import { Button as DefaultButton } from "@chakra-ui/react";
import React from "react";
type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;

export interface ButtonProps
  extends React.PropsWithChildren<ButtonVariantProps> {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { visual, size, ...restProps } = props;

  const recipe = useRecipe({ recipe: buttonRecipe });
  const styles = recipe({ visual, size });

  return <DefaultButton colorScheme="blue" css={styles} {...restProps} />;
};
