import { defineConfig } from "vite";

// runs/*.json are pulled in with import.meta.glob, so adding, editing or
// deleting a run file hot-reloads the page.
export default defineConfig({
  server: { host: "127.0.0.1" },
});
