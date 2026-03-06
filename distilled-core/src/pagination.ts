import { Effect, Stream } from "effect";

/**
 * Pagination trait interface shared across all distilled SDKs.
 *
 * Different APIs use different pagination strategies (cursor-based, page-based, etc.)
 * but they all share this common structure:
 * - An input token (cursor, page number, etc.)
 * - An output token (next cursor, next page, etc.)
 * - A path to the items array in the response
 * - An optional page size parameter
 */
export interface PaginatedTrait {
  /** The name of the input member containing the pagination token */
  inputToken: string;
  /** The path to the output member containing the next pagination token */
  outputToken: string;
  /** The path to the output member containing the paginated items */
  items: string;
  /** The name of the input member that limits page size */
  pageSize?: string;
}

/**
 * Helper to get a value from an object using a dot-separated path.
 * Used for pagination traits where outputToken and items can be nested paths.
 *
 * @example
 * ```ts
 * getPath({ pagination: { cursor: "abc" } }, "pagination.cursor")
 * // => "abc"
 * ```
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
 * Creates a stream of pages from a paginated operation.
 *
 * This is the generic version that works with any pagination strategy.
 * The `isDone` callback determines when pagination is complete based on the output token value.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without pagination token)
 * @param pagination - The pagination trait describing the pagination structure
 * @param options - Configuration for the pagination strategy
 * @returns A Stream of full page responses
 *
 * @example
 * ```ts
 * // Cursor-based pagination (Neon, Coinbase)
 * const allPages = paginatePages(listProjects, {}, DefaultPaginationTrait, {
 *   initialState: undefined,
 *   isDone: (token) => token === null || token === undefined,
 *   buildInput: (input, token, trait) =>
 *     token ? { ...input, [trait.inputToken]: token } : { ...input },
 *   nextState: (token) => token ?? undefined,
 * });
 *
 * // Page-number-based pagination (PlanetScale)
 * const allPages = paginatePages(listDatabases, { organization: "my-org" }, DefaultPaginationTrait, {
 *   initialState: 1,
 *   isDone: (token) => token === null || token === undefined,
 *   buildInput: (input, page, trait) => ({ ...input, [trait.inputToken]: page }),
 *   nextState: (token, currentState) => token ?? currentState + 1,
 * });
 * ```
 */
export const paginatePages = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
  State,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Record<string, unknown>,
  pagination: PaginatedTrait,
  options: {
    /** The initial pagination state (e.g., undefined for cursor, 1 for page number) */
    initialState: State;
    /** Returns true when there are no more pages */
    isDone: (token: unknown) => boolean;
    /** Build the input object from the base input and current state */
    buildInput: (
      input: Record<string, unknown>,
      state: State,
      trait: PaginatedTrait,
    ) => Input;
    /** Extract the next state from the output token and current state */
    nextState: (token: unknown, currentState: State) => State;
  },
): Stream.Stream<Output, E, R> => {
  type InternalState = { state: State; done: boolean; first: boolean };

  const unfoldFn = (s: InternalState) =>
    Effect.gen(function* () {
      if (s.done) {
        return undefined;
      }

      const requestPayload = s.first
        ? options.buildInput(input, s.state, pagination)
        : options.buildInput(input, s.state, pagination);

      const response = yield* operation(requestPayload);

      const nextToken = getPath(response, pagination.outputToken);

      const nextInternalState: InternalState = {
        state: options.nextState(nextToken, s.state),
        done: options.isDone(nextToken),
        first: false,
      };

      return [response, nextInternalState] as const;
    });

  return Stream.unfold(
    { state: options.initialState, done: false, first: true } as InternalState,
    unfoldFn,
  );
};

/**
 * Creates a stream of individual items from a paginated operation.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without pagination token)
 * @param pagination - The pagination trait describing the pagination structure
 * @param options - Configuration for the pagination strategy
 * @returns A Stream of individual items from all pages
 */
export const paginateItems = <
  Input extends Record<string, unknown>,
  Output,
  Item,
  E,
  R,
  State,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Record<string, unknown>,
  pagination: PaginatedTrait,
  options: {
    initialState: State;
    isDone: (token: unknown) => boolean;
    buildInput: (
      input: Record<string, unknown>,
      state: State,
      trait: PaginatedTrait,
    ) => Input;
    nextState: (token: unknown, currentState: State) => State;
  },
): Stream.Stream<Item, E, R> => {
  return paginatePages(operation, input, pagination, options).pipe(
    Stream.flatMap((page) => {
      const items = getPath(page, pagination.items) as
        | readonly Item[]
        | undefined;
      return Stream.fromIterable(items ?? []);
    }),
  );
};

// ============================================================================
// Pre-built pagination strategies
// ============================================================================

/**
 * Cursor-based pagination options.
 * Used by APIs that return an opaque cursor string for the next page.
 * The cursor is absent/null/undefined when there are no more pages.
 */
export const cursorPaginationOptions = {
  initialState: undefined as string | undefined,
  isDone: (token: unknown) =>
    token === null || token === undefined || token === "",
  buildInput: <Input extends Record<string, unknown>>(
    input: Record<string, unknown>,
    state: string | undefined,
    trait: PaginatedTrait,
  ): Input =>
    (state
      ? { ...input, [trait.inputToken]: state }
      : { ...input }) as Input,
  nextState: (token: unknown) => (token as string) ?? undefined,
};

/**
 * Page-number-based pagination options.
 * Used by APIs that use 1-indexed page numbers.
 * The next page is null/undefined when there are no more pages.
 */
export const pageNumberPaginationOptions = {
  initialState: 1,
  isDone: (token: unknown) => token === null || token === undefined,
  buildInput: <Input extends Record<string, unknown>>(
    input: Record<string, unknown>,
    state: number,
    trait: PaginatedTrait,
  ): Input => ({ ...input, [trait.inputToken]: state }) as Input,
  nextState: (token: unknown, currentState: number) =>
    (token as number) ?? currentState + 1,
};
