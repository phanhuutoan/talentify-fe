import {
  createSystem,
  defineConfig,
  defaultConfig,
  mergeConfigs,
} from "@chakra-ui/react";
import { buttonRecipe } from "./recipes/_button";
import { inputRecipe } from "./recipes/_input";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {},
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          focusRing: { value: "{colors.blue.400}" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },
  },
  globalCss: {
    a: {
      "&:hover": {
        borderBottom: "1px solid #333",
      },
    },
  },
  cssVarsPrefix: "tlf", // Talentify prefix
});

const config = mergeConfigs(defaultConfig, customConfig);
const system = createSystem(config);
export default system;
