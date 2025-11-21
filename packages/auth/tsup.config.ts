import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/server/index.ts",
    "src/client/index.ts",
    "src/components/index.ts",
    "src/hooks/index.ts",
    "src/providers/index.ts",
  ],
  format: ["cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  tsconfig: "./tsconfig.json",
});

