/**
 * Shipped source never dies.
 *
 * A die is a defect: `Effect.catch` can't handle it, and retry and
 * telemetry see a crash. An SDK fails every call with a typed error
 * instead -- `SdkError` (`core/src/sdk-error.ts`) when the SDK itself can't
 * make the call, and the generator refuses the configs that would cause
 * one. Fix a failure by failing with a typed error of the operation's
 * error channel.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const PACKAGES = join(import.meta.dirname, "..", "..");

const DIE =
  /\b(?:Effect|Stream|Layer|Channel|Sink|STM|Micro|Exit|Cause)\.(?:die|dieMessage|dieSync|orDie|orDieWith)\b/;

const shippedSources = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== "fixtures") shippedSources(path, out);
    } else if (name.endsWith(".ts") && !name.endsWith(".test.ts")) {
      out.push(path);
    }
  }
  return out;
};

test("shipped TypeScript sources never die", () => {
  const offenders: string[] = [];
  // dev holds the generator and test helpers; no SDK imports it at runtime.
  for (const pkg of readdirSync(PACKAGES).filter((p) => p !== "dev")) {
    const src = join(PACKAGES, pkg, "src");
    try {
      statSync(src);
    } catch {
      continue;
    }
    for (const file of shippedSources(src)) {
      const text = readFileSync(file, "utf8");
      if (!DIE.test(text)) continue;
      text.split("\n").forEach((line, i) => {
        if (DIE.test(line)) offenders.push(`${file.slice(PACKAGES.length + 1)}:${i + 1}`);
      });
    }
  }
  expect(offenders).toEqual([]);
});
