/**
 * @distilled.cloud/revenuecat -- RevenueCat REST API v2 SDK for Effect.
 *
 * @example
 * ```ts
 * import * as RevenueCat from "@distilled.cloud/revenuecat";
 *
 * const customer = yield* RevenueCat.getCustomer({ project_id, customer_id });
 * ```
 */
export * from "./credentials.ts";
export * from "./errors.ts";
export * as T from "./traits.ts";
export {
  RevenueCatProtocol,
  type RevenueCatOpError,
  type RevenueCatOpContext,
} from "./protocol.ts";
export { paginateNextPage } from "./pagination.ts";
export * as Retry from "./retry.ts";
export * from "./services/revenuecat.ts";
export {
  BadRequest,
  Conflict,
  Forbidden,
  NotFound,
  UnprocessableEntity,
} from "./services/revenuecat.ts";
