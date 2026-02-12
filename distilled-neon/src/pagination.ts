import { Effect, Option, Schema, Stream } from "effect";

/**
 * Pagination trait for Neon APIs.
 *
 * Neon uses cursor-based pagination with:
 * - Input: `cursor` (string), `limit`
 * - Output: `pagination.cursor` (null if no more pages), items in a named field
 */
export interface PaginatedTrait {
  /** The name of the input member containing the cursor (default: "cursor") */
  inputToken: string;
  /** The path to the output member containing the next cursor (default: "pagination.cursor") */
  outputToken: string;
  /** The path to the output member containing the paginated items */
  items: string;
  /** The name of the input member that limits page size (default: "limit") */
  pageSize?: string;
}

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
 * Schema for a paginated response from Neon APIs.
 */
export const PaginatedResponse = <A, I, R>(itemSchema: Schema.Schema<A, I, R>, itemsKey: string) =>
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
  type State = { cursor: string | undefined; done: boolean };

  const unfoldFn = (state: State) =>
    Effect.gen(function* () {
      if (state.done) {
        return Option.none();
      }

      // Build the request with the cursor
      const requestPayload = {
        ...input,
        ...(state.cursor ? { [pagination.inputToken]: state.cursor } : {}),
      } as Input;

      // Make the API call
      const response = yield* operation(requestPayload);

      // Extract the next cursor
      const nextCursor = getPath(response, pagination.outputToken) as string | null | undefined;

      // Return the full page and next state
      const nextState: State = {
        cursor: nextCursor ?? undefined,
        done: nextCursor === null || nextCursor === undefined,
      };

      return Option.some([response, nextState] as const);
    });

  return Stream.unfoldEffect({ cursor: undefined, done: false } as State, unfoldFn);
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
  return paginatePages(operation, input, pagination).pipe(
    Stream.flatMap((page) => {
      const items = getPath(page, pagination.items) as readonly Item[] | undefined;
      return Stream.fromIterable(items ?? []);
    }),
  );
};
