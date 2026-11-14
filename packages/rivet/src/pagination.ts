/**
 * Rivet pagination -- hand-written.
 *
 * Rivet's list operations are cursor-mode (`cursor` in, `pagination.cursor`
 * out, null on the last page); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
