#!/usr/bin/env bun
import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(websiteRoot, "dist");
const port = Number(process.env.PORT ?? "4173");
const url = `http://localhost:${port}`;

const build = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn("bun", ["scripts/build.ts"], {
      cwd: websiteRoot,
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`build exited ${code}`));
    });
  });

await build();

const server = Bun.serve({
  port,
  async fetch(request) {
    const path = new URL(request.url).pathname;
    const relative = path === "/" ? "index.html" : path.replace(/^\//, "");
    const file = Bun.file(join(distDir, relative));
    if (await file.exists()) return new Response(file);
    if (!relative.includes(".")) {
      const html = Bun.file(join(distDir, `${relative}.html`));
      if (await html.exists()) return new Response(html);
      const index = Bun.file(join(distDir, relative, "index.html"));
      if (await index.exists()) return new Response(index);
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(url);
console.log(`serving ${distDir} on ${server.url}`);
