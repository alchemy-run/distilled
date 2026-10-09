import { describe, expect, test } from "vitest";
import { mirrorId, repositoryName, SPEC_REPOS } from "./SpecRepos.ts";

describe("mirror identity", () => {
  test("defaults to the package name", () => {
    const specRepo = { package: "example" };
    expect(mirrorId(specRepo)).toBe("example");
    expect(repositoryName(specRepo)).toBe("spec-mirror-example");
  });

  test("preserves identity across a package rename", () => {
    const before = { package: "original" };
    const after = { package: "renamed", mirror: "original" };
    expect(mirrorId(after)).toBe(mirrorId(before));
    expect(repositoryName(after)).toBe(repositoryName(before));
  });

  test("Prisma keeps its existing mirror and logical IDs", () => {
    const prisma = SPEC_REPOS.find((r) => r.package === "prisma")!;
    expect(prisma).toEqual({ package: "prisma", mirror: "prisma-postgres" });
    expect(mirrorId(prisma)).toBe("prisma-postgres");
    expect(`scaffold-${mirrorId(prisma)}`).toBe("scaffold-prisma-postgres");
    expect(repositoryName(prisma)).toBe("spec-mirror-prisma-postgres");
    expect(SPEC_REPOS.some((r) => r.package === "prisma-postgres")).toBe(false);
  });

  test("all other providers retain their package-based identity", () => {
    for (const specRepo of SPEC_REPOS) {
      if (specRepo.package === "prisma") continue;
      expect(specRepo.mirror).toBeUndefined();
      expect(mirrorId(specRepo)).toBe(specRepo.package);
      expect(repositoryName(specRepo)).toBe(`spec-mirror-${specRepo.package}`);
    }
  });

  test("manifest packages and mirror identities are unique", () => {
    expect(new Set(SPEC_REPOS.map((r) => r.package)).size).toBe(SPEC_REPOS.length);
    expect(new Set(SPEC_REPOS.map(mirrorId)).size).toBe(SPEC_REPOS.length);
  });
});

describe("hand-written models", () => {
  test("a mirror ships every file in spec-repos/<package>/models/ under .meta/models/", async () => {
    const { NodeServices } = await import("@effect/platform-node");
    const Effect = await import("effect/Effect");
    const { loadScaffolds } = await import("./SpecRepos.ts");
    const scaffolds = await Effect.runPromise(
      loadScaffolds.pipe(Effect.provide(NodeServices.layer)),
    );
    expect(
      Object.keys(scaffolds["spec-mirror-celld"]!).filter((p) => p.startsWith(".meta/models/")),
    ).toEqual([".meta/models/node.json", ".meta/models/runtime.json"]);
    expect(scaffolds["spec-mirror-fly-io"]![".meta/models/mpg.json"]).toBeDefined();
    expect(
      Object.keys(scaffolds["spec-mirror-stripe"]!).some((p) => p.startsWith(".meta/models/")),
    ).toBe(false);
  });
});
