/**
 * The generic generator CLI harness (dev-time only).
 *
 * Owns the smithy→SDK pipeline every SDK package shares: run the package's
 * convert in-process with its models kept in memory (see `./models.ts`),
 * add any hand-authored manual specs, compile each model through
 * {@link generateService} with the provider's {@link SdkSpec}, write the
 * service modules and the namespaced barrel. Convert applies the patches
 * (see `codegen/patches`), so the models generate compiles are patched.
 *
 * A provider's `scripts/generate.ts` is: trait consts + an SdkSpec + a
 * `runGeneratorCli` call.
 */
import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Effect, Option } from "effect";
import { Flag } from "effect/cli";
import { Command } from "effect/cli";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { chunkSchemas } from "./chunk.ts";
import { dedupeSchemas } from "./dedupe.ts";
import { barrel } from "./emit.ts";
import { formatGenerated } from "./format.ts";
import { stampGeneratedAt } from "./generated-at.ts";
import { generateService, type SdkSpec } from "./generator.ts";
import { toLatin1 } from "./latin1.ts";
import { collectModels } from "./models.ts";
import { privatizeSchemas, typeOnlyNamespaceImports } from "./privatize.ts";
import { annotateNestedCalls } from "./pure.ts";
import { tableSchemas } from "./table.ts";

/** One directory of converted models, compiled into one output directory. */
export interface GeneratorTarget {
  /** The directory convert writes the models to, relative to root. */
  readonly smithyDir: string;
  /** Output directory for the service modules, relative to root. */
  readonly outDir: string;
}

export interface GeneratorCliOptions {
  /** Command description shown in --help. */
  readonly description: string;
  /** Absolute package root (usually `path.resolve(import.meta.dirname, "..")`). */
  readonly root: string;
  /**
   * Run the package's convert — usually `() => import("./convert.ts")`.
   * Its models are collected in memory and never written to disk.
   * `resource` is the `--resource` filter ("" for all), for a convert that
   * can skip the rest.
   */
  readonly convert: (ctx: { readonly resource: string }) => unknown;
  /**
   * The directory convert writes the models to compile, relative to root.
   * Default `.generated-specs`. Ignored when `targets` is set.
   */
  readonly smithyDir?: string;
  /**
   * Output directory (relative to root). Default `src/services`. Ignored
   * when `targets` is set.
   */
  readonly outDir?: string;
  /**
   * Several model directories, each compiled into its own output directory,
   * from ONE convert — instead of `smithyDir`/`outDir`. GCP compiles
   * `.generated-specs/stable` into `src/services` and
   * `.generated-specs/unstable` into `src/unstable-services`. `--smithy` or
   * `--out` on the command line selects a single target instead.
   */
  readonly targets?: ReadonlyArray<GeneratorTarget>;
  /** Model files to skip (e.g. a shared protocols model). */
  readonly excludeModel?: (file: string) => boolean;
  /**
   * Side effects to run before generating — e.g. AWS copies `partitions.json`
   * out of the smithy submodule, runtime data its endpoint resolver reads.
   */
  readonly prepare?: (ctx: {
    readonly root: string;
    readonly outDir: string;
  }) => Effect.Effect<void, never, FileSystem.FileSystem | Path.Path>;
  /**
   * The output module's name, when it isn't the model's filename. AWS names
   * modules after the service's `aws.api#service` sdkId (`amazon-s3.json` →
   * `s3.ts`), so the public surface reads `AWS.S3.getObject`.
   */
  readonly resourceName?: (ctx: { readonly model: any; readonly file: string }) => string;
  /** Barrel export name for a resource. Default: the resource name itself. */
  readonly barrelExportName?: (resource: string) => string;
  /**
   * The closing pass over the output directory. Defaults to formatting;
   * AWS lint-fixes first (see `codegen/format.ts`).
   */
  readonly finalize?: (dir: string) => Effect.Effect<void>;
  /**
   * Keep generating after a model fails, instead of stopping at the first.
   * AWS compiles 430 services in one run, and one broken model shouldn't
   * hide the state of the other 429. The run still FAILS at the end — the
   * failures are reported together rather than swallowed.
   */
  readonly continueOnModelError?: boolean;
  /** Directory of hand-authored models merged after the generated ones. */
  readonly manualSpecsDir?: string;
  /**
   * Generate never applies patches: convert does, so the models it hands
   * generate are patched. Only `false` is accepted so a path is a type
   * error rather than a silently ignored setting.
   */
  readonly patchesDir?: false;
  /**
   * Model transform applied before generation (e.g. AWS dropping
   * unreachable foreign-namespace shapes from a vendored model). Applies
   * to generate's copy only — convert owns the model.
   */
  readonly transformModel?: (model: any, resource: string) => string | void;
  /** The provider spec — built per model (metadata may vary per model). */
  readonly spec: (model: any) => SdkSpec;
}

/** Run the generator CLI (NodeRuntime main — call at module top level). */
export const runGeneratorCli = (options: GeneratorCliOptions): void => {
  const defaultTarget: GeneratorTarget = options.targets?.[0] ?? {
    smithyDir: options.smithyDir ?? ".generated-specs",
    outDir: options.outDir ?? "src/services",
  };
  const command = Command.make(
    "generate",
    {
      smithy: Flag.String("smithy").pipe(
        Flag.optional,
        Flag.withDescription(
          `Directory convert writes the models to compile to (default: ${defaultTarget.smithyDir})`,
        ),
      ),
      out: Flag.String("out").pipe(
        Flag.optional,
        Flag.withDescription(
          `Output directory for generated service modules (default: ${defaultTarget.outDir})`,
        ),
      ),
      resource: Flag.String("resource").pipe(
        Flag.withDefault(""),
        Flag.withDescription("Only generate this resource (e.g. ai)"),
      ),
    },
    (config) =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = options.root;
        // `--smithy`/`--out` select one target; otherwise every target.
        const targets =
          Option.isSome(config.smithy) || Option.isSome(config.out)
            ? [
                {
                  smithyDir: Option.getOrElse(config.smithy, () => defaultTarget.smithyDir),
                  outDir: Option.getOrElse(config.out, () => defaultTarget.outDir),
                },
              ]
            : (options.targets ?? [defaultTarget]);

        yield* Console.log("⚙️  generate");
        for (const target of targets) {
          yield* Console.log(`   Smithy: ${path.resolve(root, target.smithyDir)}`);
          yield* Console.log(`   Output: ${path.resolve(root, target.outDir)}`);
        }

        for (const target of targets) {
          yield* (
            options.prepare?.({ root, outDir: path.resolve(root, target.outDir) }) ?? Effect.void
          );
        }

        // Convert in-process, once for every target: the models stay in
        // memory. Each model's text is dropped once it is parsed, and models
        // outside every target right away, so the heap does not keep every
        // model's text for the whole run (GCP's is ~180 MB).
        const converted = new Map(
          yield* Effect.promise(() =>
            collectModels(() => options.convert({ resource: config.resource })),
          ),
        );
        const targetDirs = new Set(targets.map((t) => path.resolve(root, t.smithyDir)));
        for (const file of converted.keys()) {
          if (!targetDirs.has(path.dirname(file))) converted.delete(file);
        }

        const failedModels: string[] = [];
        for (const target of targets) {
          const smithyDir = path.resolve(root, target.smithyDir);
          const outDir = path.resolve(root, target.outDir);

          // This target's models, then the optional manual-specs (hand-authored
          // models for APIs the provider's spec source doesn't cover). A manual
          // model must not shadow a generated one.
          const generated: { file: string; dir: string }[] = [];
          for (const file of converted.keys()) {
            if (path.dirname(file) !== smithyDir) continue;
            const name = path.basename(file);
            if (options.excludeModel?.(name) ?? false) continue;
            generated.push({ file: name, dir: smithyDir });
          }
          const manualDir = options.manualSpecsDir
            ? path.resolve(root, options.manualSpecsDir)
            : undefined;
          const manual =
            manualDir && (yield* fs.exists(manualDir))
              ? (yield* fs.readDirectory(manualDir))
                  .filter((f) => f.endsWith(".json"))
                  .map((f) => ({ file: f, dir: manualDir }))
              : [];
          for (const m of manual) {
            if (generated.some((g) => g.file === m.file)) {
              return yield* Effect.die(
                new Error(
                  `${options.manualSpecsDir}/${m.file} shadows a generated model — rename or delete it`,
                ),
              );
            }
          }
          const entries = [...generated, ...manual].sort((a, b) => a.file.localeCompare(b.file));
          if (entries.length === 0) {
            return yield* Effect.die(
              new Error(`convert wrote no models to ${path.relative(root, smithyDir)}`),
            );
          }

          yield* fs.makeDirectory(outDir, { recursive: true });

          const written: string[] = [];
          let totalOps = 0;

          for (const { file, dir } of entries) {
            const modelPath = path.join(dir, file);
            const text = converted.get(modelPath) ?? (yield* fs.readFileString(modelPath));
            converted.delete(modelPath);
            const model = JSON.parse(text);
            // The module's name — the model's filename unless the provider
            // derives it from the model itself (AWS: the service's sdkId).
            const resource = options.resourceName?.({ model, file }) ?? file.replace(/\.json$/, "");
            if (config.resource && resource !== config.resource) continue;

            if (options.transformModel) {
              const note = options.transformModel(model, resource);
              if (note) yield* Console.log(`   ${note}`);
            }

            // `generateService` and the provider spec are synchronous and
            // throw; with continueOnModelError the throw is recorded and the
            // run moves on, so one broken model doesn't hide the state of
            // every model after it. The run still fails at the end.
            let generated;
            try {
              generated = generateService(model, options.spec(model));
            } catch (e) {
              if (!options.continueOnModelError) throw e;
              failedModels.push(`${resource}: ${e instanceof Error ? e.message : String(e)}`);
              yield* Console.error(`❌ ${resource}`);
              continue;
            }
            const { operations } = generated;
            if (operations === 0) continue;
            // Every nested call in a top-level initializer gets a PURE marker,
            // so one unused schema cannot pin others in a consumer's bundle.
            // Latin-1-only source halves the heap V8 keeps for the module text.
            // Structurally identical schemas become aliases of one schema, and
            // schema consts become module-private (types stay exported).
            const resourceFile = `${resource}.ts`;
            const marked = annotateNestedCalls(generated.code, resourceFile);
            const code = toLatin1(
              typeOnlyNamespaceImports(
                tableSchemas(
                  chunkSchemas(
                    privatizeSchemas(dedupeSchemas(marked, resourceFile).code, resourceFile).code,
                    resourceFile,
                  ).code,
                  resourceFile,
                ).code,
                resourceFile,
              ),
              resourceFile,
            );

            yield* fs.writeFileString(path.join(outDir, `${resource}.ts`), code);
            written.push(resource);
            totalOps += operations;
          }

          // Barrel — namespace per resource to avoid op-name collisions.
          //
          // A FULL run is authoritative: the barrel is exactly what was
          // generated, so a resource whose model went away drops out of it.
          //
          // A `--resource` run only knows about the resource it generated, so
          // rewriting the barrel from that would delete every other export —
          // which is how #397 shipped a cloudflare barrel exporting `workers`
          // and nothing else, silently dropping 119 services. Merge into the
          // existing barrel instead, so `--resource` can still ADD a brand-new
          // resource without removing anything.
          const barrelPath = path.join(outDir, "index.ts");
          const filtered = config.resource !== "";
          // Sorted, not in generation order: a provider that discovers models
          // in some other order (AWS walks Amazon's directory tree) would
          // otherwise reshuffle the barrel on every run.
          let resources = [...written].sort((a, b) => `${a}.json`.localeCompare(`${b}.json`));
          if (filtered && (yield* fs.exists(barrelPath))) {
            // Recover the RESOURCE from each export line's path, not its name:
            // the two differ when barrelExportName renames (AWS exports
            // `S3` from `./s3.ts`).
            const existing = (yield* fs.readFileString(barrelPath))
              .split("\n")
              .map((line) => /^export \* as \S+ from "\.\/(.+)\.ts";/.exec(line)?.[1])
              .filter((name): name is string => name !== undefined);
            // Ordered exactly as a full run orders it: by MODEL FILENAME, so
            // the `.json` takes part in the collation (`ai_gateway.json` sorts
            // before `ai.json`, where the bare names sort the other way).
            // Otherwise a filtered run reshuffles the barrel into diff noise.
            resources = [...new Set([...existing, ...written])].sort((a, b) =>
              `${a}.json`.localeCompare(`${b}.json`),
            );
          }

          yield* fs.writeFileString(
            barrelPath,
            barrel(
              `// AUTO-GENERATED by scripts/generate.ts. Do not edit.\n`,
              resources.map((r) => ({
                name: options.barrelExportName?.(r) ?? r,
                path: `./${r}.ts`,
              })),
            ),
          );

          yield* (options.finalize ?? formatGenerated)(outDir);

          yield* Console.log(
            `\n✅ Generated ${totalOps} operations across ${written.length} resource modules.`,
          );
          yield* Console.log(`   ${path.join(outDir, "index.ts")}`);
        }

        // Models that failed under continueOnModelError. Reported together,
        // at the end, and the run FAILS — a generate that couldn't produce
        // a module must not exit 0 with the failure buried in the log.
        if (failedModels.length) {
          yield* Console.error(`\n❌ ${failedModels.length} model(s) failed to generate:`);
          for (const f of failedModels) yield* Console.error(`   ${f}`);
          return yield* Effect.die(new Error(`${failedModels.length} model(s) failed to generate`));
        }

        const stamp = yield* Effect.sync(() => stampGeneratedAt(root));
        yield* Console.log(`   package.json distilled.generatedAt = ${stamp.generatedAt}`);
        yield* Console.log(
          `   package.json distilled.specUpdatedAt = ${stamp.specUpdatedAt ?? "(unknown, unchanged)"}`,
        );
      }),
  ).pipe(Command.withDescription(options.description));

  NodeRuntime.runMain(
    Effect.provide(Command.run(command, { version: "1.0.0" }), NodeServices.layer),
  );
};
