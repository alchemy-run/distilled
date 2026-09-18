#!/usr/bin/env bun
/**
 * specs — the spec-mirror workflow, from a local working copy to a real
 * submodule.
 *
 * Every SDK package reads its specs out of `packages/<pkg>/specs/`. In
 * production that directory holds a submodule of the package's mirror
 * repository — `distilled-mirror/spec-mirror-<mirrorId>`, one per spec-consuming
 * package, created and kept in shape by `stacks/distilled-submodules`.
 *
 * That leaves a gap for anyone adding a provider: the mirror does not exist
 * until the stack deploys on merge to main, and it lives in an org an
 * external contributor has no write access to. So the same `fetch-specs.ts`
 * the mirror would run is runnable here, into a gitignored directory laid out
 * exactly like the mirror repository:
 *
 *   packages/<pkg>/specs/.local/
 *   ├── .meta/          fetch-specs.ts + package.json + tsconfig.json
 *   ├── .github/        the update workflow (inert locally — copied so the
 *   │                   local tree is byte-identical to the deployed one)
 *   └── specs/          what the generator reads
 *
 *   pnpm specs:local <pkg>...   materialise it (or refresh it)
 *   pnpm specs:link  <pkg>...   add the `.gitmodules` entry for the mirror
 *   pnpm specs:check            the CI gate — see `check` below
 *
 * `specs:local` only puts the files on disk. Generating from them is opt-in
 * per command:
 *
 *   DISTILLED_SPECS_LOCAL=1 pnpm generate <pkg>
 *
 * which re-roots every spec read into `.local` (see
 * `@distilled.cloud/core/codegen/spec-path`). Nothing in the package's source
 * points at `.local`, so there is no local-only reference to forget to revert
 * — and `specs:check` fails the build if one is ever written by hand.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const STACK = join(ROOT, "stacks", "distilled-submodules");
const PACKAGES = join(ROOT, "packages");

/** Org the mirrors live in — the `distilled-submodules` stack's default. */
const MIRROR_OWNER = "distilled-mirror";

interface SpecRepo {
  readonly package: string;
  readonly mirror?: string;
  readonly blocked?: string;
}

/**
 * The stack's manifest and scaffold layout, loaded at runtime.
 *
 * The path is built rather than written as a literal so `tsc` does not pull
 * the stack — a separate TypeScript program with its own dependencies — into
 * this one. The shapes below are the contract; `pnpm --filter "./stacks/*"
 * typecheck` is what checks the other side of it.
 */
const manifestPath = join(STACK, "SpecRepos.ts");
const manifest = (await import(manifestPath)) as {
  SPEC_REPOS: readonly SpecRepo[];
  repositoryName: (specRepo: SpecRepo) => string;
  SHARED: ReadonlyArray<readonly [string, string]>;
  PER_REPO: ReadonlyArray<readonly [string, string]>;
};
const { SPEC_REPOS, repositoryName, SHARED, PER_REPO } = manifest;

const mirrorUrl = (specRepo: SpecRepo) =>
  `https://github.com/${MIRROR_OWNER}/${repositoryName(specRepo)}.git`;
/** Where the mirror is submoduled once it exists. */
const submodulePath = (specRepo: SpecRepo) =>
  `packages/${specRepo.package}/specs/${repositoryName(specRepo)}`;
/** The gitignored stand-in for that submodule. */
const localPath = (pkg: string) => join(PACKAGES, pkg, "specs", ".local");

const die = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const run = (cmd: string[], cwd: string) => {
  const result = spawnSync(cmd[0]!, cmd.slice(1), { cwd, stdio: "inherit" });
  if (result.status !== 0) {
    die(`\n${cmd.join(" ")} failed in ${cwd} (exit ${result.status})`);
  }
};

// ---------------------------------------------------------------------------
// local
// ---------------------------------------------------------------------------

/**
 * Materialise `packages/<pkg>/specs/.local` and run the mirror's fetch script
 * into it.
 *
 * The scaffold is copied from the same tables the stack commits with, and the
 * fetch script runs from `.meta` — its working directory in the mirror — so
 * its `../specs` writes land where the submodule would put them.
 */
const local = (pkg: string) => {
  const source = join(STACK, "spec-repos", pkg);
  if (!existsSync(source)) {
    const specRepo = SPEC_REPOS.find((r) => r.package === pkg);
    die(
      specRepo?.blocked !== undefined
        ? `${pkg}'s mirror is blocked: ${specRepo.blocked}`
        : `No fetch machinery for "${pkg}".\n` +
            `Create stacks/distilled-submodules/spec-repos/${pkg}/ ` +
            `(fetch-specs.ts, package.json, readme.md — copy the closest ` +
            `existing one) and add { package: "${pkg}" } to SPEC_REPOS.`,
    );
  }

  const dest = localPath(pkg);
  console.log(`📁 ${pkg} → ${dest.slice(ROOT.length + 1)}`);
  for (const [from, to] of SHARED) {
    const target = join(dest, to);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(join(STACK, "scaffold", from), target);
  }
  for (const [from, to] of PER_REPO) {
    const target = join(dest, to);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(join(source, from), target);
  }

  const meta = join(dest, ".meta");
  // The mirror's own workflow installs before every fetch; here the install is
  // the expensive part and the dependencies never change between runs, so it
  // happens once and a refetch is just the script.
  if (!existsSync(join(meta, "node_modules"))) {
    console.log(`📦 bun install (${pkg})`);
    run(["bun", "install"], meta);
  }
  console.log(`🌐 fetch-specs (${pkg})`);
  run(["bun", "run", "fetch-specs.ts"], meta);

  console.log(
    `\n✅ ${pkg}: generate against it with\n` +
      `     DISTILLED_SPECS_LOCAL=1 pnpm generate ${pkg}\n`,
  );
};

// ---------------------------------------------------------------------------
// link
// ---------------------------------------------------------------------------

/**
 * Point `.gitmodules` at the package's mirror.
 *
 * Paths and URLs come from the manifest's package and stable mirror identity.
 * When the mirror already exists the entry is made
 * the normal way, with `git submodule add`, which also records the gitlink.
 * When it does not — the usual case in a contributor's PR, since the stack
 * only creates it on merge to main — the `.gitmodules` stanza is written on
 * its own. That is inert but not useless: `git submodule` iterates gitlinks
 * in the index, so a stanza without one is skipped by `specs:sync` and by
 * every `submodule update`, and it turns into a working submodule the moment
 * someone runs this command again after the deploy.
 */
const link = (pkg: string) => {
  const specRepo = SPEC_REPOS.find((r) => r.package === pkg);
  if (!specRepo) die(`No SPEC_REPOS entry for "${pkg}".`);
  const path = submodulePath(specRepo);
  const url = mirrorUrl(specRepo);

  if (existsSync(join(ROOT, path, ".git"))) {
    console.log(`✅ ${pkg}: already submoduled at ${path}`);
    return;
  }

  // GIT_TERMINAL_PROMPT=0: a missing repository is a 404 that git answers by
  // asking for credentials, and this command's whole job is to be run before
  // the repository exists.
  const remoteExists =
    spawnSync("git", ["ls-remote", url, "HEAD"], {
      cwd: ROOT,
      stdio: "ignore",
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    }).status === 0;

  if (remoteExists && !existsSync(join(ROOT, path))) {
    console.log(`➕ git submodule add ${url} ${path}`);
    run(["git", "submodule", "add", "--depth=1", url, path], ROOT);
  } else {
    console.log(
      remoteExists
        ? `📝 ${path} exists but is not a submodule — writing .gitmodules only`
        : `📝 ${url} does not exist yet — writing .gitmodules only`,
    );
    for (const [key, value] of [
      ["path", path],
      ["url", url],
    ] as const) {
      run(["git", "config", "-f", ".gitmodules", `submodule.${path}.${key}`, value], ROOT);
    }
  }
  // Spec submodules are read-only inputs and several fetch scripts leave the
  // working tree dirty. `shallow` is what holds `specs:sync` to one commit
  // per mirror — `specs:check` rejects an entry without it, so setting it
  // here is not optional dressing.
  for (const [key, value] of [
    ["ignore", "dirty"],
    ["shallow", "true"],
  ] as const) {
    run(["git", "config", "-f", ".gitmodules", `submodule.${path}.${key}`, value], ROOT);
  }

  if (!remoteExists) {
    console.log(
      `\nℹ  ${repositoryName(specRepo)} is created by the distilled-submodules stack, ` +
        `which deploys\n   on merge to main. Until then, develop against ` +
        `\`pnpm specs:local ${pkg}\`.\n`,
    );
  }
};

// ---------------------------------------------------------------------------
// check
// ---------------------------------------------------------------------------

/**
 * The CI gate. Everything it enforces is a coherence rule between four places
 * that have to agree — the manifest, the fetch scripts, `.gitmodules`, and
 * the packages themselves — plus the one rule the local workflow needs: no
 * committed file may reference `.local`, because a package that reads from a
 * gitignored directory is a package nobody else can regenerate.
 */
/** Character classes for the string-literal grep in {@link check}. */
const QUOTE = "[\"'`]";
const NOT_QUOTE = "[^\"'`]";

const check = () => {
  const errors: string[] = [];
  const covered = new Map(SPEC_REPOS.map((r) => [r.package, r]));

  // 1. Manifest ↔ fetch scripts.
  for (const specRepo of SPEC_REPOS) {
    const dir = join(STACK, "spec-repos", specRepo.package);
    if (specRepo.blocked !== undefined) {
      if (existsSync(dir)) {
        errors.push(
          `${specRepo.package} is marked blocked but has spec-repos/${specRepo.package}/ — ` +
            `the stack skips its scaffold, so those files are never committed anywhere.`,
        );
      }
      continue;
    }
    for (const [from] of PER_REPO) {
      if (!existsSync(join(dir, from))) {
        errors.push(`spec-repos/${specRepo.package}/${from} is missing`);
      }
    }
  }
  for (const entry of readdirSync(join(STACK, "spec-repos")).sort()) {
    if (!covered.has(entry)) {
      errors.push(`spec-repos/${entry}/ has no SPEC_REPOS entry — the stack will not deploy it`);
    }
  }

  // 2. Packages ↔ manifest. Same rule the stack enforces at deploy time,
  //    checked here so a PR fails on the PR rather than on the deploy.
  for (const entry of readdirSync(PACKAGES).sort()) {
    if (covered.has(entry)) continue;
    if (existsSync(join(PACKAGES, entry, "specs"))) {
      errors.push(`packages/${entry} consumes specs but has no SPEC_REPOS entry`);
    }
  }

  // 3. `.gitmodules` ↔ the naming convention. Every mirror that has content
  //    is submoduled — a package that quietly drops back to an upstream is
  //    the regression this whole thing exists to prevent — and every entry is
  //    shallow, so `specs:sync` never fetches more than the tip commit.
  const gitmodules = readFileSync(join(ROOT, ".gitmodules"), "utf8");
  const entries = new Set(
    [...gitmodules.matchAll(/^\[submodule "([^"]+)"\]/gm)].map(([, n]) => n!),
  );
  for (const specRepo of SPEC_REPOS) {
    if (specRepo.blocked !== undefined) continue;
    const path = submodulePath(specRepo);
    if (!entries.has(path)) {
      errors.push(`.gitmodules has no entry for ${path}`);
      continue;
    }
    const shallow = spawnSync("git", ["config", "-f", ".gitmodules", `submodule.${path}.shallow`], {
      cwd: ROOT,
      encoding: "utf8",
    }).stdout?.trim();
    if (shallow !== "true") {
      errors.push(
        `.gitmodules: ${path} is not \`shallow = true\` — a full-history ` +
          `clone of a mirror defeats the point of mirroring it`,
      );
    }
  }
  const mirrors = new Map(SPEC_REPOS.map((r) => [submodulePath(r), r]));
  for (const name of entries) {
    if (!/\/specs\/spec-mirror-.+$/.test(name)) continue;
    const specRepo = mirrors.get(name);
    if (!specRepo) {
      errors.push(`.gitmodules: ${name} has no SPEC_REPOS entry`);
      continue;
    }
    const path = spawnSync("git", ["config", "-f", ".gitmodules", `submodule.${name}.path`], {
      cwd: ROOT,
      encoding: "utf8",
    }).stdout?.trim();
    if (path !== submodulePath(specRepo)) {
      errors.push(`.gitmodules: ${name} path is ${path}, expected ${submodulePath(specRepo)}`);
    }
    const url = spawnSync("git", ["config", "-f", ".gitmodules", `submodule.${name}.url`], {
      cwd: ROOT,
      encoding: "utf8",
    }).stdout?.trim();
    if (url !== mirrorUrl(specRepo)) {
      errors.push(`.gitmodules: ${name} url is ${url}, expected ${mirrorUrl(specRepo)}`);
    }
  }

  // 4. No committed file may point into `.local`. The pattern is a string
  //    literal containing the path — a spec path, in other words. Prose about
  //    the local workflow is not the problem and there is a lot of it; a
  //    package silently reading from a gitignored directory is.
  const tracked = spawnSync(
    "git",
    [
      "grep",
      "-nE",
      // A quote, then anything but a quote, then the path: a string literal.
      `${QUOTE}${NOT_QUOTE}*specs/\\.local`,
      "--",
      "packages",
      "scripts",
      "stacks",
    ],
    { cwd: ROOT, encoding: "utf8" },
  );
  for (const line of (tracked.stdout ?? "").split("\n")) {
    if (line.trim() === "") continue;
    const [file, , ...rest] = line.split(":");
    // Prose, not a path. The workflow is documented in several files and the
    // documentation quotes the directory; only code can actually read from it.
    const code = rest.join(":").trim();
    if (code.startsWith("*") || code.startsWith("//") || code.startsWith("/*")) {
      continue;
    }
    // The resolver and this script are where the string is defined; every
    // other mention is a package reading specs from a gitignored directory.
    if (file === "packages/core/src/codegen/spec-path.ts" || file === "scripts/specs.ts") {
      continue;
    }
    errors.push(
      `${line} references specs/.local — that directory is gitignored, so ` +
        `nobody else can regenerate this package. Use ` +
        `\`DISTILLED_SPECS_LOCAL=1 pnpm generate <pkg>\` instead.`,
    );
  }

  if (errors.length > 0) {
    console.error(`❌ ${errors.length} problem(s):\n`);
    for (const error of errors) console.error(`  • ${error}`);
    process.exit(1);
  }
  console.log(
    `✅ ${SPEC_REPOS.length} mirrors coherent across SPEC_REPOS, spec-repos/, ` +
      `.gitmodules and packages/`,
  );
};

// ---------------------------------------------------------------------------

const [command, ...args] = process.argv.slice(2);
const packages = () => (args.length > 0 ? args : die("usage: specs.ts <local|link> <package>..."));

switch (command) {
  case "local":
    for (const pkg of packages()) local(pkg);
    break;
  case "link":
    for (const pkg of packages()) link(pkg);
    break;
  case "check":
    check();
    break;
  default:
    die("usage: specs.ts <local|link|check> [package...]");
}
