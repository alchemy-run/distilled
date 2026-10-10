/**
 * @distilled.cloud/linear — Linear GraphQL SDK for Effect.
 *
 * Roots (`viewer`, `teams`, `issueLabelCreate`, …) are lazy {@link Query}
 * lenses. Combinators (`Query.fn`, `Query.map`, `Query.filter`,
 * `Query.flatMap`) live in `@distilled.cloud/core/query`. Each root carries
 * the typed errors it can return (`LinearAuthenticationError`,
 * `LinearRateLimited`, …), so the Effect `Query.fn` produces can be handled
 * with `Effect.catchTag`.
 *
 * @example
 * ```ts
 * import { Query } from "@distilled.cloud/core/query";
 * import { Linear } from "@distilled.cloud/linear";
 *
 * const teams = Query.fn(() =>
 *   Linear.teams({ first: 50 }).pipe(
 *     Query.map((team) => ({ id: team.id, key: team.key })),
 *   ),
 * );
 * ```
 */
export * from "./credentials.ts";
export { Linear } from "./graphql.ts";
export type * from "./graphql.ts";
export { GraphQLLive, type GraphQLRequirements } from "./graphql-transport.ts";
export {
  GqlError,
  GqlTransport,
  GraphQLFailure,
  GraphQLPaginationError,
  GraphQLTransportError,
  UnknownGraphQLError,
  type GraphQLIssue,
  type QueryError,
} from "@distilled.cloud/core/graphql";
