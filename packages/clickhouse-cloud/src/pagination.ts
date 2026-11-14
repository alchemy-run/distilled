/**
 * ClickHouse Cloud pagination -- hand-written.
 *
 * Cursor-paginated lists take `cursor` and `limit` and answer with the page
 * under `result` beside `nextCursor` (`null` on the last page). Generated
 * operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated`; `patches/<service>/pagination.json` marks them.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
