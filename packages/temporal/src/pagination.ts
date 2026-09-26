/**
 * Temporal pagination — hand-written.
 *
 * Temporal's paginated list operations are cursor-mode (the Cloud Ops
 * reads take `pageToken` and answer `nextPageToken`; an empty token ends
 * the stream); generated operations pass core's {@link paginateCursor}
 * strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
