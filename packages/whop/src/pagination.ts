/**
 * Whop pagination — hand-written.
 *
 * Every paginated Whop list — versioned and legacy alike — is a RELAY
 * connection: `?first=N&after=<cursor>` in, and
 *
 * ```json
 * {
 *   "data": [ … ],
 *   "page_info": {
 *     "start_cursor": "WyJjdXJzb3IiLDFd",
 *     "end_cursor": "WyJjdXJzb3IiLDFd",
 *     "has_next_page": false,
 *     "has_previous_page": false
 *   }
 * }
 * ```
 *
 * back. Generated operations pass core's {@link paginateRelay} strategy to
 * `API.makePaginated`, which follows `page_info.end_cursor` for as long as
 * `page_info.has_next_page` holds. The boolean is load-bearing: the LAST
 * page still carries an `end_cursor` (it points at the final row, not at
 * "nothing left"), so a cursor-only traversal would never terminate.
 *
 * `.pages(input)` streams whole responses; `.items(input)` streams the rows
 * out of `data`.
 *
 * Backwards paging (`last` / `before`) is left as plain input fields —
 * walking back from the end is a different traversal, and mixing it into the
 * forward stream would silently change what `.items()` yields.
 *
 * @example
 * ```ts
 * import * as Stream from "effect/Stream";
 * import { listPlans } from "@distilled.cloud/whop/plans";
 *
 * // every plan across every page, one at a time
 * yield* listPlans.items({ account_id: "biz_XXXXXXXX", first: 100 }).pipe(
 *   Stream.runForEach((plan) => Console.log(plan.id)),
 * );
 * ```
 */
export {
  paginateRelay,
  extractItems,
  getItems,
  getPath,
  type PaginatedTrait,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
