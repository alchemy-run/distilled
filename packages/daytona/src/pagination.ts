/**
 * Daytona pagination -- hand-written.
 *
 * Audit logs page by token (`nextToken` in and out), sandboxes and secrets
 * by cursor (`cursor` in, `nextCursor` out), and snapshots and sandbox
 * telemetry by page number; items are under `items` everywhere. Generated
 * operations pass the matching core strategy to `API.makePaginated`.
 */
export {
  paginateCursor,
  paginatePageNumber,
  paginateToken,
} from "@distilled.cloud/core/pagination";
