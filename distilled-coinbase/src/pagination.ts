import { Effect, Stream } from "effect";
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
 * Default pagination trait for Coinbase CDP APIs.
 */
export const DefaultPaginationTrait: PaginatedTrait = {
  inputToken: "pageToken",
  outputToken: "nextPageToken",
  items: "data",
  pageSize: "pageSize",
};

/**
 * Type for a paginated response with cursor-based pagination.
 */
export type PaginatedResponse<A> = {
  nextPageToken?: string | undefined;
  [key: string]: unknown;
};

/**
 * Creates a stream of pages from a paginated operation (cursor-based).
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without pageToken parameter)
 * @param pagination - The pagination trait (defaults to Coinbase standard)
 * @returns A Stream of full page responses
 */
export const paginatePages = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, "pageToken">,
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
 * Creates a stream of individual items from a paginated operation (cursor-based).
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without pageToken parameter)
 * @param pagination - The pagination trait (defaults to Coinbase standard)
 * @returns A Stream of individual items from all pages
 */
export const paginateItems = <
  Input extends Record<string, unknown>,
  Output,
  Item,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, "pageToken">,
  pagination: PaginatedTrait = DefaultPaginationTrait,
): Stream.Stream<Item, E, R> => {
  return corePaginateItems(
    operation,
    input as Record<string, unknown>,
    pagination,
    cursorPaginationOptions,
  );
};
