/**
 * OpenRouter pagination — hand-written.
 *
 * OpenRouter's list endpoints page with `offset`/`limit` query parameters
 * that the caller drives directly; no operation is generated as an
 * auto-paginating stream. Core's strategies are re-exported for callers
 * that want to build one.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
