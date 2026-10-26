import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import {
  clearModels,
  collectModels,
  listModels,
  modelExists,
  readModel,
  removeModel,
  writeModel,
} from "../../src/codegen/models.ts";
import { FINALIZED_KEY, finalizeConvert } from "../../src/codegen/patches.ts";

const model = () => ({
  smithy: "2.0",
  shapes: {
    "ns#Svc": { type: "service", operations: [{ target: "ns#AppsGet" }] },
    "ns#AppsGet": {
      type: "operation",
      input: { target: "smithy.api#Unit" },
      output: { target: "smithy.api#Unit" },
    },
  },
});

const scaffold = () => {
  const root = mkdtempSync(join(tmpdir(), "models-"));
  mkdirSync(join(root, "patches", "svc"), { recursive: true });
  writeFileSync(
    join(root, "patches", "svc", "a.json"),
    JSON.stringify({
      patches: [{ op: "add", path: "/shapes/ns#AppsGet/traits", value: { "x#patched": {} } }],
    }),
  );
  return root;
};

// Runs in order: once a collectModels has returned, writing to disk throws.
describe("models", () => {
  test("a bare convert writes the models to disk", async () => {
    const root = scaffold();
    const file = join(root, ".generated-specs", "svc.json");
    writeModel(file, model());
    await finalizeConvert({ root });
    const m = JSON.parse(readFileSync(file, "utf8"));
    expect(m.shapes["ns#GetApp"].traits).toEqual({ "x#patched": {} });
    expect(m.metadata[FINALIZED_KEY]).toBe(true);
  });

  test("collectModels keeps the models, patched, in memory", async () => {
    const root = scaffold();
    const dir = join(root, ".generated-specs");
    const models = await collectModels(async () => {
      writeModel(join(dir, "svc.json"), model());
      writeModel(join(dir, "nested", "other.json"), model());
      writeModel(join(dir, "dropped.json"), model());
      removeModel(join(dir, "dropped.json"));
      expect(modelExists(join(dir, "svc.json"))).toBe(true);
      expect(listModels(dir)).toEqual([join(dir, "nested", "other.json"), join(dir, "svc.json")]);
      await finalizeConvert({ root, include: (resource) => resource === "svc" });
      expect(readModel(join(dir, "svc.json")).shapes["ns#GetApp"].traits).toEqual({
        "x#patched": {},
      });
    });
    expect([...models.keys()].sort()).toEqual([
      join(dir, "nested", "other.json"),
      join(dir, "svc.json"),
    ]);
    expect(JSON.parse(models.get(join(dir, "svc.json"))!).metadata[FINALIZED_KEY]).toBe(true);
    expect(existsSync(dir)).toBe(false);
  });

  test("clearModels drops only the models under a directory", async () => {
    const root = scaffold();
    const models = await collectModels(() => {
      writeModel(join(root, "a", "x.json"), {});
      writeModel(join(root, "ab", "y.json"), {});
      clearModels(join(root, "a"));
    });
    expect([...models.keys()]).toEqual([join(root, "ab", "y.json")]);
  });

  test("a model written after collection ends throws instead of reaching disk", async () => {
    const root = scaffold();
    const file = join(root, ".generated-specs", "late.json");
    let late: Promise<void> | undefined;
    await collectModels(() => {
      // A floating step, like an un-awaited `main()`.
      late = new Promise((resolve) => setTimeout(resolve, 10)).then(() =>
        writeModel(file, model()),
      );
    });
    await expect(late).rejects.toThrow(/after generate stopped collecting/);
    expect(existsSync(file)).toBe(false);
  });
});
