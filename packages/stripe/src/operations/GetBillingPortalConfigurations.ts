import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingPortalConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.optional(Schema.Boolean),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    is_default: Schema.optional(Schema.Boolean),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing_portal/configurations",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingPortalConfigurationsInput =
  typeof GetBillingPortalConfigurationsInput.Type;

// Output Schema
export const GetBillingPortalConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        active: Schema.Boolean,
        application: Schema.Unknown,
        business_profile: Schema.Struct({
          headline: Schema.NullOr(Schema.String),
          privacy_policy_url: Schema.NullOr(Schema.String),
          terms_of_service_url: Schema.NullOr(Schema.String),
        }),
        created: Schema.Number,
        default_return_url: Schema.NullOr(Schema.String),
        features: Schema.Struct({
          customer_update: Schema.Struct({
            allowed_updates: Schema.Array(
              Schema.Literals([
                "address",
                "email",
                "name",
                "phone",
                "shipping",
                "tax_id",
              ]),
            ),
            enabled: Schema.Boolean,
          }),
          invoice_history: Schema.Struct({
            enabled: Schema.Boolean,
          }),
          payment_method_update: Schema.Struct({
            enabled: Schema.Boolean,
            payment_method_configuration: Schema.NullOr(Schema.String),
          }),
          subscription_cancel: Schema.Struct({
            cancellation_reason: Schema.Struct({
              enabled: Schema.Boolean,
              options: Schema.Array(
                Schema.Literals([
                  "customer_service",
                  "low_quality",
                  "missing_features",
                  "other",
                  "switched_service",
                  "too_complex",
                  "too_expensive",
                  "unused",
                ]),
              ),
            }),
            enabled: Schema.Boolean,
            mode: Schema.Literals(["at_period_end", "immediately"]),
            proration_behavior: Schema.Literals([
              "always_invoice",
              "create_prorations",
              "none",
            ]),
          }),
          subscription_update: Schema.Struct({
            billing_cycle_anchor: Schema.NullOr(
              Schema.Literals(["now", "unchanged"]),
            ),
            default_allowed_updates: Schema.Array(
              Schema.Literals(["price", "promotion_code", "quantity"]),
            ),
            enabled: Schema.Boolean,
            products: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    adjustable_quantity: Schema.Struct({
                      enabled: Schema.Boolean,
                      maximum: Schema.NullOr(Schema.Number),
                      minimum: Schema.Number,
                    }),
                    prices: Schema.Array(Schema.String),
                    product: Schema.String,
                  }),
                ),
              ),
            ),
            proration_behavior: Schema.Literals([
              "always_invoice",
              "create_prorations",
              "none",
            ]),
            schedule_at_period_end: Schema.Struct({
              conditions: Schema.Array(
                Schema.Struct({
                  type: Schema.Literals([
                    "decreasing_item_amount",
                    "shortening_interval",
                  ]),
                }),
              ),
            }),
            trial_update_behavior: Schema.Literals([
              "continue_trial",
              "end_trial",
            ]),
          }),
        }),
        id: Schema.String,
        is_default: Schema.Boolean,
        livemode: Schema.Boolean,
        login_page: Schema.Struct({
          enabled: Schema.Boolean,
          url: Schema.NullOr(Schema.String),
        }),
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        name: Schema.NullOr(Schema.String),
        object: Schema.Literals(["billing_portal.configuration"]),
        updated: Schema.Number,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetBillingPortalConfigurationsOutput =
  typeof GetBillingPortalConfigurationsOutput.Type;

// The operation
/**
 * List portal configurations
 *
 * <p>Returns a list of configurations that describe the functionality of the customer portal.</p>
 *
 * @param active - Only return configurations that are active or inactive (e.g., pass `true` to only list active configurations).
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param is_default - Only return the default or non-default configurations (e.g., pass `true` to only list the default configuration).
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetBillingPortalConfigurations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetBillingPortalConfigurationsInput,
    outputSchema: GetBillingPortalConfigurationsOutput,
  }));
