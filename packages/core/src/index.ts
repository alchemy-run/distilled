/**
 * `@distilled.cloud/core` — the runtime shared by every distilled SDK.
 *
 * ```ts
 * import { ResponseValidation, Retry } from "@distilled.cloud/core";
 *
 * program.pipe(Effect.provide(ResponseValidation.strict));
 * ```
 *
 * Each namespace is also importable on its own subpath
 * (`@distilled.cloud/core/response-validation`, …); generated SDKs use the
 * subpaths. Code generation (`codegen/*`) and test helpers (`testing`) stay
 * subpath-only.
 */
export * as API from "./api.ts";
export * as Category from "./category.ts";
export * as Errors from "./errors.ts";
export * as GraphQL from "./graphql.ts";
export * as Pagination from "./pagination.ts";
export * as ProtocolHttp from "./protocol-http.ts";
export * as ProtocolRest from "./protocol-rest.ts";
export { Query } from "./query.ts";
export * as ResponseValidation from "./response-validation.ts";
export * as Retry from "./retry.ts";
export * as RetryAfter from "./retry-after.ts";
export * as Trait from "./trait.ts";
