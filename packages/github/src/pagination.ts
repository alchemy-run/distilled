/**
 * GitHub pagination -- hand-written.
 *
 * GitHub's list operations take `page` / `per_page` and return the next
 * page's URL in the `Link` response header (most return a bare array, with
 * no token in the body). Generated operations pass core's link strategy,
 * which follows `rel="next"` until it is absent.
 */
export { paginateLink } from "@distilled.cloud/core/pagination";
