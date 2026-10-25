import { defineConfig } from "vite";

// runs/*.json are pulled in with import.meta.glob, so adding, editing or
// deleting a run file hot-reloads the page. repo-size.html reads
// repo-size/lab.json, written by benches/repo-size/lab.ts.
export default defineConfig({
  server: { host: "127.0.0.1" },
  build: {
    rollupOptions: {
      input: { main: "index.html", "repo-size": "repo-size.html" },
    },
  },
});
