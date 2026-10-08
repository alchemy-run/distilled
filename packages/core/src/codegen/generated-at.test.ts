import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { stampGeneratedAt } from "./generated-at.ts";

describe("stampGeneratedAt", () => {
  let dir: string;
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const setup = (pkg: object) => {
    dir = mkdtempSync(join(tmpdir(), "generated-at-"));
    writeFileSync(join(dir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
  };
  const read = () => readFileSync(join(dir, "package.json"), "utf8");

  it("adds distilled.generatedAt as a UTC date and keeps the other fields in order", () => {
    setup({ name: "@distilled.cloud/x", version: "1.0.0", scripts: { generate: "g" } });
    expect(stampGeneratedAt(dir, new Date("2026-10-08T23:30:00-05:00"))).toBe("2026-10-09");
    const text = read();
    expect(Object.keys(JSON.parse(text))).toEqual(["name", "version", "scripts", "distilled"]);
    expect(JSON.parse(text).distilled).toEqual({ generatedAt: "2026-10-09" });
    expect(text.endsWith("}\n")).toBe(true);
  });

  it("updates an existing date and keeps other distilled fields", () => {
    setup({ name: "x", distilled: { other: true, generatedAt: "2025-01-01" } });
    stampGeneratedAt(dir, new Date("2026-10-08T12:00:00Z"));
    expect(JSON.parse(read()).distilled).toEqual({ other: true, generatedAt: "2026-10-08" });
  });
});
