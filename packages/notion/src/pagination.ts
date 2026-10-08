/**
 * Notion pagination — hand-written.
 *
 * Notion's paginated operations take `start_cursor` + `page_size` (query
 * string on GETs, JSON body on POST queries) and answer `{ results,
 * has_more, next_cursor }`, with `next_cursor` `null` on the last page.
 * scripts/convert.ts stamps the trait; generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
