/**
 * Microsoft Graph pagination -- hand-written.
 *
 * Graph list operations (`x-ms-pageable` in the spec) return a page of
 * `value` items plus an `@odata.nextLink` URL while more pages remain.
 * Generated operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated` with the `odataNextLink` output as the cursor and the
 * synthetic `nextLink` input as the cursor slot; the protocol requests that
 * URL as-is (see `protocol.ts`).
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
