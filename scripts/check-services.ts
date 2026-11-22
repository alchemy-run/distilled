// Checks that every generated service module is one the generator still
// writes. A full `pnpm generate` rewrites `src/services/index.ts` (and GCP's
// `src/unstable-services/index.ts`) from exactly the models it generated, so a
// module the spec dropped falls out of the barrel. Its file used to stay on
// disk: frozen, never regenerated, still importable through the `./*` export.
// This fails on such a file, and on a barrel entry whose file is missing. It
// needs no specs, so it runs on every PR.
//
// Fix: delete the file (a full `pnpm generate <pkg>` now deletes it too).
//
// Usage: node scripts/check-services.ts
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Command } from "effect/cli";
import * as Console from "effect/Console";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

class StaleServices extends Data.TaggedError("StaleServices")<{
  readonly message: string;
}> {}

/** Generated module directories under each package. */
const SERVICE_DIRS = ["src/services", "src/unstable-services"] as const;

const command = Command.make(
  "check-services",
  {},
  Effect.fn(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = path.resolve(import.meta.dirname, "..");
    const packages = path.join(root, "packages");

    const problems: string[] = [];
    let checked = 0;
    for (const pkg of (yield* fs.readDirectory(packages)).sort()) {
      for (const sub of SERVICE_DIRS) {
        const dir = path.join(packages, pkg, sub);
        const barrel = path.join(dir, "index.ts");
        // A directory with no barrel (s3's, the target of AWS's relocate)
        // is not a generator output directory.
        if (!(yield* fs.exists(barrel))) continue;
        checked++;
        const exported = new Set(
          [...(yield* fs.readFileString(barrel)).matchAll(/from "\.\/([^"]+)\.ts";/g)].map(
            (m) => m[1]!,
          ),
        );
        const files = (yield* fs.readDirectory(dir))
          .filter((f) => f.endsWith(".ts") && f !== "index.ts")
          .map((f) => f.slice(0, -".ts".length));
        const rel = `packages/${pkg}/${sub}`;
        for (const name of files.sort()) {
          if (!exported.has(name)) {
            problems.push(`${rel}/${name}.ts: no longer generated (missing from index.ts)`);
          }
        }
        const present = new Set(files);
        for (const name of [...exported].sort()) {
          if (!present.has(name))
            problems.push(`${rel}/index.ts: exports ./${name}.ts, which does not exist`);
        }
      }
    }

    if (problems.length > 0) {
      for (const p of problems) yield* Console.error(`✗ ${p}`);
      return yield* new StaleServices({
        message:
          `${problems.length} service module(s) out of step with their barrel. ` +
          "Delete a module the generator no longer writes (a full `pnpm generate <pkg>` does it).",
      });
    }
    yield* Console.log(`Checked ${checked} generated service directories`);
  }),
).pipe(Command.withDescription("Check that every generated service module is still in its barrel"));

Command.run(command, { version: "0.0.0" }).pipe(
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
