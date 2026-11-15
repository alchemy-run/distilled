// Packages publish src/ and lib/ ("files" in package.json), so a test or
// fixture under src/ ships to npm. Tests belong in packages/<pkg>/test/.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "vitest";

const PACKAGES = join(import.meta.dirname, "..", "..");

const testFiles = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === "fixtures") out.push(path);
      else testFiles(path, out);
    } else if (/\.(test|spec)\.[cm]?[jt]sx?$/.test(name)) {
      out.push(path);
    }
  }
  return out;
};

test("no package keeps tests or fixtures under src/", () => {
  const found = readdirSync(PACKAGES)
    .map((pkg) => join(PACKAGES, pkg, "src"))
    .filter(existsSync)
    .flatMap((src) => testFiles(src))
    .map((p) => relative(PACKAGES, p));
  expect(found).toEqual([]);
});
