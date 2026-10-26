/**
 * GitHub pagination -- hand-written.
 *
 * GitHub's list operations page by number (`page` / `per_page` in) and most
 * return a bare array, with the next page only in the `Link` header.
 * Generated operations pass core's page-number strategy, which advances
 * `page` and stops on an empty page or one shorter than `per_page`.
 */
export { paginatePageNumber } from "@distilled.cloud/core/pagination";
