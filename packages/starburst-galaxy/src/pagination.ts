/**
 * Starburst Galaxy pagination -- hand-written.
 *
 * List operations page by token: `pageToken` in, `nextPageToken` out (`""`
 * on the last page), items under `result`. `scripts/convert.ts` stamps
 * `smithy.api#paginated` on them; generated operations pass core's
 * {@link paginateToken} strategy to `API.makePaginated`.
 */
export { paginateToken } from "@distilled.cloud/core/pagination";
