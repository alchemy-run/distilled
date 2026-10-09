/**
 * Anthropic pagination — hand-written.
 *
 * List operations page in one of two shapes, stamped as a `mode`-tagged
 * `smithy.api#paginated` trait by scripts/convert.ts:
 *
 *   • relay — `after_id` in, `{ data, has_more, last_id }` out (models,
 *     message batches, admin users/invites/workspaces/API keys);
 *   • cursor — `page` in, `{ data, next_page }` out (files, skills, managed
 *     agents, admin reports).
 *
 * Generated operations pass core's {@link paginateWithDefaults}, which
 * dispatches on the trait's `mode`, to `API.makePaginated`.
 */
export {
  paginateWithDefaults,
  paginateCursor,
  paginateRelay,
  getItems,
  getPath,
  type PaginatedTrait,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
