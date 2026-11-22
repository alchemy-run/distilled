/**
 * Browserbase pagination -- hand-written.
 *
 * Browserbase list operations page two ways (stamped by
 * `patches/pagination.json`):
 *
 *   cursor  `cursor` in, `nextCursor` out (null on the last page) -- agents,
 *           runs, function secrets, labels, secrets, webhooks. Run messages
 *           page the same way on `since` / `nextSince`. Core's
 *           {@link paginateCursor}.
 *
 *   offset  `offset` + `limit` in, `total` out -- downloads, functions,
 *           builds, versions, invocations. Nothing in the response points at
 *           the next page, so {@link paginateOffset} advances `offset` by the
 *           items it received.
 */
import {
  getPath,
  type PaginatedTrait,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export { paginateCursor } from "@distilled.cloud/core/pagination";

const toNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

/**
 * Stream of pages using `offset`/`limit`.
 *
 * Stops on whichever comes first: `offset` reaching `total`, an empty page,
 * or a page shorter than the requested `limit`.
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
  const limitKey = pagination.pageSize ?? "limit";
  const requested = toNumber(input[limitKey]);

  type State = { offset: number; done: boolean };

  return Stream.unfold({ offset: toNumber(input[offsetKey]) ?? 0, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const response = yield* operation({ ...input, [offsetKey]: state.offset } as Input);

      const total = pagination.outputToken
        ? toNumber(getPath(response, pagination.outputToken))
        : undefined;
      const items = pagination.items ? getPath(response, pagination.items) : undefined;
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
