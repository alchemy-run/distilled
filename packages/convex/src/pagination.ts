/**
 * Convex pagination -- hand-written.
 *
 * Paginated list operations (`cursor`/`limit` in, `pagination.nextCursor`
 * out) are traversed by core's {@link paginateCursor}. The trait is stamped in
 * `scripts/generate.ts`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
