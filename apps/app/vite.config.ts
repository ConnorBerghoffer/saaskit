import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const aliasFromPackages = (pkg: string) =>
  fileURLToPath(new URL(`../../packages/${pkg}/src`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@saaskit/config": aliasFromPackages("config"),
      "@saaskit/db": aliasFromPackages("db"),
      "@saaskit/auth": aliasFromPackages("auth"),
      "@saaskit/validator": aliasFromPackages("validator"),
    },
  },
});
