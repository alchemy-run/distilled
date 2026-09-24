/**
 * Mailchimp pagination — hand-written.
 *
 * Collections take `count` (default 10, max 1000) and `offset` and answer
 * `{ <collection>: [...], total_items }`, the collection named after the
 * resource. Nothing in the response points at the next page, so the traversal
 * advances `offset` by what it received.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import {
  getPath,
  type PaginatedTrait,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";

export { getItems } from "@distilled.cloud/core/pagination";

const toNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

/**
 * Stream of pages using `offset`/`count`.
 *
 * Stops on whichever comes first: `offset` reaching `total_items`, an empty
 * page, or a page shorter than the requested `count` (the only end marker on
 * operations that report no total).
 */
export const paginateOffset: PaginationStrategy = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const offsetKey = pagination.inputToken ?? "offset";
  const countKey = pagination.pageSize ?? "count";
  const requested = toNumber(input[countKey]);

  type State = { offset: number; done: boolean };

  return Stream.unfold(
    { offset: toNumber(input[offsetKey]) ?? 0, done: false } as State,
    (state) =>
      Effect.gen(function* () {
        if (state.done) return undefined;

        const response = yield* operation({
          ...input,
          [offsetKey]: state.offset,
        } as Input);

        const total = pagination.outputToken
          ? toNumber(getPath(response, pagination.outputToken))
          : undefined;
        const items = pagination.items
          ? getPath(response, pagination.items)
          : undefined;
        const received = Array.isArray(items) ? items.length : 0;
        const next = state.offset + received;

        const done =
          received === 0 ||
          (total !== undefined && next >= total) ||
          (requested !== undefined && received < requested);

        return [response, { offset: next, done }] as const;
      }),
  );
};
