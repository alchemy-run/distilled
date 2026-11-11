// Checks the publishable workspace packages before a release, and in CI: the
// packages (`packages/*`) share one version, because they are released in
// lockstep and `scripts/release/prepare.ts` bumps from that version.
//
// Usage: node scripts/validate-publish-packages.ts
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Command } from "effect/cli";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import * as Path from "effect/Path";
import { publishablePackages, sharedVersion } from "./package-manifest.ts";

const command = Command.make(
  "validate-publish-packages",
  {},
  Effect.fn(function* () {
    const path = yield* Path.Path;
    const root = path.resolve(import.meta.dirname, "..");

    const packages = yield* publishablePackages(root, "packages");
    const version = yield* sharedVersion(packages);
    yield* Console.log(`Validated ${packages.length} packages at ${version}`);
  }),
).pipe(Command.withDescription("Check that the packages share one version"));

Command.run(command, { version: "0.0.0" }).pipe(
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
