/**
 * Temporal Cloud pagination — hand-written.
 *
 * Every Cloud Ops collection read is cursor-mode (`pageToken` in,
 * `nextPageToken` out; an empty token ends the stream); generated operations
 * pass core's {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
