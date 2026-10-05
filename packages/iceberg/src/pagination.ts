/**
 * Iceberg pagination — hand-written.
 *
 * List routes page by token: `pageToken` in, `next-page-token`
 * (`next_page_token`) out, items under `namespaces` or `identifiers`. A
 * server that does not paginate omits the token, which ends the stream after
 * one page. The trait is stamped in scripts/convert.ts; generated operations
 * pass core's {@link paginateToken} strategy to `API.makePaginated`.
 */
export { paginateToken } from "@distilled.cloud/core/pagination";
