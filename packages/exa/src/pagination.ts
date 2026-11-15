/**
 * Exa pagination -- hand-written.
 *
 * Exa's list operations are cursor-mode (`cursor` in, `nextCursor` out with
 * the page in `data`, null on the last page); generated operations pass
 * core's {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
