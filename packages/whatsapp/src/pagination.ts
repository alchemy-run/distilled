import {
  getItems,
  getPath,
  isTerminalToken,
  missingPaginationConfig,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
/**
 * Graph API cursor pagination -- hand-written.
 *
 * Graph API lists take `limit` and `after`, and answer
 *
 *     { "data": [...], "paging": { "cursors": { "before", "after" }, "next": "<url>" } }
 *
 * `paging.cursors.after` is there on every page, the last one included, so
 * the cursor alone never ends a traversal (core's `paginateCursor` would ask
 * for the last page again). Another page exists only while `paging.next` is
 * present: on 2026-11-18 a two-item `message_templates` page carried
 * `cursors` and `next`, and the final page `cursors` and `previous` with no
 * `next`. This strategy passes
 * `paging.cursors.after` back as `after` until `paging.next` is absent, a page
 * comes back empty, or the cursor stops moving.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export { getItems } from "@distilled.cloud/core/pagination";

/** Where the next-page URL lives, next to `cursors` (`paging.next`). */
const nextPath = (outputToken: string): string => {
  const parts = outputToken.split(".");
  const cursors = parts.lastIndexOf("cursors");
  return [...parts.slice(0, cursors === -1 ? -1 : cursors), "next"].join(".");
};

/** Stream of pages: `after` = the previous page's cursor, while `paging.next` is set. */
export const paginateGraph: PaginationStrategy = (operation, input, pagination) => {
  const inputToken = pagination.inputToken;
  const outputToken = pagination.outputToken;
  if (!inputToken || !outputToken) {
    return missingPaginationConfig("Graph API pagination requires inputToken and outputToken");
  }
  const hasNextPath = pagination.hasNextPage ?? nextPath(outputToken);

  type State = { cursor: string | undefined; done: boolean };
  const start = typeof input[inputToken] === "string" ? (input[inputToken] as string) : undefined;

  return Stream.unfold({ cursor: start, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const response = yield* operation({
        ...input,
        ...(state.cursor ? { [inputToken]: state.cursor } : {}),
      } as typeof input);

      const cursor = getPath(response, outputToken) as string | null | undefined;
      const next = getPath(response, hasNextPath);
      const hasNext = typeof next === "string" && next !== "";
      const empty =
        pagination.items !== undefined && getItems(response, pagination.items).length === 0;
      const stuck = state.cursor !== undefined && cursor === state.cursor;

      return [
        response,
        {
          cursor: cursor ?? undefined,
          done: !hasNext || isTerminalToken(cursor) || empty || stuck,
        } satisfies State,
      ] as const;
    }),
  );
};
