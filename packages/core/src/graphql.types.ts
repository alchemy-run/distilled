/** Compile-only: Query.fn unwraps Query/Effect fields on the returned plan. */
import type { PlanError, Query, QueryError, UnwrapPlan } from "./query.ts";
import type {
  itemsQuery,
  GraphQLFailure,
  GraphQLTransportError,
  UnknownGraphQLError,
} from "./graphql.ts";
import type * as Effect from "effect/Effect";
import type * as Stream from "effect/Stream";

type Plan = {
  readonly email: Query<string>;
  readonly projects: Query<ReadonlyArray<{ name: string; stars: number }>>;
  readonly flag: Effect.Effect<boolean>;
};

type Unwrapped = UnwrapPlan<Plan>;
type Assert<T extends true> = T;
type Equal<Left, Right> = [Left] extends [Right]
  ? [Right] extends [Left]
    ? true
    : false
  : false;

type _Email = Assert<Equal<Unwrapped["email"], string>>;
type _Projects = Assert<
  Equal<Unwrapped["projects"], ReadonlyArray<{ name: string; stars: number }>>
>;
type _Flag = Assert<Equal<Unwrapped["flag"], boolean>>;

// ── Errors ──────────────────────────────────────────────────────────────────
declare class NotFound {
  readonly _tag: "NotFound";
  readonly message: string;
}
declare class RateLimited {
  readonly _tag: "RateLimited";
  readonly message: string;
}
declare const project: Query<
  { name: string; services: ReadonlyArray<{ name: string }> },
  NotFound | RateLimited
>;
declare const me: Query<{ email: string }, RateLimited>;
declare const lookup: Effect.Effect<number, "lookup-failed">;

type ErrorPlan = {
  readonly name: typeof project.name;
  readonly services: Query<ReadonlyArray<string>, NotFound>;
  readonly email: typeof me.email;
  readonly lookup: typeof lookup;
};

type _FieldsKeepRootErrors = Assert<
  Equal<(typeof project.name)["errorType"], NotFound | RateLimited>
>;
type _PlanError = Assert<
  Equal<PlanError<ErrorPlan>, NotFound | RateLimited | "lookup-failed">
>;
type _NoErrors = Assert<Equal<PlanError<{ literal: 1 }>, never>>;
type _QueryError = Assert<
  Equal<
    Exclude<
      QueryError<NotFound>,
      | GraphQLFailure<NotFound | UnknownGraphQLError>
      | UnknownGraphQLError
      | GraphQLTransportError
    >,
    NotFound
  >
>;

// ── Pagination ──────────────────────────────────────────────────────────────
declare const services: Query<ReadonlyArray<{ name: string }>, NotFound>;
type PagedItems = ReturnType<typeof itemsQuery<{ name: string }, NotFound>>;
type _ItemsValue = Assert<Equal<Stream.Success<PagedItems>, { name: string }>>;
type _ItemsError = Assert<
  Equal<
    Extract<
      Stream.Error<PagedItems>,
      { _tag: "NotFound" | "GraphQLPaginationError" }
    >["_tag"],
    "NotFound" | "GraphQLPaginationError"
  >
>;
export type _Services = typeof services;
