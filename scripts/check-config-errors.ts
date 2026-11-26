// Checks AGENTS.md rule 18: `ConfigError` is a setup error. A layer reads and
// checks its configuration when it is built, so no operation fails with
// `ConfigError` for a missing or malformed configured value.
//
// For every SDK it asks the compiler one question: can an operation fail with
// core `ConfigError`? The answer comes from the SDK's shared operation error
// type (`<Sdk>OpError`), which holds what the protocol and the credentials
// service fail with. The list below names the SDKs where the answer may be
// yes, each with its reason. Anything else fails this check, and so does a
// list entry that is no longer needed.
//
// Fix: make the layer a `Layer.effect` that reads and checks when it is
// built (see packages/neon/src/credentials.ts), and take `ConfigError` out of
// the `Credentials` service's effect.
//
// Usage: node scripts/check-config-errors.ts
import { execFile } from "node:child_process";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Command } from "effect/cli";
import * as Console from "effect/Console";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

class ConfigErrorOnCall extends Data.TaggedError("ConfigErrorOnCall")<{
  readonly message: string;
}> {}

/**
 * SDKs whose operations may fail with `ConfigError`, each with the reason: a
 * value that only some operations need, which the configuration may lack.
 * Do not add an SDK here for a value its layer could check when it is built,
 * or for a request its credentials make at run time (that fails with the
 * SDK's own class, such as `TokenRequestFailed`).
 */
const ON_CALL: Record<string, string> = {
  azure: "an operation that needs a subscription, when the credentials have none",
  convex: "an API that needs a token or a deployment URL, when the credentials have none",
  daytona: "a toolbox call, when the credentials name no sandbox",
  e2b: "an envd call with no sandbox connection, a volume call with no volume connection",
  s2: "a stream operation, when the credentials have no basin",
  unifi: "a console-hosted call with no console, from the call or a Console layer",
};

/**
 * The type to ask about, for an SDK with no `<Sdk>OpError`: an error union,
 * or a service whose value is the effect that resolves the credentials.
 */
const OTHER_TYPES: Record<string, { file: string; name: string; kind: "union" | "service" }> = {
  aws: { file: "errors.ts", name: "CommonErrors", kind: "union" },
  s3: { file: "errors.ts", name: "CommonErrors", kind: "union" },
  "expo-eas": { file: "credentials.ts", name: "Credentials", kind: "service" },
  linear: { file: "credentials.ts", name: "Credentials", kind: "service" },
  railway: { file: "credentials.ts", name: "Credentials", kind: "service" },
};

/** Packages that are not SDKs. */
const NOT_SDKS = new Set(["aws4signer", "core", "dev"]);

interface Probe {
  readonly pkg: string;
  readonly file: string;
  readonly name: string;
  readonly kind: "union" | "service";
}

const run = (file: string, args: ReadonlyArray<string>, cwd: string) =>
  Effect.callback<string>((resume) => {
    execFile(file, [...args], { cwd, maxBuffer: 64 * 1024 * 1024 }, (_error, stdout, stderr) => {
      // tsrs exits with 2 when it reports errors; the output is the result.
      resume(Effect.succeed(`${stdout}${stderr}`));
    });
  });

const command = Command.make(
  "check-config-errors",
  {},
  Effect.fn(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = path.resolve(import.meta.dirname, "..");
    const packages = path.join(root, "packages");

    const problems: string[] = [];
    const probes: Probe[] = [];
    for (const pkg of (yield* fs.readDirectory(packages)).sort()) {
      if (NOT_SDKS.has(pkg)) continue;
      const src = path.join(packages, pkg, "src");
      if (!(yield* fs.exists(src))) continue;
      const other = OTHER_TYPES[pkg];
      if (other !== undefined) {
        probes.push({ pkg, ...other });
        continue;
      }
      let found = false;
      for (const file of (yield* fs.readDirectory(src)).sort()) {
        if (!file.endsWith(".ts")) continue;
        const text = yield* fs.readFileString(path.join(src, file));
        for (const match of text.matchAll(/^export type (\w+OpError)\b/gm)) {
          probes.push({ pkg, file, name: match[1]!, kind: "union" });
          found = true;
        }
      }
      if (!found) {
        problems.push(
          `packages/${pkg}: no <Sdk>OpError type in src/*.ts. Export one from src/protocol.ts, or name the type to check in OTHER_TYPES in scripts/check-config-errors.ts`,
        );
      }
    }

    const allowed = (pkg: string) => pkg in ON_CALL;
    for (const pkg of Object.keys(ON_CALL)) {
      if (!probes.some((probe) => probe.pkg === pkg)) {
        problems.push(`scripts/check-config-errors.ts lists ${pkg}, which is not an SDK package`);
      }
    }

    // One line per probe: it compiles only when the compiler's answer is the
    // expected one, so each error names a probe by its line.
    const dir = path.join(root, "node_modules", ".cache", "check-config-errors");
    yield* fs.makeDirectory(dir, { recursive: true });
    const header = [
      'import type { ConfigError } from "../../../packages/core/src/config.ts";',
      'import type * as Effect from "effect/Effect";',
      'type Has<E> = unknown extends E ? "any" : [ConfigError] extends [E] ? "yes" : "no";',
      "type ErrorOf<S> = S extends { readonly Service: Effect.Effect<any, infer E, any> } ? E : unknown;",
    ];
    const lines = probes.map((probe, i) => {
      const from = `../../../packages/${probe.pkg}/src/${probe.file}`;
      const type =
        probe.kind === "union"
          ? `import("${from}").${probe.name}`
          : `ErrorOf<typeof import("${from}").${probe.name}>`;
      return `export const p${i}: Has<${type}> = "${allowed(probe.pkg) ? "yes" : "no"}";`;
    });
    yield* fs.writeFileString(path.join(dir, "probe.ts"), [...header, ...lines, ""].join("\n"));
    yield* fs.writeFileString(
      path.join(dir, "tsconfig.json"),
      JSON.stringify({
        extends: "../../../tsconfig.base.json",
        compilerOptions: {
          noCheck: false,
          noEmit: true,
          composite: false,
          incremental: false,
          skipLibCheck: true,
          customConditions: ["bun"],
        },
        // `include` skips node_modules, where this directory is.
        files: ["probe.ts"],
      }),
    );
    const output = yield* run(
      path.join(root, "node_modules", ".bin", "tsrs"),
      ["-p", "tsconfig.json"],
      dir,
    );

    const failed = new Map<number, string>();
    const unexpected: string[] = [];
    for (const line of output.split("\n")) {
      if (line.trim() === "") continue;
      const match =
        /^probe\.ts\((\d+),\d+\): error TS2322: Type '"(yes|no)"' is not assignable to type '"(yes|no|any)"'/.exec(
          line,
        );
      if (match === null) unexpected.push(line);
      else failed.set(Number(match[1]) - header.length - 1, match[3]!);
    }
    if (unexpected.length > 0) {
      for (const line of unexpected) yield* Console.error(line);
      return yield* new ConfigErrorOnCall({
        message: "The compiler could not answer; its output is above.",
      });
    }

    // An SDK can have several error types (fly-io has two). It is on the
    // list while any of them holds ConfigError.
    const answers = new Map<string, Array<{ probe: Probe; answer: "yes" | "no" | "any" }>>();
    probes.forEach((probe, index) => {
      const expected = allowed(probe.pkg) ? "yes" : "no";
      const answer = (failed.get(index) ?? expected) as "yes" | "no" | "any";
      answers.set(probe.pkg, [...(answers.get(probe.pkg) ?? []), { probe, answer }]);
    });
    for (const [pkg, results] of answers) {
      for (const { probe, answer } of results) {
        const where = `packages/${pkg}/src/${probe.file} ${probe.name}`;
        if (answer === "any") {
          problems.push(`${where}: its error type is any or unknown, so the check can't read it`);
        } else if (answer === "yes" && !allowed(pkg)) {
          problems.push(
            `${where}: an operation can fail with ConfigError. Read and check the configuration when the layer is built (AGENTS.md rule 18)`,
          );
        }
      }
      if (allowed(pkg) && results.every(({ answer }) => answer === "no")) {
        problems.push(
          `packages/${pkg}: no operation fails with ConfigError any more. Remove ${pkg} from ON_CALL in scripts/check-config-errors.ts`,
        );
      }
    }

    if (problems.length > 0) {
      for (const p of problems) yield* Console.error(`✗ ${p}`);
      return yield* new ConfigErrorOnCall({
        message: `${problems.length} problem(s). ConfigError is a setup error: see AGENTS.md rule 18.`,
      });
    }
    yield* Console.log(
      `Checked ${probes.length} error types of ${answers.size} SDKs: ${Object.keys(ON_CALL).length} SDKs may fail a call with ConfigError, each for a listed reason`,
    );
  }),
).pipe(Command.withDescription("Check that no operation fails with ConfigError for its setup"));

Command.run(command, { version: "0.0.0" }).pipe(
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
