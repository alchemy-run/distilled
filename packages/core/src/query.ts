/**
 * Query combinators for GraphQL SDKs.
 *
 * Import this module next to a generated client:
 *
 *   import { Query } from "@distilled.cloud/core/query"
 *   import { Railway } from "@distilled.cloud/railway"
 *
 * `Query.fn` takes a **builder** (plain function, not `Effect.gen`) that
 * returns a plan of `Query<Value>` and `Effect` values. It walks Map /
 * Filter / FlatMap / Of, posts one GraphQL document, then interprets the
 * plan. Roots (`Railway.me`) come from the generated SDK; they are not
 * combinators.
 *
 * @see {@link file://./graphql.ts} for the algebra, compiler, and transport.
 */
import {
  filterQuery,
  flatMapQuery,
  mapQuery,
  ofQuery,
  queryFn,
  type Query as QueryType,
} from "./graphql.ts";

export type Query<Value> = QueryType<Value>;
export type { UnwrapPlan } from "./graphql.ts";

export const Query = {
  fn: queryFn,
  filter: filterQuery,
  map: mapQuery,
  flatMap: flatMapQuery,
  of: ofQuery,
};
