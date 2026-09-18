import { describe, expect, test } from "bun:test";
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
