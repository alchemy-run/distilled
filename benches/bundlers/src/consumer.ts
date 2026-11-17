/**
 * A consumer project of the published SDKs: the packages built and packed as
 * `pnpm publish` would, unpacked into `node_modules`, with the fixtures next
 * to them. No network: `effect` is linked from the workspace.
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(here, "../../..");
const FIXTURES = path.resolve(here, "../fixtures");

/** The packages the fixtures import, with what they depend on. */
export const PACKAGES = ["core", "aws4signer", "s3", "aws", "cloudflare", "prisma"] as const;

const run = (cmd: string, args: string[], cwd: string) => {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed (${r.status}):\n${(r.stdout + r.stderr).slice(-4000)}`,
    );
  }
  return r.stdout;
};

/** `pnpm build`, limited to {@link PACKAGES} (as benches/sdks/ci.ts does). */
export const buildPackages = () => {
  const dirs = PACKAGES.map((p) => `packages/${p}`);
  run(path.join(REPO, "node_modules", ".bin", "tsrs"), ["-b", ...dirs], REPO);
  run(process.execPath, [path.join(REPO, "scripts", "bundle-lib.ts"), ...dirs.slice(1)], REPO);
  run(process.execPath, [path.join(REPO, "scripts", "strip-lib-docs.ts"), ...dirs], REPO);
};

export interface Consumer {
  readonly dir: string;
  /** A fixture's path in the consumer project. */
  readonly fixture: (name: string) => string;
  /** `HOME` for the programs: empty, so no real AWS profile is read. */
  readonly home: string;
}

/**
 * Packs {@link PACKAGES} (built unless `build` is false) into a new temporary
 * consumer project.
 */
export const makeConsumer = (options: { readonly build?: boolean } = {}): Consumer => {
  if (options.build !== false) buildPackages();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "distilled-bundlers-"));
  const tarballs = path.join(dir, ".tarballs");
  fs.mkdirSync(tarballs);
  for (const pkg of PACKAGES) {
    const before = new Set(fs.readdirSync(tarballs));
    run("pnpm", ["pack", "--pack-destination", tarballs], path.join(REPO, "packages", pkg));
    const tgz = fs.readdirSync(tarballs).find((f) => !before.has(f))!;
    const target = path.join(dir, "node_modules", "@distilled.cloud", pkg);
    fs.mkdirSync(target, { recursive: true });
    run("tar", ["-xzf", path.join(tarballs, tgz), "-C", target, "--strip-components=1"], dir);
  }
  // The workspace's `effect`, resolved as core resolves it: one copy.
  const effect = path.dirname(
    createRequire(path.join(REPO, "packages", "core", "package.json")).resolve(
      "effect/package.json",
    ),
  );
  fs.symlinkSync(effect, path.join(dir, "node_modules", "effect"), "dir");
  fs.cpSync(FIXTURES, path.join(dir, "fixtures"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ name: "consumer", private: true, type: "module" }),
  );
  const home = path.join(dir, "home");
  fs.mkdirSync(home);
  return { dir, fixture: (name) => path.join(dir, "fixtures", `${name}.mjs`), home };
};

/** Runs `file` with node in its directory; its stdout lines. */
export const runProgram = (
  file: string,
  home: string,
  nodeArgs: ReadonlyArray<string> = [],
): string[] => {
  const r = spawnSync(process.execPath, [...nodeArgs, file], {
    cwd: path.dirname(file),
    encoding: "utf8",
    // No AWS_* settings: `fromIni` reads only the empty home.
    env: {
      ...Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith("AWS_"))),
      HOME: home,
      USERPROFILE: home,
    },
    timeout: 120_000,
  });
  if (r.status !== 0) {
    throw new Error(`node ${file} exited ${r.status}:\n${(r.stdout + r.stderr).slice(-4000)}`);
  }
  return r.stdout.trim().split("\n");
};
