import { Effect, Schema, Stream } from "effect";
import {
  type PaginatedTrait,
  getPath,
  paginatePages as corePaginatePages,
  paginateItems as corePaginateItems,
  cursorPaginationOptions,
} from "distilled-core/Pagination";

export type { PaginatedTrait };
export { getPath };

/**
 * Default pagination trait for Neon APIs.
 */
export const DefaultPaginationTrait: PaginatedTrait = {
  inputToken: "cursor",
  outputToken: "pagination.cursor",
  items: "projects",
  pageSize: "limit",
};

/**
 * Schema for a paginated response from Neon APIs.
 */
export const PaginatedResponse = <A>(
  itemSchema: Schema.Schema<A>,
  itemsKey: string,
) =>
  Schema.Struct({
    [itemsKey]: Schema.Array(itemSchema),
    pagination: Schema.optional(
      Schema.Struct({
        cursor: Schema.NullOr(Schema.String),
      }),
    ),
  });

/**
 * Type for a paginated response.
 */
export type PaginatedResponse<A, K extends string = "data"> = {
  [key in K]: readonly A[];
} & {
  pagination?: {
    cursor: string | null;
  };
};

/**
 * Creates a stream of pages from a paginated operation.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without cursor parameter)
 * @param pagination - The pagination trait (defaults to Neon standard)
 * @returns A Stream of full page responses
 *
 * @example
 * ```ts
 * const allPages = paginatePages(listProjects, {})
 * ```
 */
export const paginatePages = <
  Input extends Record<string, unknown>,
  Output extends PaginatedResponse<unknown, string>,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, "cursor">,
  pagination: PaginatedTrait = DefaultPaginationTrait,
): Stream.Stream<Output, E, R> => {
  return corePaginatePages(
    operation,
    input as Record<string, unknown>,
    pagination,
    cursorPaginationOptions,
  );
};

/**
 * Creates a stream of individual items from a paginated operation.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without cursor parameter)
 * @param pagination - The pagination trait (defaults to Neon standard)
 * @returns A Stream of individual items from all pages
 *
 * @example
 * ```ts
 * const allProjects = paginateItems(listProjects, {}, { ...DefaultPaginationTrait, items: "projects" })
 * ```
 */
export const paginateItems = <
  Input extends Record<string, unknown>,
  Output extends PaginatedResponse<Item, string>,
  Item,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, "cursor">,
  pagination: PaginatedTrait = DefaultPaginationTrait,
): Stream.Stream<Item, E, R> => {
  return corePaginateItems(
    operation,
    input as Record<string, unknown>,
    pagination,
    cursorPaginationOptions,
  );
};
