/**
 * Checks that run against every SDK package in the repo. Generated code is
 * tested once, here in core; these catch a package whose hand-written glue
 * drifted from what the generator and protocols expect.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { auditPackage } from "./codegen/patch-audit.ts";
import { patchStage } from "./codegen/patches.ts";

const PACKAGES = join(import.meta.dirname, "..", "..");

const sdks = readdirSync(PACKAGES)
  .filter((name) => name !== "core" && existsSync(join(PACKAGES, name, "package.json")))
  .sort();

/** Packages without a `<Sdk>OpError` union over a REST/RPC protocol, and why. */
const NO_OP_ERROR: Record<string, string> = {
  aws: "hand-written protocols; ParseError is part of CommonErrors in src/errors.ts",
  railway: "GraphQL Query SDK; errors are typed per root by core/graphql",
};

const read = (pkg: string, file: string): string | undefined => {
  const p = join(PACKAGES, pkg, file);
  return existsSync(p) ? readFileSync(p, "utf8") : undefined;
};

/** Hand-written sources: `src/*.ts` without tests (generated code lives in `src/services/`). */
const handWritten = (pkg: string): string[] => {
  const dir = join(PACKAGES, pkg, "src");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
    .map((f) => readFileSync(join(dir, f), "utf8"));
};

/** Every `export type <Name> = …` in the package's hand-written sources. */
const typeAliases = (pkg: string): Map<string, string> => {
  const aliases = new Map<string, string>();
  for (const source of handWritten(pkg)) {
    for (const match of source.matchAll(/^export type (\w+)\s*=([\s\S]*?);[ \t]*$/gm)) {
      aliases.set(match[1]!, match[2]!);
    }
  }
  return aliases;
};

/** Names reachable from `root` through the package's own aliases (`DefaultErrors`, `ClientErrors`, …). */
const reachable = (aliases: Map<string, string>, root: string): Set<string> => {
  const seen = new Set<string>();
  const stack = [root];
  while (stack.length > 0) {
    const name = stack.pop()!;
    if (seen.has(name)) continue;
    seen.add(name);
    for (const ref of aliases.get(name)?.match(/\b[A-Z]\w*\b/g) ?? []) stack.push(ref);
  }
  return seen;
};

describe("every SDK", () => {
  test("the exemption list names real packages", () => {
    for (const pkg of Object.keys(NO_OP_ERROR)) expect(sdks).toContain(pkg);
  });

  describe.each(sdks.filter((pkg) => !(pkg in NO_OP_ERROR)))("%s", (pkg) => {
    test("declares its ParseError in the operation error union and constructs it in the protocol", () => {
      const aliases = typeAliases(pkg);
      const opError = [...aliases.keys()].find((name) => name.endsWith("OpError"));
      expect(opError, `packages/${pkg}/src declares no \`export type <Sdk>OpError\``).toBeDefined();
      const parseError = [...reachable(aliases, opError!)].find((name) =>
        name.endsWith("ParseError"),
      );
      // Without it, `Effect.catchTag("<Sdk>ParseError")` on a strict call is a type error.
      expect(parseError, `${opError} has no ParseError member`).toBeDefined();
      expect(
        handWritten(pkg).some((source) => source.includes(`new ${parseError}(`)),
        `nothing outside src/services constructs ${parseError}`,
      ).toBe(true);
      expect(read(pkg, "src/errors.ts")).toMatch(new RegExp(`export class ${parseError}\\b`));
    });
  });

  test("aws keeps ParseError in CommonErrors", () => {
    const errors = read("aws", "src/errors.ts")!;
    expect(errors).toMatch(/export class ParseError\b/);
    expect(/export type CommonErrors =([^;]*);/.exec(errors)?.[1]).toMatch(/\bParseError\b/);
  });
});

describe.each(sdks.filter((pkg) => patchStage(join(PACKAGES, pkg)) === "generate"))(
  "%s generate-stage patches",
  (pkg) => {
    // Generate-stage patches apply to the committed model, so their audit
    // needs no spec mirror and runs here on every PR.
    test("every patch file still changes the model", async () => {
      const result = await auditPackage(join(PACKAGES, pkg));
      if (result.kind === "skipped") throw new Error(result.reason);
      const unused = result.files.filter((f) => f.verdict.kind === "unused").map((f) => f.file.key);
      expect(unused, `delete these from packages/${pkg}/patches/`).toEqual([]);
    });
  },
);
