/**
 * Pagination utilities for streaming through paginated API responses.
 *
 * Supports multiple pagination styles:
 * - Page-based (e.g., PlanetScale): page/per_page with next_page number
 * - Cursor-based (e.g., Neon): cursor/limit with next cursor string
 * - Token-based (e.g., AWS): NextToken/MaxResults with continuation tokens
 *
 * Each SDK defines its own pagination trait configuration, and these
 * shared utilities handle the streaming logic.
 *
 * @example
 * ```ts
 * import * as Pagination from "@distilled.cloud/sdk-core/pagination";
 *
 * // Page-based pagination
 * const allPages = Pagination.paginatePages(listDatabases, { organization: "my-org" }, {
 *   inputToken: "page",
 *   outputToken: "next_page",
 *   items: "data",
 * });
 * ```
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { getPath } from "./traits.ts";

// ============================================================================
// Pagination Trait
// ============================================================================

/**
 * Pagination trait describing how to navigate between pages.
 */
export interface PaginatedTrait {
  /** The name of the input member containing the page/cursor token */
  inputToken: string;
  /** The path to the output member containing the next page/cursor token */
  outputToken: string;
  /** The path to the output member containing the paginated items */
  items?: string;
  /** The name of the input member that limits page size */
  pageSize?: string;
}

// ============================================================================
// Page-based Pagination (PlanetScale style)
// ============================================================================

/**
 * Creates a stream of pages using page-number pagination.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without page parameter)
 * @param pagination - The pagination trait configuration
 * @returns A Stream of full page responses
 */
export const paginatePageNumber = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, string>,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  type State = { page: number; done: boolean };

  const unfoldFn = (state: State) =>
    Effect.gen(function* () {
      if (state.done) {
        return undefined;
      }

      const requestPayload = {
        ...input,
        [pagination.inputToken]: state.page,
      } as Input;

      const response = yield* operation(requestPayload);

      const nextPage = getPath(response, pagination.outputToken) as
        | number
        | null
        | undefined;

      const nextState: State = {
        page: nextPage ?? state.page + 1,
        done: nextPage === null || nextPage === undefined,
      };

      return [response, nextState] as const;
    });

  return Stream.unfold({ page: 1, done: false } as State, unfoldFn);
};

// ============================================================================
// Cursor-based Pagination (Neon style)
// ============================================================================

/**
 * Creates a stream of pages using cursor-based pagination.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input (without cursor parameter)
 * @param pagination - The pagination trait configuration
 * @returns A Stream of full page responses
 */
export const paginateCursor = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Omit<Input, string>,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  type State = { cursor: string | undefined; done: boolean };

  const unfoldFn = (state: State) =>
    Effect.gen(function* () {
      if (state.done) {
        return undefined;
      }

      const requestPayload = {
        ...input,
        ...(state.cursor ? { [pagination.inputToken]: state.cursor } : {}),
      } as Input;

      const response = yield* operation(requestPayload);

      const nextCursor = getPath(response, pagination.outputToken) as
        | string
        | null
        | undefined;

      const nextState: State = {
        cursor: nextCursor ?? undefined,
        done: nextCursor === null || nextCursor === undefined,
      };

      return [response, nextState] as const;
    });

  return Stream.unfold({ cursor: undefined, done: false } as State, unfoldFn);
};

// ============================================================================
// Token-based Pagination (AWS style)
// ============================================================================

/**
 * Creates a stream of pages using token-based pagination.
 *
 * @param operation - The paginated operation to call
 * @param input - The initial input
 * @param pagination - The pagination trait configuration
 * @returns A Stream of full page responses
 */
export const paginateToken = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  type State = { token: unknown; done: boolean };

  const unfoldFn = (state: State) =>
    Effect.gen(function* () {
      if (state.done) {
        return undefined;
      }

      const requestPayload =
        state.token !== undefined
          ? { ...input, [pagination.inputToken]: state.token }
          : input;

      const response = yield* operation(requestPayload as Input);

      const nextToken = getPath(response, pagination.outputToken);

      const nextState: State = {
        token: nextToken,
        done: nextToken === undefined || nextToken === null,
      };

      return [response, nextState] as const;
    });

  return Stream.unfold({ token: undefined, done: false } as State, unfoldFn);
};

// ============================================================================
// Item extraction
// ============================================================================

/**
 * Extracts individual items from a page stream.
 *
 * @param pages - A stream of page responses
 * @param itemsPath - Dot-separated path to the items array in the page response
 * @returns A Stream of individual items
 */
export const extractItems = <Output, Item, E, R>(
  pages: Stream.Stream<Output, E, R>,
  itemsPath: string,
): Stream.Stream<Item, E, R> =>
  pages.pipe(
    Stream.flatMap((page) => {
      const items = getPath(page, itemsPath) as readonly Item[] | undefined;
      return Stream.fromIterable(items ?? []);
    }),
  );
