import { getPath, type PaginationStrategy } from "@distilled.cloud/core/pagination";
/**
 * Scaleway pagination — hand-written.
 *
 * Most Scaleway list operations page by NUMBER: `?page=N&page_size=M` in
 * (Instance v1 spells the size `per_page`), the collection beside
 * `total_count` out. Core's `paginatePageNumber` expects the NEXT page
 * number in the response, which Scaleway never sends; this strategy does
 * what the official SDKs' `fetchPaginated` does
 * (scaleway-sdk-js `packages/client/src/scw/fetch/resource-paginator.ts`):
 * size the pages by the first one and request `page+1` until
 * `ceil(total_count / first page length)` pages are read.
 *
 * Instance v1 answers `total_count` as the `X-Total-Count` header; the
 * protocol folds it into the body before this strategy reads it.
 *
 * The few lists that page by cursor (`page_token` in, `next_page_token`
 * out — Audit Trail, Cockpit, Key Manager, …) use core's `paginateToken`.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export type { PaginatedTrait, PaginationStrategy } from "@distilled.cloud/core/pagination";
export { paginateToken } from "@distilled.cloud/core/pagination";

/**
 * Stream of pages using Scaleway's `page` / `total_count` envelope: request
 * `page`, `page+1`, … until the pages read cover `total_count` or a page
 * comes back empty.
 */
export const paginateByTotalCount: PaginationStrategy = (operation, input, pagination) => {
  const inputToken = pagination.inputToken;
  const totalCountPath = pagination.outputToken;
  const itemsPath = pagination.items;
  if (!inputToken || !totalCountPath || !itemsPath) {
    return Stream.die(
      new Error("Total-count pagination requires inputToken, outputToken and items"),
    );
  }

  type State = { page: number; lastPage: number | undefined; done: boolean };
  const startPage = typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;

  return Stream.unfold({ page: startPage, lastPage: undefined, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const response = yield* operation({ ...input, [inputToken]: state.page } as typeof input);

      const items = getPath(response, itemsPath) as readonly unknown[] | undefined;
      const length = Array.isArray(items) ? items.length : 0;
      let lastPage = state.lastPage;
      if (lastPage === undefined) {
        const total = getPath(response, totalCountPath);
        // Sized by the first page read, as the official SDKs do: the server
        // may cap `page_size` below what was asked.
        lastPage = typeof total === "number" && length > 0 ? Math.ceil(total / length) : state.page;
      }
      const done = length === 0 || state.page >= lastPage;

      return [response, { page: state.page + 1, lastPage, done } satisfies State] as const;
    }),
  );
};
