/**
 * Post-generation formatting (dev-time only).
 *
 * The emitters produce a canonical token stream, not formatted source, so
 * every generator formats what it wrote before finishing. Without it a
 * generate run leaves the whole output directory dirty against the committed
 * (formatted) files, and a real regression is indistinguishable from
 * whitespace in the diff.
 *
 * Lives here so the shared {@link runGeneratorCli} and the providers with
 * their own pipelines run the identical step.
 */
import { spawn } from "node:child_process";
import { Console, Effect } from "effect";

/** Run a dev-time tool, failing the generate run if it does. */
export const runTool = (argv: readonly string[]): Effect.Effect<void, never, never> =>
  Effect.tryPromise({
    try: () =>
      new Promise<number | null>((resolve, reject) => {
        const [command, ...args] = argv;
        spawn(command!, args, { stdio: ["ignore", "inherit", "inherit"] })
          .on("error", reject)
          .on("exit", resolve);
      }),
    catch: (cause) => new Error(`${argv[0]} failed to start: ${cause}`),
  }).pipe(
    Effect.flatMap((code) =>
      code === 0 ? Effect.void : Effect.die(new Error(`${argv.join(" ")} exited with ${code}`)),
    ),
    Effect.catchCause((cause) => Effect.die(cause)),
  );

/** Format a generated directory in place. */
export const formatGenerated = (dir: string) =>
  Effect.flatMap(Console.log(`\n🧹 Formatting ${dir}`), () =>
    runTool(["pnpm", "exec", "oxfmt", dir]),
  );

/**
 * Lint-fix then format. `oxlint --fix` can leave its rewrites unformatted,
 * so the formatter has to run after it, not before.
 */
export const lintAndFormatGenerated = (dir: string) =>
  Effect.flatMap(Console.log(`\n🧹 Linting and formatting ${dir}`), () =>
    Effect.flatMap(runTool(["pnpm", "exec", "oxlint", "--fix", dir]), () =>
      runTool(["pnpm", "exec", "oxfmt", dir]),
    ),
  );
