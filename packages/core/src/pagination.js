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
import { getPath } from "./traits.js";
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
export const paginatePageNumber = (operation, input, pagination) => {
    const unfoldFn = (state) => Effect.gen(function* () {
        if (state.done) {
            return undefined;
        }
        const requestPayload = {
            ...input,
            [pagination.inputToken]: state.page,
        };
        const response = yield* operation(requestPayload);
        const nextPage = getPath(response, pagination.outputToken);
        const nextState = {
            page: nextPage ?? state.page + 1,
            done: nextPage === null || nextPage === undefined,
        };
        return [response, nextState];
    });
    return Stream.unfold({ page: 1, done: false }, unfoldFn);
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
export const paginateCursor = (operation, input, pagination) => {
    const unfoldFn = (state) => Effect.gen(function* () {
        if (state.done) {
            return undefined;
        }
        const requestPayload = {
            ...input,
            ...(state.cursor ? { [pagination.inputToken]: state.cursor } : {}),
        };
        const response = yield* operation(requestPayload);
        const nextCursor = getPath(response, pagination.outputToken);
        const nextState = {
            cursor: nextCursor ?? undefined,
            done: nextCursor === null || nextCursor === undefined,
        };
        return [response, nextState];
    });
    return Stream.unfold({ cursor: undefined, done: false }, unfoldFn);
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
export const paginateToken = (operation, input, pagination) => {
    const unfoldFn = (state) => Effect.gen(function* () {
        if (state.done) {
            return undefined;
        }
        const requestPayload = state.token !== undefined
            ? { ...input, [pagination.inputToken]: state.token }
            : input;
        const response = yield* operation(requestPayload);
        const nextToken = getPath(response, pagination.outputToken);
        const nextState = {
            token: nextToken,
            done: nextToken === undefined || nextToken === null,
        };
        return [response, nextState];
    });
    return Stream.unfold({ token: undefined, done: false }, unfoldFn);
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
export const extractItems = (pages, itemsPath) => pages.pipe(Stream.flatMap((page) => {
    const items = getPath(page, itemsPath);
    return Stream.fromIterable(items ?? []);
}));
//# sourceMappingURL=pagination.js.map