import { Effect, Schema, Stream } from "effect";
import {
  type PaginatedTrait,
  getPath,
  paginatePages as corePaginatePages,
  paginateItems as corePaginateItems,
  pageNumberPaginationOptions,
} from "distilled-core/Pagination";

export type { PaginatedTrait };
export { getPath };

/**
 * Default pagination trait for PlanetScale APIs.
 */
export const DefaultPaginationTrait: PaginatedTrait = {
  inputToken: "page",
  outputToken: "next_page",
  items: "data",
  pageSize: "per_page",
};

/**
 * Schema for a paginated response from PlanetScale APIs.
 */
export const PaginatedResponse = <A>(itemSchema: Schema.Schema<A>) =>
  Schema.Struct({
    current_page: Schema.Number,
    next_page: Schema.NullOr(Schema.Number),
    next_page_url: Schema.NullOr(Schema.String),
    prev_page: Schema.NullOr(Schema.Number),
    prev_page_url: Schema.NullOr(Schema.String),
    data: Schema.Array(itemSchema),
  });

/**
 * Type for a paginated response.
 */
export type PaginatedResponse<A> = {
  current_page: number;
  next_page: number | null;
  next_page_url: string | null;
  prev_page: number | null;
  prev_page_url: string | null;
  data: readonly A[];
};

/**
 * Creates a stream of pages from a paginated operation.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without page parameter)
 * @param pagination - The pagination trait (defaults to PlanetScale standard)
 * @returns A Stream of full page responses
 *
 * @example
 * ```ts
 * const allPages = paginatePages(listDatabases, { organization: "my-org" })
 * ```
 */
export const paginatePages = <
  Input extends Record<string, unknown>,
  Output extends PaginatedResponse<unknown>,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, "page">,
  pagination: PaginatedTrait = DefaultPaginationTrait,
): Stream.Stream<Output, E, R> => {
  return corePaginatePages(
    operation,
    input as Record<string, unknown>,
    pagination,
    pageNumberPaginationOptions,
  );
};

/**
 * Creates a stream of individual items from a paginated operation.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without page parameter)
 * @param pagination - The pagination trait (defaults to PlanetScale standard)
 * @returns A Stream of individual items from all pages
 *
 * @example
 * ```ts
 * const allDatabases = paginateItems(listDatabases, { organization: "my-org" })
 * ```
 */
export const paginateItems = <
  Input extends Record<string, unknown>,
  Output extends PaginatedResponse<Item>,
  Item,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, "page">,
  pagination: PaginatedTrait = DefaultPaginationTrait,
): Stream.Stream<Item, E, R> => {
  return corePaginateItems(
    operation,
    input as Record<string, unknown>,
    pagination,
    pageNumberPaginationOptions,
  );
};
