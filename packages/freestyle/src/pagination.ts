/**
 * Freestyle pagination — hand-written.
 *
 * Paginated list operations (`offset`/`limit` in, `totalCount` or `total`
 * out) are traversed by {@link paginateOffset}. The trait is stamped in
 * `scripts/convert.ts`.
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
 * Stream of pages using Freestyle's offset pagination: advance `offset` by
 * the number of items returned until it reaches `totalCount`/`total`, or a
 * page comes back empty.
 */
export const paginateOffset: PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  const itemsPath = pagination.items;
  const totalPath = pagination.outputToken;
  if (!inputToken || !itemsPath || !totalPath) {
    return Stream.die(
      new Error(
        "Offset pagination requires inputToken, items and outputToken (the total count field)",
      ),
    );
  }

  type State = { offset: number; done: boolean };
  const startOffset =
    typeof input[inputToken] === "number" ? (input[inputToken] as number) : 0;

  return Stream.unfold({ offset: startOffset, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = {
        ...input,
        [inputToken]: state.offset,
      } as typeof input;
      const response = yield* operation(requestPayload);
      const items = getItems(response, itemsPath);
      const total = getPath(response, totalPath);
      const nextOffset = state.offset + items.length;
      const totalNum = typeof total === "number" ? total : undefined;

      return [
        response,
        {
          offset: nextOffset,
          done:
            items.length === 0 ||
            (totalNum !== undefined && nextOffset >= totalNum),
        },
      ] as const;
    }),
  );
};
