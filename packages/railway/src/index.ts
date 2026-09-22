/**
 * @distilled.cloud/railway — Railway GraphQL SDK for Effect.
 *
 * Roots (`me`, `project`, `projectCreate`, …) are lazy {@link Query} lenses.
 * Combinators (`Query.fn`, `Query.map`, `Query.filter`, `Query.flatMap`)
 * live in `@distilled.cloud/core/query`.
 *
 * @example
 * ```ts
 * import { Query } from "@distilled.cloud/core/query";
 * import { Railway } from "@distilled.cloud/railway";
 *
 * const load = Query.fn(() => {
 *   const me = Railway.me();
 *   return {
 *     email: me.email,
 *     workspaces: me.workspaces.pipe(
 *       Query.map((workspace) => workspace.name),
 *     ),
 *   };
 * });
 * ```
 */
export * from "./credentials.ts";
export { Railway } from "./graphql.ts";
export type * from "./graphql.ts";
export { GraphQLLive, type GraphQLRequirements } from "./graphql-transport.ts";
export { GqlError, GqlTransport } from "@distilled.cloud/core/graphql";
