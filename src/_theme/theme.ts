import {
  createSystem,
  defineConfig,
  defaultConfig,
  mergeConfigs,
} from "@chakra-ui/react";
import { buttonRecipe } from "./_button";

const config1 = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          "100": { value: "#f7fafc" },
          "200": { value: "#FFFF3C" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});

const config = mergeConfigs(defaultConfig, config1);
const system = createSystem(config);
export default system;
