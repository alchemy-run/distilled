/**
 * Jira pagination -- hand-written.
 *
 * Jira list operations page two ways (stamped by `patches/pagination.json`,
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination):
 *
 *   startAt  `startAt` + `maxResults` in; `startAt`, `maxResults`, `total`
 *            and, on most lists, `isLast` out, beside the items (`values`,
 *            `comments`, `worklogs`, ...). Nothing in the response names the
 *            next index, so {@link paginateStartAt} advances `startAt` by the
 *            items it received.
 *
 *   token    `nextPageToken` (or `cursor`) in, `nextPageToken` (or
 *            `nextPageCursor`) out, absent on the last page -- JQL search,
 *            bulk changelogs, workflow and status usages, plans. Core's
 *            {@link paginateToken}.
 */
import {
  getItems,
  getPath,
  type PaginatedTrait,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export { paginateToken } from "@distilled.cloud/core/pagination";

const toNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

/**
 * Stream of pages using `startAt` / `maxResults`.
 *
 * Stops on whichever comes first: `isLast: true`, an empty page, or the next
 * index reaching `total` (the trait's `outputToken`). A page shorter than the
 * requested `maxResults` does not stop it: Jira caps `maxResults` per
 * operation and says the cap may change, so a short page is not the last.
 */
export const paginateStartAt: PaginationStrategy = <
  Input extends Record<string, unknown>,
  Output,
  E,
  R,
>(
  operation: (input: Input) => Effect.Effect<Output, E, R>,
  input: Input,
  pagination: PaginatedTrait,
): Stream.Stream<Output, E, R> => {
  const startAtKey = pagination.inputToken ?? "startAt";

  type State = { startAt: number; done: boolean };

  return Stream.unfold(
    { startAt: toNumber(input[startAtKey]) ?? 0, done: false } as State,
    (state) =>
      Effect.gen(function* () {
        if (state.done) return undefined;

        const response = yield* operation({ ...input, [startAtKey]: state.startAt } as Input);

        const total = pagination.outputToken
          ? toNumber(getPath(response, pagination.outputToken))
          : undefined;
        const received = pagination.items ? getItems(response, pagination.items).length : 0;
        const next = state.startAt + received;

        const done =
          getPath(response, "isLast") === true ||
          received === 0 ||
          (total !== undefined && next >= total);

        return [response, { startAt: next, done }] as const;
      }),
  );
};
