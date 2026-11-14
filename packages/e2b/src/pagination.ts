/**
 * E2B pagination -- hand-written.
 *
 * List endpoints page by token: `nextToken` in, the `X-Next-Token` response
 * header out (bound to the output's `nextToken`), items under `items`.
 * `scripts/convert.ts` stamps `smithy.api#paginated` on them; generated
 * operations pass core's {@link paginateToken} to `API.makePaginated`.
 */
export { paginateToken } from "@distilled.cloud/core/pagination";
