/**
 * @distilled.cloud/github/GraphQL -- GitHub GraphQL SDK for Effect.
 *
 * Roots (`repository`, `viewer`, `node`, `convertPullRequestToDraft`, ...)
 * are lazy {@link Query} lenses generated from GitHub's public GraphQL
 * schema. Combinators (`Query.fn`, `Query.map`, ...) live in
 * `@distilled.cloud/core/query`. Each root carries the typed errors it can
 * return (`GitHubNotFound`, `GitHubForbidden`, ...). Requests use the REST
 * SDK's {@link Credentials}.
 *
 * @example
 * ```ts
 * import { Query } from "@distilled.cloud/core/query";
 * import { GitHub, GraphQLLive } from "@distilled.cloud/github/GraphQL";
 *
 * const toDraft = Query.fn((pullRequestId: string) =>
 *   GitHub.convertPullRequestToDraft({ input: { pullRequestId } }).pullRequest.isDraft,
 * );
 * ```
 */
export { GitHub } from "./graphql.ts";
export type * from "./graphql.ts";
export { GraphQLLive, graphqlUrl, type GraphQLRequirements } from "./graphql-transport.ts";
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
