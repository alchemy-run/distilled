import {
  getPath,
  missingPaginationConfig,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
/**
 * Mux pagination -- hand-written.
 *
 * Mux lists take `page` (1-based) and `limit` and answer `{ data: [...] }`.
 * Nothing in the response names the next page, and most lists report no
 * total, so core's `paginatePageNumber` (which reads the next page from the
 * response) cannot drive them. This strategy does what Mux's official SDKs
 * do (`muxinc/mux-ts` `src/core/pagination.ts`: `BasePage` asks for
 * `page + 1` and stops once a page has no items): request `page`, `page+1`,
 * ... until a page comes back empty.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export { getItems } from "@distilled.cloud/core/pagination";

/** A copy of `obj` with the member at `path` replaced by `value`. */
const setPath = (obj: unknown, [head, ...rest]: ReadonlyArray<string>, value: unknown): unknown => {
  const record = typeof obj === "object" && obj !== null ? (obj as Record<string, unknown>) : {};
  return { ...record, [head!]: rest.length === 0 ? value : setPath(record[head!], rest, value) };
};

/**
 * Stream of pages: `page`, `page+1`, ... until a page has no items.
 *
 * A page whose items member is present but not an array has no items. Mux
 * sends `{ "data": {} }` for an empty `listDrmConfigurations`; that page is
 * emitted with `data: []` so `.items()` never yields the `{}` as an item.
 */
export const paginatePage: PaginationStrategy = (operation, input, pagination) => {
  const inputToken = pagination.inputToken;
  const itemsPath = pagination.items;
  if (!inputToken || !itemsPath) {
    return missingPaginationConfig("Mux page pagination requires inputToken and items");
  }

  type State = { page: number; done: boolean };
  const start = typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;

  return Stream.unfold({ page: start, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const response = yield* operation({ ...input, [inputToken]: state.page } as typeof input);
      const items = getPath(response, itemsPath);
      const isList = Array.isArray(items);
      const page =
        isList || items == null
          ? response
          : (setPath(response, itemsPath.split("."), []) as typeof response);

      return [
        page,
        { page: state.page + 1, done: !isList || items.length === 0 } satisfies State,
      ] as const;
    }),
  );
};
