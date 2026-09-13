/**
 * Railway GraphQL SDK for Effect.
 *
 * Select fields with typed `where`/`select` objects. Operations, GraphQL
 * errors, and credential layers are available from the package root.
 *
 * @example
 * ```ts
 * import * as Railway from "@distilled.cloud/railway";
 *
 * yield* Railway.project({ id: projectId }, { id: true, name: true });
 * ```
 */
export * from "./credentials.ts";
export * from "./graphql.ts";
