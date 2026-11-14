/**
 * @distilled.cloud/fly-io/GraphQL -- Fly.io GraphQL SDK for Effect.
 *
 * Roots (`addOn`, `addOns`, `organization`, `createAddOn`,
 * `ensureDepotRemoteBuilder`, ...) are lazy {@link Query} lenses generated
 * from the api.fly.io/graphql introspection schema. Combinators
 * (`Query.fn`, `Query.map`, `Query.items`, ...) live in
 * `@distilled.cloud/core/query`. Each root carries the typed errors it can
 * return (`FlyNotFound`, `FlyUnauthorized`, `TigrisBucketNotFound`, ...).
 * Requests use the REST SDK's {@link Credentials}.
 *
 * @example
 * ```ts
 * import { Query } from "@distilled.cloud/core/query";
 * import { Fly } from "@distilled.cloud/fly-io/GraphQL";
 *
 * const agreed = Query.fn((slug: string) =>
 *   Fly.organization({ slug }).agreedToProviderTos({ providerName: "upstash_redis" }),
 * );
 * ```
 */
export { Fly } from "./graphql.ts";
export type * from "./graphql.ts";
export { GraphQLLive, GRAPHQL_URL, type GraphQLRequirements } from "./graphql-transport.ts";
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
