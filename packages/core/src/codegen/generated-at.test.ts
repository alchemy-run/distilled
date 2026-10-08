import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { lastChangeDate, specUpdatedAt, stampGeneratedAt } from "./generated-at.ts";

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
    const stamp = stampGeneratedAt(dir, {
      now: new Date("2026-10-08T23:30:00-05:00"),
      specUpdatedAt: "2026-10-03",
    });
    expect(stamp).toEqual({ generatedAt: "2026-10-09", specUpdatedAt: "2026-10-03" });
    const text = read();
    expect(Object.keys(JSON.parse(text))).toEqual(["name", "version", "scripts", "distilled"]);
    expect(JSON.parse(text).distilled).toEqual({
      generatedAt: "2026-10-09",
      specUpdatedAt: "2026-10-03",
    });
    expect(text.endsWith("}\n")).toBe(true);
  });

  it("updates existing dates and keeps other distilled fields", () => {
    setup({ name: "x", distilled: { other: true, generatedAt: "2025-01-01" } });
    stampGeneratedAt(dir, { now: new Date("2026-10-08T12:00:00Z"), specUpdatedAt: "2026-10-01" });
    expect(JSON.parse(read()).distilled).toEqual({
      other: true,
      generatedAt: "2026-10-08",
      specUpdatedAt: "2026-10-01",
    });
  });

  it("keeps the existing spec date when the spec date is unknown", () => {
    setup({ name: "x", distilled: { generatedAt: "2025-01-01", specUpdatedAt: "2024-12-31" } });
    stampGeneratedAt(dir, { now: new Date("2026-10-08T12:00:00Z"), specUpdatedAt: undefined });
    expect(JSON.parse(read()).distilled).toEqual({
      generatedAt: "2026-10-08",
      specUpdatedAt: "2024-12-31",
    });
  });

  it("finds no spec date for a package without specs/", () => {
    setup({ name: "x" });
    expect(specUpdatedAt(dir)).toBeUndefined();
  });
});

describe("lastChangeDate", () => {
  let dir: string;
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const sh = (cwd: string, ...args: string[]) => execFileSync("git", args, { cwd, stdio: "pipe" });
  const commit = (cwd: string, file: string, date: string) => {
    mkdirSync(join(cwd, dirname(file)), { recursive: true });
    writeFileSync(join(cwd, file), date);
    sh(cwd, "add", "-A");
    execFileSync("git", ["commit", "-qm", file], {
      cwd,
      env: { ...process.env, GIT_COMMITTER_DATE: date, GIT_AUTHOR_DATE: date },
    });
  };

  it("deepens a shallow clone past commits that do not touch the path", () => {
    dir = mkdtempSync(join(tmpdir(), "spec-date-"));
    const upstream = join(dir, "upstream");
    mkdirSync(upstream);
    sh(upstream, "init", "-q", "-b", "main");
    sh(upstream, "config", "user.email", "t@t");
    sh(upstream, "config", "user.name", "t");
    sh(upstream, "config", "uploadpack.allowFilter", "true");
    commit(upstream, "specs/a.json", "2026-09-30T10:00:00Z");
    commit(upstream, "specs/a.json", "2026-10-03T23:30:00-05:00");
    commit(upstream, ".meta/x.ts", "2026-10-05T10:00:00Z");
    sh(dir, "clone", "-q", "--depth=1", `file://${upstream}`, "mirror");
    // 23:30 at UTC-5 is the next day in UTC.
    expect(lastChangeDate(join(dir, "mirror"), "specs")).toBe("2026-10-04");
  });
});
