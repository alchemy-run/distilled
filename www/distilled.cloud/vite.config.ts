import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

function readPackageVersions(): Record<string, string> {
  const packagesDir = resolve(__dirname, "../../packages");
  const versions: Record<string, string> = {};

  for (const entry of readdirSync(packagesDir)) {
    if (entry === "core") continue;
    const pkgJsonPath = resolve(packagesDir, entry, "package.json");
    try {
      if (statSync(pkgJsonPath).isFile()) {
        const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
        versions[entry] = pkg.version;
      }
    } catch {
      // skip directories without package.json
    }
  }

  return versions;
}

function sdkVersionsPlugin(): Plugin {
  return {
    name: "sdk-versions",
    transformIndexHtml(html) {
      const versions = readPackageVersions();
      return html.replace(
        /data-package="([^"]+)"><\/span>/g,
        (_, pkg) => {
          const version = versions[pkg];
          return `data-package="${pkg}">${version ? `v${version}` : ""}</span>`;
        },
      );
    },
  };
}

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 4321,
  },
  plugins: [sdkVersionsPlugin()],
});
