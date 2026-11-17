/**
 * The Stripe API version calls are made with.
 *
 * Every request sends `Stripe-Version`. By default it is {@link API_VERSION},
 * the version of the spec the generated services come from, so responses
 * have the shapes the schemas describe. Without the header Stripe would use
 * the account's default version, which can be older or newer than the SDK.
 *
 * A layer can override it for a scope. Use it with care: the schemas still describe {@link API_VERSION}, so a response from
 * another version can fail to decode or carry fields the types don't list.
 *
 * @example
 * ```ts
 * GetCustomers({}).pipe(Effect.provide(Stripe.ApiVersion.of("2026-09-30.endive")));
 * ```
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

/**
 * The Stripe API version of the spec in `specs/spec-mirror-stripe`.
 * `pnpm generate stripe` sets it to the spec's `info.version`; do not edit
 * it by hand.
 */
export const API_VERSION = "2026-10-28.endive";

export class ApiVersion
  extends /*@__PURE__*/ Context.Service<ApiVersion, string>()("Stripe::ApiVersion") {}

/** Send calls in a scope with another API version, e.g. `ApiVersion.of("2026-09-30.endive")`. */
export const of = (version: string) => Layer.succeed(ApiVersion, version);
