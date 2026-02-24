import { Effect, Schema, Stream } from "effect";

/**
 * Pagination trait for PlanetScale APIs.
 *
 * PlanetScale uses page-based pagination with:
 * - Input: `page` (1-indexed), `per_page`
 * - Output: `current_page`, `next_page` (null if no more pages), `data` (items)
 */
export interface PaginatedTrait {
  /** The name of the input member containing the page number (default: "page") */
  inputToken: string;
  /** The path to the output member containing the next page number (default: "next_page") */
  outputToken: string;
  /** The path to the output member containing the paginated items (default: "data") */
  items: string;
  /** The name of the input member that limits page size (default: "per_page") */
  pageSize?: string;
}

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
 * Helper to get a value from an object using a dot-separated path.
 * Used for pagination traits where outputToken and items can be paths.
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
  type State = { page: number; done: boolean };

  const unfoldFn = (state: State) =>
    Effect.gen(function* () {
      if (state.done) {
        return undefined;
      }

      // Build the request with the page number
      const requestPayload = {
        ...input,
        [pagination.inputToken]: state.page,
      } as Input;

      // Make the API call
      const response = yield* operation(requestPayload);

      // Extract the next page number
      const nextPage = getPath(response, pagination.outputToken) as
        | number
        | null
        | undefined;

      // Return the full page and next state
      const nextState: State = {
        page: nextPage ?? state.page + 1,
        done: nextPage === null || nextPage === undefined,
      };

      return [response, nextState] as const;
    });

  return Stream.unfold({ page: 1, done: false } as State, unfoldFn);
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
  return paginatePages(operation, input, pagination).pipe(
    Stream.flatMap((page) => {
      const items = getPath(page, pagination.items) as
        | readonly Item[]
        | undefined;
      return Stream.fromIterable(items ?? []);
    }),
  );
};
