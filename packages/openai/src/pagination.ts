/**
 * OpenAI pagination — hand-written.
 *
 * Two list styles:
 *
 * - **`after` cursors** (most lists): `GET /files?after=<id>&limit=…` returns
 *   `{ data, has_more, … }`. The next cursor is `last_id`, `next` (Admin API
 *   groups/roles), or — where neither is returned (fine-tuning jobs/events)
 *   — the last item's `id`. Unlike a plain cursor, `last_id` is still set on
 *   the final page, so traversal stops on `has_more: false`, not on a
 *   missing cursor. {@link paginateAfter}.
 * - **`page` cursors** (Admin usage/costs): `next_page` comes back as the
 *   next `page` until it is null — core's {@link paginateCursor}.
 */
import { getPath, type PaginatedTrait } from "@distilled.cloud/core/pagination";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export { paginateCursor } from "@distilled.cloud/core/pagination";

const lastItemId = (response: unknown, itemsPath: string): string | undefined => {
  const items = getPath(response, itemsPath);
  if (!Array.isArray(items) || items.length === 0) return undefined;
  const id = (items[items.length - 1] as { id?: unknown } | null)?.id;
  return typeof id === "string" ? id : undefined;
};

/** Stream of pages for OpenAI's `after` + `has_more` list convention. */
export const paginateAfter = <Input extends Record<string, unknown>, Output, E, R>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const inputToken = pagination.inputToken ?? "after";
  const itemsPath = pagination.items ?? "data";
  type State = { readonly cursor: string | undefined; readonly done: boolean };
  const start = typeof input[inputToken] === "string" ? (input[inputToken] as string) : undefined;

  return Stream.unfold({ cursor: start, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;
      const response = yield* operation({
        ...input,
        ...(state.cursor !== undefined ? { [inputToken]: state.cursor } : {}),
      } as Input);
      const token = pagination.outputToken ? getPath(response, pagination.outputToken) : undefined;
      const next =
        typeof token === "string" && token !== "" ? token : lastItemId(response, itemsPath);
      const nextState: State = {
        cursor: next,
        // Stop on has_more:false, on a missing cursor, or on a cursor that
        // didn't advance (a server bug would otherwise loop forever).
        done: getPath(response, "has_more") !== true || next === undefined || next === state.cursor,
      };
      return [response, nextState] as const;
    }),
  );
};
