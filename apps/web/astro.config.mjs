import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const aliasFromPackages = (pkg) =>
  fileURLToPath(new URL(`../../packages/${pkg}/src`, import.meta.url));

export default defineConfig({
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@saaskit/config": aliasFromPackages("config"),
        "@saaskit/db": aliasFromPackages("db"),
        "@saaskit/auth": aliasFromPackages("auth"),
        "@saaskit/validator": aliasFromPackages("validator"),
      },
    },
  },
});
