/**
 * @distilled.cloud/expo-eas -- Expo Application Services (EAS) GraphQL SDK for Effect.
 *
 * Roots (`account`, `app`, `me`, `build`, ...) are lazy {@link Query}
 * lenses generated from the EAS introspection schema. Most roots are
 * namespaces whose fields take the arguments:
 * `Eas.account().byName({ accountName })`. Combinators (`Query.fn`,
 * `Query.map`, `Query.filter`, `Query.flatMap`) live in
 * `@distilled.cloud/core/query`. Each root carries the typed errors EAS can
 * return (`EasValidationError`, `EasExperienceNotFound`, ...).
 *
 * @example
 * ```ts
 * import { Query } from "@distilled.cloud/core/query";
 * import { Eas } from "@distilled.cloud/expo-eas";
 *
 * const appName = Query.fn((appId: string) => Eas.app().byId({ appId }).name);
 * ```
 */
export * from "./credentials.ts";
export { Eas } from "./graphql.ts";
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
