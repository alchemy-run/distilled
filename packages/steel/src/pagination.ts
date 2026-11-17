/**
 * Steel pagination -- hand-written.
 *
 * Steel's paginated list (`sessions.listSessions`) is cursor-mode:
 * `cursorId` in, `nextCursor` out, null on the last page. Generated
 * operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
