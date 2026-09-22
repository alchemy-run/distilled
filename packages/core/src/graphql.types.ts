/** Compile-only: Query.fn unwraps Query/Effect fields on the returned plan. */
import type { Query, UnwrapPlan } from "./query.ts";
import type * as Effect from "effect/Effect";

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
