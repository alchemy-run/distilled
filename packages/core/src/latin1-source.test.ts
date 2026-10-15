/**
 * Shipped source stays Latin-1 only.
 *
 * V8 keeps every module's source text in the heap and stores it at one byte
 * per character only while every character is Latin-1; one `—` in a comment
 * doubles the memory of the whole file (see `codegen/latin1.ts`). Generated
 * modules go through `toLatin1`; this test holds hand-written modules to the
 * same rule. Fix a failure with `--` for an em dash, `'` / `"` for curly
 * quotes, `->` for arrows, or a `\u` escape inside a string.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const PACKAGES = join(import.meta.dirname, "..", "..");

const shippedSources = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      // Dev-time only: never imported by an SDK at runtime.
      if (name !== "codegen" && name !== "fixtures") shippedSources(path, out);
    } else if (name.endsWith(".ts") && !name.endsWith(".test.ts")) {
      out.push(path);
    }
  }
  return out;
};

test("shipped TypeScript sources contain only Latin-1 characters", () => {
  const offenders: string[] = [];
  for (const pkg of readdirSync(PACKAGES)) {
    const src = join(PACKAGES, pkg, "src");
    try {
      statSync(src);
    } catch {
      continue;
    }
    for (const file of shippedSources(src)) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        const match = /[^\x00-\xff]/.exec(line);
        if (match) {
          offenders.push(
            `${file.slice(PACKAGES.length + 1)}:${i + 1} U+${match[0].codePointAt(0)!.toString(16).toUpperCase()}`,
          );
        }
      });
    }
  }
  expect(offenders).toEqual([]);
});
