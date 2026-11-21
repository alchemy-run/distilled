/**
 * Twitch pagination -- hand-written.
 *
 * Helix pages by cursor: the `after` query parameter in, the next cursor in
 * the response's `pagination.cursor` (on a few endpoints, a bare `pagination`
 * string), absent or empty on the last page. Generated operations pass core's
 * cursor strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
