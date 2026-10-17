/**
 * TypeSafe AI pagination — hand-written.
 *
 * TypeSafe's two operations are not paginated. The export exists so a
 * generated operation that the converter later stamps as cursor-mode can
 * pass core's {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
