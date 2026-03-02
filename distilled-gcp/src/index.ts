/**
 * distilled-gcp - Effect-native GCP SDK with exhaustive error typing.
 *
 * @example
 * ```typescript
 * import * as Storage from "distilled-gcp/storage-v1";
 * import * as Auth from "distilled-gcp/Auth";
 *
 * const program = Effect.gen(function* () {
 *   const buckets = yield* Storage.listBuckets({ project: "my-project" });
 *   console.log(buckets);
 * });
 *
 * program.pipe(
 *   Effect.provide(Auth.fromADC()),
 *   Effect.provide(FetchHttpClient.layer),
 * );
 * ```
 */

export * as Auth from "./auth.ts";
export * as Category from "./category.ts";
export * as Errors from "./errors.ts";
export * as Retry from "./retry.ts";
export * as Traits from "./traits.ts";
