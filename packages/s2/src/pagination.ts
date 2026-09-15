/**
 * S2 (s2.dev) pagination — hand-written.
 *
 * Every paginated S2 list operation pages the same way: `start_after` and
 * `limit` in, and a response carrying the collection (`access_tokens`,
 * `basins`, `streams`) beside a `has_more` boolean. There is no cursor on
 * the response — the next page's `start_after` is the IDENTITY OF THE LAST
 * ITEM returned (the access token's `id`, the basin's/stream's `name`), so
 * none of core's token/cursor strategies apply. Generated operations pass
 * {@link paginateStartAfter} to `API.makePaginated`, with the trait's
 * `outputToken` repurposed as the item's cursor FIELD name.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import {
  getItems,
  getPath,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";

export type {
  PaginatedTrait,
  PaginationStrategy,
} from "@distilled.cloud/core/pagination";

/**
 * Stream of pages using S2's start-after pagination: feed the last item's
 * cursor field back as `start_after` for as long as `has_more` is true.
 */
export const paginateStartAfter: PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  const itemsPath = pagination.items;
  // The paginated trait has no "item cursor field" slot; S2 stamps it in
  // `outputToken` (there is no response cursor it could mean instead).
  const cursorField = pagination.outputToken;
  const hasMorePath = pagination.hasNextPage ?? "has_more";
  if (!inputToken || !itemsPath || !cursorField) {
    return Stream.die(
      new Error(
        "Start-after pagination requires inputToken, items and outputToken (the item's cursor field)",
      ),
    );
  }

  type State = { cursor: string | undefined; done: boolean };
  const startCursor =
    typeof input[inputToken] === "string"
      ? (input[inputToken] as string)
      : undefined;

  return Stream.unfold({ cursor: startCursor, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = {
        ...input,
        ...(state.cursor ? { [inputToken]: state.cursor } : {}),
      } as typeof input;

      const response = yield* operation(requestPayload);

      const items = getItems(response, itemsPath);
      const last = items[items.length - 1];
      const nextCursor =
        last !== null && typeof last === "object"
          ? ((last as Record<string, unknown>)[cursorField] as
              | string
              | undefined)
          : undefined;
      const hasMore = getPath(response, hasMorePath) === true;

      const nextState: State = {
        cursor: nextCursor,
        // A page that reports more but yields no new cursor would loop
        // forever re-requesting the same window — stop instead.
        done:
          !hasMore ||
          items.length === 0 ||
          nextCursor === undefined ||
          nextCursor === state.cursor,
      };

      return [response, nextState] as const;
    }),
  );
};
