/**
 * Records, in the package's `package.json`, two UTC `YYYY-MM-DD` dates:
 *
 * - `distilled.generatedAt` — when the SDK was last generated.
 * - `distilled.specUpdatedAt` — when the spec it was generated from last
 *   changed: the newest commit at or before the pinned mirror commit that
 *   touched the mirror's `specs/` directory.
 *
 * Every successful generator run calls this, so both dates land in the same
 * commit as the regenerated code and ship to npm with the package. Dates (not
 * timestamps) keep repeat runs on the same day from churning the manifest.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { isLocalSpecs } from "./spec-path.ts";

/** A date in UTC, `YYYY-MM-DD`. */
export const generatedAtDate = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

const git = (cwd: string, ...args: string[]): string =>
  execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

/** Commits at a shallow boundary; git shows them as adding every file. */
const shallowCommits = (cwd: string): Set<string> => {
  const file = git(cwd, "rev-parse", "--path-format=absolute", "--git-path", "shallow");
  return new Set(existsSync(file) ? readFileSync(file, "utf8").split("\n").filter(Boolean) : []);
};

/**
 * Date of the newest commit at or before `HEAD` of the repository at `cwd`
 * that changed `pathspec`. Mirrors are checked out `--depth=1`, so this
 * deepens the history (commits and trees only, no file content) until the
 * answer is a real commit and not the shallow boundary.
 */
export const lastChangeDate = (cwd: string, pathspec: string): string => {
  for (let round = 0; round < 20; round++) {
    const [sha, date] = git(cwd, "log", "-1", "--format=%H %cI", "HEAD", "--", pathspec).split(" ");
    if (!sha) throw new Error(`no commit in ${cwd} touches ${pathspec}`);
    if (!shallowCommits(cwd).has(sha)) return generatedAtDate(new Date(date!));
    git(cwd, "fetch", "--quiet", "--deepen=50", "--filter=blob:none", "origin");
  }
  throw new Error(`gave up deepening ${cwd} to find the last change to ${pathspec}`);
};

/**
 * When the package's spec last changed, or `undefined` if that cannot be
 * known here: no `specs/` directory (a hand-written SDK), the mirror is not
 * checked out, or specs come from the untracked `specs/.local` copy.
 */
export const specUpdatedAt = (root: string): string | undefined => {
  const specs = join(root, "specs");
  if (isLocalSpecs() || !existsSync(specs)) return undefined;
  const mirror = readdirSync(specs).find((d) => d.startsWith("spec-mirror-"));
  if (mirror === undefined) return lastChangeDate(root, "specs");
  const dir = join(specs, mirror);
  // An uninitialised submodule is an empty directory with no `.git`.
  return existsSync(join(dir, ".git")) ? lastChangeDate(dir, "specs") : undefined;
};

export interface GeneratedAtStamp {
  readonly generatedAt: string;
  /** `undefined` when unknown; the existing value in `package.json` is kept. */
  readonly specUpdatedAt: string | undefined;
}

/**
 * Set `distilled.generatedAt` and `distilled.specUpdatedAt` in
 * `<root>/package.json`; returns the dates written.
 */
export const stampGeneratedAt = (
  root: string,
  options: { readonly now?: Date; readonly specUpdatedAt?: string | undefined } = {},
): GeneratedAtStamp => {
  const generatedAt = generatedAtDate(options.now);
  const spec = "specUpdatedAt" in options ? options.specUpdatedAt : specUpdatedAt(root);
  const file = join(root, "package.json");
  const text = readFileSync(file, "utf8");
  const pkg = JSON.parse(text);
  pkg.distilled = {
    ...pkg.distilled,
    generatedAt,
    ...(spec === undefined ? {} : { specUpdatedAt: spec }),
  };
  const next = `${JSON.stringify(pkg, null, 2)}\n`;
  if (next !== text) writeFileSync(file, next);
  return { generatedAt, specUpdatedAt: spec };
};
