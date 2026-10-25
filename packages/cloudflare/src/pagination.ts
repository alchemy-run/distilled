import * as Pagination from "@distilled.cloud/core/pagination";
/**
 * Cloudflare pagination -- hand-written.
 *
 * Paginated operations use `CloudflarePaginatedProtocol` (see ./protocol.ts),
 * which keeps the envelope's `result_info` on the response as `resultInfo`
 * alongside the `result` items, and the {@link cloudflarePaginate} strategy,
 * which knows how Cloudflare's page-mode traversal terminates.
 */
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";

// =============================================================================
// ResultInfo -- the envelope's `result_info`, shared by every paginated op
// =============================================================================

export interface ResultInfoCursors {
  readonly after?: string | null;
  readonly before?: string | null;
}

/**
 * The v4 envelope's `result_info` block (camelCased by the paginated
 * protocol). Cloudflare varies the exact fields per endpoint -- page-mode
 * endpoints report `page`/`perPage`/`totalCount`, cursor-mode endpoints
 * report `cursor` or `cursors` -- so all fields are optional here.
 */
export interface ResultInfo {
  readonly count?: number | null;
  readonly page?: number | null;
  readonly perPage?: number | null;
  readonly totalCount?: number | null;
  readonly totalPages?: number | null;
  readonly cursor?: string | null;
  readonly cursors?: ResultInfoCursors | null;
}

export const ResultInfo: S.Schema<ResultInfo> = /*@__PURE__*/ S.Struct({
  count: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.Number)),
  page: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.Number)),
  perPage: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.Number)),
  totalCount: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.Number)),
  totalPages: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.Number)),
  cursor: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.String)),
  cursors: /*@__PURE__*/ S.optional(
    /*@__PURE__*/ S.NullOr(
      /*@__PURE__*/ S.Struct({
        after: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.String)),
        before: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.NullOr(S.String)),
      }),
    ),
  ),
}) as any as S.Schema<ResultInfo>;

// =============================================================================
// Cloudflare pagination strategy
// =============================================================================

/**
 * Page-mode traversal for Cloudflare: request page N, stop on the first page
 * with no items (Cloudflare's `result_info.page` reports the CURRENT page,
 * not the next one, so there is no next-token to follow). Guards against
 * request schemas that don't carry the page param (the server would return
 * page 1 forever): if the server reports a page other than the one
 * requested, stop without re-emitting the duplicate page.
 *
 * When `result_info` shows the listing is exhausted, stop without asking for
 * the empty page: either `total_pages` says this was the last page, or the
 * page came back short of `per_page` and the items seen so far reach
 * `total_count`. A short page alone is not trusted -- some endpoints omit
 * `result_info` or cap page sizes below what they report -- so the count
 * check needs both signals.
 */
const paginatePageByItems: Pagination.PaginationStrategy = (operation, input, pagination) => {
  const inputToken = pagination.inputToken;
  if (!inputToken) {
    return Stream.die(new Error("Cloudflare page pagination requires an inputToken"));
  }

  type State = { page: number; seen: number; done: boolean };
  const startPage = typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;
  const requestedPageSize =
    pagination.pageSize && typeof input[pagination.pageSize] === "number"
      ? (input[pagination.pageSize] as number)
      : undefined;

  return Stream.unfold({ page: startPage, seen: 0, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = { ...input, [inputToken]: state.page };
      const response = yield* operation(requestPayload);
      const items = Pagination.getPath(response, pagination.items ?? "result") as
        | readonly unknown[]
        | undefined;

      const reportedPage = Pagination.getPath(response, "resultInfo.page") as
        | number
        | null
        | undefined;
      if (
        state.page !== startPage &&
        typeof reportedPage === "number" &&
        reportedPage !== state.page
      ) {
        return undefined;
      }

      const count = (items ?? []).length;
      const seen = state.seen + count;
      const info = Pagination.getPath(response, "resultInfo") as ResultInfo | null | undefined;
      const perPage = info?.perPage ?? requestedPageSize;
      const lastPage =
        (typeof info?.totalPages === "number" && state.page >= info.totalPages) ||
        (typeof info?.totalCount === "number" &&
          typeof perPage === "number" &&
          count < perPage &&
          seen >= info.totalCount);

      return [response, { page: state.page + 1, seen, done: count === 0 || lastPage }] as const;
    }),
  );
};

/** Dispatch on the operation's pagination mode, Cloudflare-style. */
export const cloudflarePaginate: Pagination.PaginationStrategy = (operation, input, pagination) => {
  switch (pagination.mode) {
    case "single":
      return Pagination.paginateSingle(operation, input, pagination);
    case "page":
      return paginatePageByItems(operation, input, pagination);
    case "cursor":
      return Pagination.paginateCursor(operation, input, pagination);
    default:
      return Pagination.paginateWithDefaults(operation, input, pagination);
  }
};
