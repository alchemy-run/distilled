import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { afterAll, describe, expect, test } from "vitest";
import { crdSpec, groupPascal, readCrds, type Crd } from "./crds.ts";

const fixtures = path.join(import.meta.dirname, "../test/fixtures");
const json = (file: string) => JSON.parse(readFileSync(path.join(fixtures, file), "utf8"));

/** The template path items and parameters, cut from the mirror's swagger.json. */
const base = json("crd-templates.json");
/** What a real API server publishes for the external-snapshotter CRDs. */
const served = json("snapshot-served.json");
const manifests = readdirSync(path.join(fixtures, "crds")).map((file) =>
  path.join(fixtures, "crds", file),
);
const crds: Crd[] = await readCrds(manifests);

/** The same summary as test/fixtures/snapshot-served.json, of a built fragment. */
const operations = (paths: Record<string, any>) => {
  const resolve = (p: any) => (p.$ref ? base.parameters[p.$ref.split("/").pop()] : p);
  const out: Record<string, unknown> = {};
  for (const [route, item] of Object.entries<any>(paths)) {
    for (const method of ["get", "post", "put", "patch", "delete"]) {
      const op = item[method];
      if (op === undefined) continue;
      out[`${method.toUpperCase()} ${route}`] = {
        operationId: op.operationId,
        parameters: [...(item.parameters ?? []), ...(op.parameters ?? [])]
          .map(resolve)
          .map((p) => `${p.in}:${p.name}${p.in === "body" ? `=${p.schema.$ref}` : ""}`)
          .sort(),
        response: op.responses["200"].schema.$ref,
        ...(method === "patch" ? { consumes: op.consumes } : {}),
      };
    }
  }
  return out;
};

describe("crdSpec", () => {
  const built = crdSpec(base, crds);

  test("builds the operations the API server serves for the CRDs", () => {
    expect(operations(built.paths)).toEqual(served.operations);
  });

  test("defines each served kind and its list, and names nested objects by path", () => {
    expect(Object.keys(built.definitions)).toEqual(expect.arrayContaining(served.definitions));
    const snapshot = built.definitions["io.k8s.storage.snapshot.v1.VolumeSnapshot"];
    expect(snapshot.properties.metadata.$ref).toBe(
      "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
    );
    expect(snapshot.properties.spec).toEqual({
      $ref: "#/definitions/io.k8s.storage.snapshot.v1.VolumeSnapshotSpec",
    });
    expect(
      built.definitions["io.k8s.storage.snapshot.v1.VolumeSnapshotSpec"].properties.source,
    ).toEqual({ $ref: "#/definitions/io.k8s.storage.snapshot.v1.VolumeSnapshotSpecSource" });
    expect(built.definitions["io.k8s.storage.snapshot.v1.VolumeSnapshotList"]).toMatchObject({
      required: ["items"],
      properties: {
        items: { items: { $ref: "#/definitions/io.k8s.storage.snapshot.v1.VolumeSnapshot" } },
      },
    });
  });

  test("skips versions the server does not serve", () => {
    expect(Object.keys(built.paths).some((p) => p.includes("/v1beta1/"))).toBe(false);
  });

  test("names groups like the API server", () => {
    expect(groupPascal("snapshot.storage.k8s.io")).toBe("SnapshotStorage");
    expect(groupPascal("cert-manager.io")).toBe("CertManagerIo");
  });

  test("names the custom kind, not the template's, in every description", () => {
    expect(JSON.stringify(built.paths)).not.toMatch(/\b(Job|PersistentVolume|StatefulSet)\b/);
  });

  /** A namespaced CRD `Foo` whose schema is `spec`. */
  const foo = (spec: Record<string, any>): Crd => ({
    kind: "CustomResourceDefinition",
    spec: {
      group: "example.com",
      scope: "Namespaced",
      names: { kind: "Foo", plural: "foos" },
      versions: [
        {
          name: "v1",
          served: true,
          schema: { openAPIV3Schema: { type: "object", properties: spec } },
        },
      ],
    },
  });
  const object = { type: "object", properties: { a: { type: "string" } } };

  test("refuses a nested object named like the kind's list", () => {
    expect(() => crdSpec(base, [foo({ list: object })])).toThrow(/two schemas are named/);
  });

  test("names nested objects by keys with any characters", () => {
    const { definitions } = crdSpec(base, [
      foo({ spec: { type: "object", properties: { "app.kubernetes.io/name": object } } }),
    ]);
    expect(definitions["com.example.v1.FooSpec"].properties["app.kubernetes.io/name"]).toEqual({
      $ref: "#/definitions/com.example.v1.FooSpecAppKubernetesIoName",
    });
  });
});

describe("readCrds", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "crds-"));
  afterAll(() => rmSync(dir, { recursive: true }));

  test("reads every document of each manifest", async () => {
    const both = path.join(dir, "both.yaml");
    writeFileSync(
      both,
      manifests
        .slice(0, 2)
        .map((file) => readFileSync(file, "utf8"))
        .join("\n---\n"),
    );
    const read = await readCrds([both, manifests[2]!]);
    expect(read.map((crd) => crd.spec.names.kind)).toEqual(crds.map((crd) => crd.spec.names.kind));
  });

  test("refuses a manifest that is not a CRD", async () => {
    const deployment = path.join(dir, "deployment.yaml");
    writeFileSync(deployment, "kind: Deployment\n");
    await expect(readCrds([deployment])).rejects.toThrow(/expected a CustomResourceDefinition/);
  });

  test("names a missing manifest and how to fetch it", async () => {
    const missing = path.join(dir, "missing.yaml");
    await expect(readCrds([missing])).rejects.toThrow(
      new RegExp(`${missing}.*pnpm specs:local kubernetes`),
    );
  });

  test("refuses a manifest that does not parse", async () => {
    const broken = path.join(dir, "broken.yaml");
    writeFileSync(broken, "kind: CustomResourceDefinition\nspec: [unclosed\n");
    await expect(readCrds([broken])).rejects.toThrow(/broken\.yaml/);
  });
});
