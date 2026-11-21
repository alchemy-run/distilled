import { availableParallelism } from "node:os";
// Installs the release tarballs into a scratch project, the way an app
// installs them from npm, then imports every entry of each package's
// `exports` under Node's default conditions and checks that its `types` file
// exists. release.yml runs it after packing, before anything is committed or
// published.
//
// The scratch project depends on every tarball, and npm `overrides` point the
// packages' dependencies on each other (such as each SDK's exact dependency
// on the unreleased `@distilled.cloud/core`) at those tarballs. npm installs `effect`, the packages' peer dependency, at the newest
// version in range. A `*` entry is expanded to every file its target matches.
// Each package is imported in its own Node process.
//
// Usage: node scripts/release/smoke.ts [--dir release-packages]
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Command, Flag } from "effect/cli";
import * as Console from "effect/Console";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { ChildProcess } from "effect/process";
import { ChildProcessSpawner } from "effect/process/ChildProcessSpawner";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";

export class NoTarballs extends Data.TaggedError("NoTarballs")<{
  readonly message: string;
  readonly dir: string;
}> {}

export class UnreadableTarball extends Data.TaggedError("UnreadableTarball")<{
  readonly message: string;
  readonly tarball: string;
}> {}

export class InstallFailed extends Data.TaggedError("InstallFailed")<{
  readonly message: string;
  readonly exitCode: number;
}> {}

export class SmokeFailed extends Data.TaggedError("SmokeFailed")<{
  readonly message: string;
  readonly failures: ReadonlyArray<string>;
}> {}

/** Conditions Node matches for `import` from an ES module, besides `default`. */
const NODE_CONDITIONS = new Set(["node", "import", "module-sync", "default"]);

type Target = string | null | { readonly [condition: string]: Target } | ReadonlyArray<Target>;

const Manifest = Schema.Struct({
  name: Schema.String,
  exports: Schema.optionalKey(Schema.Record(Schema.String, Schema.Unknown)),
});
const decodeManifest = Schema.decodeUnknownEffect(Schema.fromJsonString(Manifest));

/** The file `target` names under `conditions`, as Node picks it: first matching key wins. */
const resolveTarget = (target: Target, conditions: ReadonlySet<string>): string | undefined => {
  if (typeof target === "string") return target;
  if (target === null) return undefined;
  if (Array.isArray(target)) {
    for (const item of target as ReadonlyArray<Target>) {
      const resolved = resolveTarget(item, conditions);
      if (resolved !== undefined) return resolved;
    }
    return undefined;
  }
  for (const [key, value] of Object.entries(target)) {
    if (!conditions.has(key)) continue;
    const resolved = resolveTarget(value, conditions);
    if (resolved !== undefined) return resolved;
  }
  return undefined;
};

/** The `exports` key Node uses for `subpath`: an exact key, else the longest `*` prefix. */
const matchKey = (keys: ReadonlyArray<string>, subpath: string) => {
  if (keys.includes(subpath)) return { key: subpath, star: undefined };
  let best: { key: string; star: string } | undefined;
  for (const key of keys) {
    const star = key.indexOf("*");
    if (star === -1) continue;
    const prefix = key.slice(0, star);
    const suffix = key.slice(star + 1);
    if (
      subpath.length >= key.length - 1 &&
      subpath.startsWith(prefix) &&
      subpath.endsWith(suffix) &&
      (!best || prefix.length > best.key.indexOf("*"))
    ) {
      best = { key, star: subpath.slice(prefix.length, subpath.length - suffix.length) };
    }
  }
  return best;
};

interface Entry {
  readonly specifier: string;
  /** Package-relative `types` file, if the entry has one. */
  readonly types: string | undefined;
}

/** Every subpath `exports` makes importable under Node's default conditions. */
const entriesOf = Effect.fn(function* (
  pkgDir: string,
  name: string,
  exports: Record<string, unknown>,
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const keys = Object.keys(exports);

  const subpaths = new Set<string>();
  for (const key of keys) {
    const target = resolveTarget(exports[key] as Target, NODE_CONDITIONS);
    if (target === undefined) continue;
    const star = key.indexOf("*");
    if (star === -1) {
      subpaths.add(key);
      continue;
    }
    // Expand `./x/*` -> `./lib/x/*.js` to the files the target matches.
    const [targetPrefix = "", targetSuffix = ""] = target.split("*");
    const base = path.join(pkgDir, targetPrefix);
    const listDir = targetPrefix.endsWith("/") ? base : path.dirname(base);
    if (!(yield* fs.exists(listDir))) continue;
    for (const file of yield* fs.readDirectory(listDir, { recursive: true })) {
      const relative = path.relative(pkgDir, path.join(listDir, file)).split(path.sep).join("/");
      const full = `./${relative}`;
      if (!full.startsWith(targetPrefix) || !full.endsWith(targetSuffix)) continue;
      const value = full.slice(targetPrefix.length, full.length - targetSuffix.length);
      subpaths.add(`${key.slice(0, star)}${value}${key.slice(star + 1)}`);
    }
  }

  const entries: Array<Entry> = [];
  for (const subpath of [...subpaths].sort()) {
    const match = matchKey(keys, subpath);
    if (!match) continue;
    const types = resolveTarget(exports[match.key] as Target, new Set(["types"]));
    entries.push({
      specifier: subpath === "." ? name : `${name}${subpath.slice(1)}`,
      types: types && match.star !== undefined ? types.replaceAll("*", match.star) : types,
    });
  }
  return entries;
});

/** Runs a command in `cwd`; stdout is captured, stderr goes to the job log. */
const run = Effect.fn(function* (command: string, args: ReadonlyArray<string>, cwd: string) {
  const spawner = yield* ChildProcessSpawner;
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const handle = yield* spawner.spawn(
        ChildProcess.make(command, [...args], { cwd, stdout: "pipe", stderr: "inherit" }),
      );
      const [stdout, exitCode] = yield* Effect.all(
        [handle.stdout.pipe(Stream.decodeText(), Stream.mkString), handle.exitCode],
        { concurrency: "unbounded" },
      );
      return { exitCode: Number(exitCode), stdout: stdout.trim() };
    }),
  );
});

/** The package name in the tarball's `package/package.json`. */
const nameOf = Effect.fn(function* (tarball: string) {
  const { exitCode, stdout } = yield* run("tar", ["-xOzf", tarball, "package/package.json"], ".");
  if (exitCode !== 0) {
    return yield* new UnreadableTarball({
      message: `${tarball}: cannot read package/package.json`,
      tarball,
    });
  }
  return (yield* decodeManifest(stdout)).name;
});

// Imports each specifier in the list file (argv[1]); prints one line per failure.
const IMPORT_ALL = `
const specifiers = JSON.parse(await import("node:fs").then((fs) => fs.readFileSync(process.argv[1], "utf8")));
for (const specifier of specifiers) {
  try {
    await import(specifier);
  } catch (error) {
    console.log(specifier + ": " + String(error && error.message ? error.message : error).split("\\n")[0]);
  }
}
`;

const smokePackage = Effect.fn(function* (scratch: string, name: string) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const pkgDir = path.join(scratch, "node_modules", name);
  const manifest = yield* decodeManifest(
    yield* fs.readFileString(path.join(pkgDir, "package.json")),
  );
  const entries = yield* entriesOf(pkgDir, name, manifest.exports ?? {});

  const failures: Array<string> = [];
  for (const entry of entries) {
    if (entry.types !== undefined && !(yield* fs.exists(path.join(pkgDir, entry.types)))) {
      failures.push(`${entry.specifier}: types file ${entry.types} is missing`);
    }
  }

  const list = path.join(scratch, `${name.replace("/", "__")}.json`);
  yield* fs.writeFileString(list, JSON.stringify(entries.map((entry) => entry.specifier)));
  const imported = yield* run("node", ["--input-type=module", "--eval", IMPORT_ALL, list], scratch);
  if (imported.stdout !== "") failures.push(...imported.stdout.split("\n"));
  if (imported.exitCode !== 0)
    failures.push(`${name}: import process exited with ${imported.exitCode}`);

  yield* Console.log(
    `- ${name}: ${entries.length} entries, ${failures.length === 0 ? "ok" : `${failures.length} failed`}`,
  );
  return failures;
});

const command = Command.make(
  "smoke",
  {
    dir: Flag.String("dir").pipe(
      Flag.withDescription("Directory holding the release tarballs"),
      Flag.withDefault("release-packages"),
    ),
  },
  Effect.fn(function* ({ dir }) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const tarballs = (yield* fs.readDirectory(dir))
      .filter((file) => file.endsWith(".tgz"))
      .sort()
      .map((file) => path.resolve(dir, file));
    if (tarballs.length === 0) {
      return yield* new NoTarballs({ message: `No tarballs in ${dir}`, dir });
    }

    const dependencies: Record<string, string> = {};
    for (const tarball of tarballs) {
      dependencies[yield* nameOf(tarball)] = `file:${tarball}`;
    }
    const names = Object.keys(dependencies).sort();

    const scratch = yield* fs.makeTempDirectoryScoped({ prefix: "distilled-smoke-" });
    yield* fs.writeFileString(
      path.join(scratch, "package.json"),
      `${JSON.stringify(
        {
          name: "distilled-release-smoke",
          private: true,
          type: "module",
          dependencies,
          // `$<name>` points the packages' own dependencies on each other
          // (exact versions that are not on npm yet) at the same tarballs.
          overrides: Object.fromEntries(names.map((name) => [name, `$${name}`])),
        },
        null,
        2,
      )}\n`,
    );
    yield* Console.log(`Installing ${tarballs.length} tarball(s) into ${scratch}`);
    const installed = yield* run(
      "npm",
      ["install", "--no-audit", "--no-fund", "--ignore-scripts", "--loglevel=error"],
      scratch,
    );
    if (installed.exitCode !== 0) {
      return yield* new InstallFailed({
        message: `npm install exited with code ${installed.exitCode}`,
        exitCode: installed.exitCode,
      });
    }

    yield* Console.log(`Importing every export of ${names.length} package(s):`);
    const failures = (yield* Effect.forEach(names, (name) => smokePackage(scratch, name), {
      concurrency: availableParallelism(),
    })).flat();

    if (failures.length > 0) {
      yield* Console.error(failures.join("\n"));
      return yield* new SmokeFailed({
        message: `${failures.length} export entr${failures.length === 1 ? "y" : "ies"} failed`,
        failures,
      });
    }
    yield* Console.log("Every export imported");
  }, Effect.scoped),
).pipe(Command.withDescription("Install the release tarballs and import every export"));

Command.run(command, { version: "0.0.0" }).pipe(
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
