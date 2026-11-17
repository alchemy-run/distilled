/**
 * Claude Platform (Anthropic) pagination -- hand-written.
 *
 * Lists page one of two ways. Models and message batches take `after_id`
 * and answer `{ data, has_more, last_id }`, walked by core's
 * {@link paginateRelay} while `has_more` is true. Every other list takes
 * `page` and answers `{ data, next_page }`, walked by core's
 * {@link paginateCursor} until `next_page` is null.
 */
export { paginateCursor, paginateRelay } from "@distilled.cloud/core/pagination";
