import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
  plugins: [
    cjsInterop({
      dependencies: ["@apollo/client"],
      client: true,
    }),
  ],
});
