import {
  defineConfig,
  minimal2023Preset as preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset,
  // generate icon-a and icon-b manually, move into iconsets folders.
  images: ["public/pwa-app.png"],
});
