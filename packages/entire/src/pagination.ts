/**
 * Entire pagination -- hand-written.
 *
 * Entire's paginated operations use one of two cursor spellings: Core and
 * the cell's git routes take `pageToken` + `pageSize` and answer
 * `nextPageToken`; the rest of the cell takes `cursor` (+ `per_page` or
 * `limit`) and answers `next_cursor`. Both are empty or absent on the last
 * page. scripts/convert.ts stamps the trait; generated operations pass
 * core's {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
