/**
 * The Inngest environment calls go to, as a layer (like AWS's `Region`).
 *
 * An optional service: no operation lists it in its requirements. The
 * protocol sends it as the `X-Inngest-Env` header of every request, as the
 * official Inngest client does with its `env` option. An operation that
 * takes its own `xInngestEnv` sends that instead. Without either, the API
 * uses the environment of the key.
 *
 * @example
 * ```ts
 * // Every call in the scope:
 * Inngest.getV2Apps({}).pipe(Effect.provide(Inngest.Environment.of("my-branch")));
 * // One call:
 * Inngest.getV2App({ appId, xInngestEnv: "my-branch" });
 * ```
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export class Environment
  extends /*@__PURE__*/ Context.Service<Environment, string>()("Inngest::Environment") {}

/** Send calls in a scope to one environment by name, e.g. `Environment.of("my-branch")`. */
export const of = (environment: string) => Layer.succeed(Environment, environment);
