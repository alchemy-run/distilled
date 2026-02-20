import { Effect, Schema, Stream } from "effect";

/**
 * Pagination trait for Coinbase CDP APIs.
 *
 * Coinbase uses cursor-based pagination with:
 * - Input: `pageToken` (opaque string cursor), `pageSize` (integer, default 20)
 * - Output: `nextPageToken` (string, absent/empty when no more pages)
 */
export interface PaginatedTrait {
  /** The name of the input member containing the page token (default: "pageToken") */
  inputToken: string;
  /** The path to the output member containing the next page token (default: "nextPageToken") */
  outputToken: string;
  /** The path to the output member containing the paginated items */
  items: string;
  /** The name of the input member that limits page size (default: "pageSize") */
  pageSize?: string;
}

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
 * Helper to get a value from an object using a dot-separated path.
 */
export const getPath = (obj: unknown, path: string): unknown => {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
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
  type State = { pageToken: string | undefined; done: boolean };

  const unfoldFn = (state: State) =>
    Effect.gen(function* () {
      if (state.done) {
        return undefined;
      }

      const requestPayload = {
        ...input,
        ...(state.pageToken
          ? { [pagination.inputToken]: state.pageToken }
          : {}),
      } as Input;

      const response = yield* operation(requestPayload);

      const nextPageToken = getPath(response, pagination.outputToken) as
        | string
        | undefined;

      const nextState: State = {
        pageToken: nextPageToken,
        done: !nextPageToken || nextPageToken === "",
      };

      return [response, nextState] as const;
    });

  return Stream.unfold(
    { pageToken: undefined, done: false } as State,
    unfoldFn,
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
  return paginatePages(operation, input, pagination).pipe(
    Stream.flatMap((page) => {
      const items = getPath(page, pagination.items) as
        | readonly Item[]
        | undefined;
      return Stream.fromIterable(items ?? []);
    }),
  );
};
