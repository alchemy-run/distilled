/**
 * STACKIT pagination — hand-written.
 *
 * Several STACKIT list operations page by NUMBER: `?page=N&pageSize=M` in,
 * and a response carrying the collection beside `totalPages` (DNS zones /
 * record sets, and the same envelope on other products). Core's
 * `paginatePageNumber` treats `outputToken` as the NEXT page number, so
 * pointing it at `totalPages` would jump to the last page; this strategy
 * advances by one until `page >= totalPages`.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import {
  getPath,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";

export type {
  PaginatedTrait,
  PaginationStrategy,
} from "@distilled.cloud/core/pagination";

/**
 * Stream of pages using STACKIT's `page` / `totalPages` envelope: request
 * `page`, `page+1`, … while `page < totalPages` and the collection is
 * non-empty.
 */
export const paginateByTotalPages: PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  const totalPagesPath = pagination.outputToken;
  const itemsPath = pagination.items;
  if (!inputToken || !totalPagesPath) {
    return Stream.die(
      new Error(
        "Total-pages pagination requires inputToken and outputToken (totalPages)",
      ),
    );
  }

  type State = { page: number; done: boolean };
  const startPage =
    typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;

  return Stream.unfold({ page: startPage, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = {
        ...input,
        [inputToken]: state.page,
      } as typeof input;
      const response = yield* operation(requestPayload);

      const totalPages = getPath(response, totalPagesPath);
      const items = itemsPath
        ? (getPath(response, itemsPath) as readonly unknown[] | undefined)
        : undefined;
      const exhausted =
        typeof totalPages !== "number" ||
        state.page >= totalPages ||
        (items !== undefined && items.length === 0);

      return [
        response,
        { page: state.page + 1, done: exhausted } satisfies State,
      ] as const;
    }),
  );
};
