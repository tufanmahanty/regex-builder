import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "bin/cli.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    entry: "src/index.ts",
  },
  outDir: "dist",
  clean: true,
});
