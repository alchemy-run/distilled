import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { convertOpenApiToSmithy, RENAME_METADATA_KEY } from "./openapi.ts";
import { FINALIZED_KEY, finalizeConvert } from "./patches.ts";

const spec = {
  openapi: "3.0.3",
  info: { title: "Apps", version: "1" },
  paths: {
    "/apps": {
      get: {
        operationId: "Apps_list",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/App" } },
              },
            },
          },
        },
      },
    },
    "/apps/{id}": {
      get: {
        operationId: "Apps_get",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            content: { "application/json": { schema: { $ref: "#/components/schemas/App" } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      App: { type: "object", properties: { name: { type: "string" } } },
      // Takes the name the final-named run gives `Apps_list`'s response, so
      // the two runs disagree on which shape gets the `2` suffix.
      ListAppsResponse: { type: "object", properties: { n: { type: "integer" } } },
    },
  },
};

const options = { namespace: "ns", serviceName: "Apps" };

const dirs: string[] = [];
afterEach(() => {
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
});

/** Write `model` as `.generated-specs/apps.json`, with optional patch files. */
const finalize = async (model: unknown, patches: Record<string, unknown[]> = {}) => {
  const root = mkdtempSync(join(tmpdir(), "defer-naming-"));
  dirs.push(root);
  mkdirSync(join(root, ".generated-specs"));
  writeFileSync(join(root, ".generated-specs", "apps.json"), JSON.stringify(model));
  mkdirSync(join(root, "patches", "apps"), { recursive: true });
  for (const [name, ops] of Object.entries(patches)) {
    writeFileSync(join(root, "patches", "apps", name), JSON.stringify({ patches: ops }));
  }
  await finalizeConvert({ root, operationNaming: "as-is" });
  return JSON.parse(readFileSync(join(root, ".generated-specs", "apps.json"), "utf8"));
};

describe("deferNaming", () => {
  test("names shapes from the spec and records the final names", () => {
    const model = convertOpenApiToSmithy(spec, { ...options, deferNaming: true });
    expect(model.shapes["ns#AppsList"]?.type).toBe("operation");
    expect(model.shapes["ns#ListApps"]).toBeUndefined();
    expect(model.metadata[RENAME_METADATA_KEY]).toMatchObject({
      "ns#AppsList": "ns#ListApps",
      "ns#AppsGet": "ns#GetApp",
    });
  });

  test("finalize renames to exactly the model converted with final names", async () => {
    const named = convertOpenApiToSmithy(spec, options);
    const deferred = convertOpenApiToSmithy(spec, { ...options, deferNaming: true });
    const finalized = await finalize(deferred);
    expect(finalized).toEqual({
      ...named,
      metadata: { ...named.metadata, [FINALIZED_KEY]: true },
    });
    expect(Object.keys(finalized.shapes)).toEqual(Object.keys(named.shapes));
  });

  test("a Smithy patch targets the upstream name", async () => {
    const deferred = convertOpenApiToSmithy(spec, { ...options, deferNaming: true });
    const finalized = await finalize(deferred, {
      "doc.json": [
        {
          op: "add",
          path: "/shapes/ns#AppsList/traits/smithy.api#documentation",
          value: "Every app.",
        },
      ],
    });
    expect(finalized.shapes["ns#ListApps"].traits["smithy.api#documentation"]).toBe("Every app.");
  });

  test("a patch that takes a final name fails the rename", async () => {
    const deferred = convertOpenApiToSmithy(spec, { ...options, deferNaming: true });
    await expect(
      finalize(deferred, {
        "clash.json": [{ op: "add", path: "/shapes/ns#GetApp", value: { type: "structure" } }],
      }),
    ).rejects.toThrow(/already taken/);
  });
});
