/**
 * Picks an `effect` version from the catalog's peer range and pins the
 * workspace to it, for the Compatibility workflow.
 *
 *   node scripts/compat/effect-version.ts lowest|latest [--write]
 *
 * `lowest` is the range's floor (`^4.1.2` -> 4.1.2). `latest` is the newest
 * stable release in the range that is older than the workspace's minimum
 * release age (1 day), so `pnpm install` accepts it. `--write` adds
 * `overrides` for `effect` and `@effect/platform-node` (released in step
 * with it) to pnpm-workspace.yaml; then run `pnpm install
 * --no-frozen-lockfile`. Prints the version.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const WORKSPACE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../pnpm-workspace.yaml",
);
const MIN_RELEASE_AGE_MS = 24 * 60 * 60 * 1000;

const [which, ...flags] = process.argv.slice(2);
if (which !== "lowest" && which !== "latest") {
  console.error("usage: node scripts/compat/effect-version.ts lowest|latest [--write]");
  process.exit(2);
}

const yaml = fs.readFileSync(WORKSPACE, "utf8");
const range = /^ {2}effect: "\^(\d+)\.(\d+)\.(\d+)"$/m.exec(yaml);
if (!range) {
  console.error('pnpm-workspace.yaml: no catalog entry `effect: "^x.y.z"`');
  process.exit(1);
}
const floor = range.slice(1, 4).map(Number) as [number, number, number];

const parse = (v: string) => {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v);
  return m ? (m.slice(1, 4).map(Number) as [number, number, number]) : undefined;
};
const compare = (a: readonly number[], b: readonly number[]) =>
  a[0]! - b[0]! || a[1]! - b[1]! || a[2]! - b[2]!;

const released = async (name: string) => {
  const res = await fetch(`https://registry.npmjs.org/${name.replace("/", "%2F")}`);
  if (!res.ok) throw new Error(`npm registry: ${name}: HTTP ${res.status}`);
  return ((await res.json()) as { time: Record<string, string> }).time;
};

let version = floor.join(".");
if (which === "latest") {
  const [effect, platform] = await Promise.all([
    released("effect"),
    released("@effect/platform-node"),
  ]);
  const cutoff = Date.now() - MIN_RELEASE_AGE_MS;
  const candidates = Object.entries(effect)
    .flatMap(([v, at]) => {
      const p = parse(v);
      return p && p[0] === floor[0] && compare(p, floor) >= 0 && Date.parse(at) < cutoff
        ? [{ v, p }]
        : [];
    })
    .filter(({ v }) => v in platform)
    .sort((a, b) => compare(a.p, b.p));
  version = candidates.at(-1)?.v ?? version;
}

if (flags.includes("--write")) {
  if (!/^overrides:$/m.test(yaml)) {
    console.error("pnpm-workspace.yaml: no `overrides:` block");
    process.exit(1);
  }
  fs.writeFileSync(
    WORKSPACE,
    yaml.replace(
      /^overrides:$/m,
      `overrides:\n  effect: "${version}"\n  "@effect/platform-node": "${version}"`,
    ),
  );
}
console.log(version);
