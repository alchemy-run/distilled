/**
 * Daytona pagination — hand-written.
 *
 * Audit logs page by token (`nextToken` in and out, items under `items`).
 * The OpenAPI converter stamps `smithy.api#paginated` when it recognises
 * that shape; generated operations pass core's {@link paginateToken}
 * strategy to `API.makePaginated`.
 */
export { paginateToken } from "@distilled.cloud/core/pagination";
