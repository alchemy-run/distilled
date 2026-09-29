/**
 * @distilled.cloud/github/GraphQL — GitHub's GraphQL API as lazy Query lenses.
 *
 * Covers what the REST description does not, such as enterprise policy
 * settings (`updateEnterpriseMembersCanCreateRepositoriesSetting`, …) and an
 * enterprise's SAML identity provider. Roots (`viewer`, `enterprise`,
 * `organization`, `repository`, every mutation, …) are generated into
 * ./graphql.ts by scripts/generate-graphql.ts; combinators (`Query.fn`,
 * `Query.map`, `Query.items`) live in `@distilled.cloud/core/query`.
 *
 * Authentication is the same {@link Credentials} the REST services use.
 *
 * @example
 * ```ts
 * import { Query } from "@distilled.cloud/core/query";
 * import { GitHubGraphQL } from "@distilled.cloud/github/GraphQL";
 *
 * const policies = Query.fn((slug: string) => {
 *   const enterprise = GitHubGraphQL.enterprise({ slug });
 *   return {
 *     id: enterprise.id,
 *     membersCanCreateRepositories:
 *       enterprise.ownerInfo.membersCanCreateRepositoriesSetting,
 *   };
 * });
 * ```
 */
export { GitHubGraphQL } from "./graphql.ts";
export type * from "./graphql.ts";
export {
  GraphQLLive,
  graphqlUrl,
  type GraphQLRequirements,
} from "./graphql-transport.ts";
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
