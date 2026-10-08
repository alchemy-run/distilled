import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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

  test("a patch that changes the model is needed and its pointer is listed", async () => {
    const result = await auditPackage(fixture({ "add-b.json": [addB] }));
    expect(result.kind).toBe("audited");
    if (result.kind !== "audited") return;
    expect(result.files[0]!.verdict).toEqual({ kind: "needed", diff: ["+ Thing/members/b"] });
  });

  test("a patch that repeats what the model says has no effect", async () => {
    const same = { op: "replace", path: "/shapes/x#Thing/type", value: "structure" };
    const result = await auditPackage(fixture({ "noop.json": [same] }));
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(result.files[0]!.verdict.kind).toBe("unused");
  });

  test("a patch a later one builds on is reported as depended on", async () => {
    const useB = { op: "add", path: "/shapes/x#Thing/members/b/traits", value: {} };
    const result = await auditPackage(fixture({ "1-add-b.json": [addB], "2-use-b.json": [useB] }));
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(result.files.map((f) => f.verdict.kind)).toEqual(["depended", "needed"]);
  });

  test("--ops finds the dead op inside a needed file", async () => {
    const dead = { op: "replace", path: "/shapes/x#Thing/type", value: "structure" };
    const result = await auditPackage(fixture({ "mixed.json": [addB, dead] }), { ops: true });
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

// ---------------------------------------------------------------------------

const PATCHES_TS = join(import.meta.dirname, "patches.ts");

/**
 * A convert-stage package: `spec.json` lists field names, spec ops edit it,
 * and every field becomes a member of `x#Thing`. Smithy ops apply in
 * finalizeConvert, whose transform drops a member named `dropped`.
 */
const convertFixture = (patches: Record<string, unknown[]>): string => {
  const parent = mkdtempSync(join(tmpdir(), "patch-audit-convert-"));
  dirs.push(parent);
  const root = join(parent, "pkg");
  mkdirSync(join(root, "scripts"), { recursive: true });
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "fixture", scripts: { convert: "node scripts/convert.ts" } }),
  );
  writeFileSync(join(root, "spec.json"), JSON.stringify({ fields: { a: true } }));
  writeFileSync(
    join(root, "scripts", "convert.ts"),
    `
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { applyRfc6902Files, finalizeConvert, isSmithyPatchPath, listRfc6902PatchFiles } from ${JSON.stringify(PATCHES_TS)};
const root = join(import.meta.dirname, "..");
const spec = JSON.parse(readFileSync(join(root, "spec.json"), "utf8"));
const files = await listRfc6902PatchFiles(join(root, "patches", "svc"));
const applied = await applyRfc6902Files(spec, files, { include: (op) => !isSmithyPatchPath(op.path) });
if (applied.errors.length) throw new Error(applied.errors.join("\\n"));
const members = Object.fromEntries(Object.keys(spec.fields).map((k) => [k, { target: "smithy.api#String" }]));
mkdirSync(join(root, ".generated-specs"), { recursive: true });
writeFileSync(join(root, ".generated-specs", "svc.json"), JSON.stringify({ smithy: "2.0", shapes: { "x#Thing": { type: "structure", members } } }));
await finalizeConvert({
  root,
  operationNaming: "as-is",
  transform: (model) => { delete model.shapes["x#Thing"].members.dropped; },
});
`,
  );
  mkdirSync(join(root, "patches", "svc"), { recursive: true });
  for (const [name, ops] of Object.entries(patches)) {
    writeFileSync(join(root, "patches", "svc", name), JSON.stringify({ patches: ops }));
  }
  mkdirSync(join(root, ".generated-specs"));
  writeFileSync(join(root, ".generated-specs", "svc.json"), "committed\n");
  return root;
};

const addField = (name: string) => ({ op: "add", path: `/fields/${name}`, value: true });
const addMember = (name: string) => ({
  op: "add",
  path: `/shapes/x#Thing/members/${name}`,
  value: { target: "smithy.api#String" },
});

describe("convert-stage patch audit", () => {
  test("judges Smithy-only files in memory and spec files by convert", async () => {
    const root = convertFixture({
      "1-spec.json": [addField("s")],
      "2-member.json": [addMember("b")],
      "3-noop.json": [{ op: "replace", path: "/shapes/x#Thing/type", value: "structure" }],
      "4-dropped.json": [addMember("dropped")],
      "5-uses-b.json": [{ op: "add", path: "/shapes/x#Thing/members/b/traits", value: {} }],
    });
    const result = await auditPackage(root, { jobs: 2 });
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(Object.fromEntries(result.files.map((f) => [f.file.key, f.verdict]))).toEqual({
      "svc/1-spec.json": { kind: "needed", diff: ["+ Thing/members/s"] },
      "svc/2-member.json": { kind: "depended", error: expect.stringMatching(/members\/b/) },
      "svc/3-noop.json": { kind: "unused" },
      // The transform removes it again, so it changes nothing.
      "svc/4-dropped.json": { kind: "unused" },
      "svc/5-uses-b.json": { kind: "needed", diff: ["+ Thing/members/b/traits"] },
    });
    expect(result.judged).toEqual({ inMemory: 4, perFile: 1 });
  });

  test("--ops in memory finds the dead op", async () => {
    const root = convertFixture({
      "mixed.json": [
        addMember("b"),
        { op: "replace", path: "/shapes/x#Thing/type", value: "structure" },
      ],
    });
    const result = await auditPackage(root, { ops: true, jobs: 1 });
    if (result.kind !== "audited") throw new Error(result.reason);
    expect(result.files[0]!.deadOps).toEqual([1]);
  });

  test("leaves the package as it was and removes its scratch copies", async () => {
    const root = convertFixture({ "member.json": [addMember("b")], "spec.json": [addField("s")] });
    const result = await auditPackage(root, { jobs: 2 });
    expect(result.kind).toBe("audited");
    expect(readFileSync(join(root, ".generated-specs", "svc.json"), "utf8")).toBe("committed\n");
    expect(readdirSync(join(root, ".."))).toEqual(["pkg"]);
    expect(existsSync(join(root, ".audit-request.json"))).toBe(false);
  });

  test("a baseline that fails to convert is skipped", async () => {
    const root = convertFixture({ "stale.json": [{ op: "remove", path: "/shapes/x#Gone" }] });
    const result = await auditPackage(root, { jobs: 1 });
    expect(result.kind).toBe("skipped");
  });
});
