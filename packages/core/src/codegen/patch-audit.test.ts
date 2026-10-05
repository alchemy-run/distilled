import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { auditPackage } from "./patch-audit.ts";
import { applyModelPatches, patchStage } from "./patches.ts";

const dirs: string[] = [];
afterEach(() => {
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
});

const model = {
  smithy: "2.0",
  shapes: {
    "x#Thing": { type: "structure", members: { a: { target: "smithy.api#String" } } },
  },
};

/** A generate-stage package with one model and the given patch files. */
const fixture = (patches: Record<string, unknown[]>): string => {
  const root = mkdtempSync(join(tmpdir(), "patch-audit-"));
  dirs.push(root);
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "fixture", distilled: { patches: "generate" } }),
  );
  mkdirSync(join(root, ".generated-specs"));
  writeFileSync(join(root, ".generated-specs", "svc.json"), JSON.stringify(model));
  mkdirSync(join(root, "patches", "svc"), { recursive: true });
  for (const [name, ops] of Object.entries(patches)) {
    writeFileSync(join(root, "patches", "svc", name), JSON.stringify({ patches: ops }));
  }
  return root;
};

const addB = {
  op: "add",
  path: "/shapes/x#Thing/members/b",
  value: { target: "smithy.api#String" },
};

describe("generate-stage patch audit", () => {
  test("reads the stage from package.json", () => {
    expect(patchStage(fixture({}))).toBe("generate");
  });

  test("a patch that changes the model is needed and its pointer is listed", () => {
    const result = auditPackage(fixture({ "add-b.json": [addB] }));
    expect(result.kind).toBe("audited");
    if (result.kind !== "audited") return;
    expect(result.files[0]!.verdict).toEqual({ kind: "needed", diff: ["+ Thing/members/b"] });
  });

  test("a patch that repeats what the model says has no effect", () => {
    const same = { op: "replace", path: "/shapes/x#Thing/type", value: "structure" };
    const result = auditPackage(fixture({ "noop.json": [same] }));
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(result.files[0]!.verdict.kind).toBe("unused");
  });

  test("a patch a later one builds on is reported as depended on", () => {
    const useB = { op: "add", path: "/shapes/x#Thing/members/b/traits", value: {} };
    const result = auditPackage(fixture({ "1-add-b.json": [addB], "2-use-b.json": [useB] }));
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(result.files.map((f) => f.verdict.kind)).toEqual(["depended", "needed"]);
  });

  test("--ops finds the dead op inside a needed file", () => {
    const dead = { op: "replace", path: "/shapes/x#Thing/type", value: "structure" };
    const result = auditPackage(fixture({ "mixed.json": [addB, dead] }), { ops: true });
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(result.files[0]!.deadOps).toEqual([1]);
  });

  test("a stale pointer fails the generate run", () => {
    const stale = { op: "replace", path: "/shapes/x#Gone/type", value: "structure" };
    expect(() =>
      applyModelPatches(
        structuredClone(model),
        join(fixture({ "stale.json": [stale] }), "patches", "svc"),
      ),
    ).toThrow(/stale target/);
  });
});
