import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCustomerSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    components: Schema.Struct({
      buy_button: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
        }),
      ),
      customer_sheet: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
          features: Schema.optional(
            Schema.Struct({
              payment_method_allow_redisplay_filters: Schema.optional(
                Schema.Array(
                  Schema.Literals(["always", "limited", "unspecified"]),
                ),
              ),
              payment_method_remove: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
            }),
          ),
        }),
      ),
      mobile_payment_element: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
          features: Schema.optional(
            Schema.Struct({
              payment_method_allow_redisplay_filters: Schema.optional(
                Schema.Array(
                  Schema.Literals(["always", "limited", "unspecified"]),
                ),
              ),
              payment_method_redisplay: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              payment_method_remove: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              payment_method_save: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              payment_method_save_allow_redisplay_override: Schema.optional(
                Schema.Literals(["always", "limited", "unspecified"]),
              ),
            }),
          ),
        }),
      ),
      payment_element: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
          features: Schema.optional(
            Schema.Struct({
              payment_method_allow_redisplay_filters: Schema.optional(
                Schema.Array(
                  Schema.Literals(["always", "limited", "unspecified"]),
                ),
              ),
              payment_method_redisplay: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              payment_method_redisplay_limit: Schema.optional(Schema.Number),
              payment_method_remove: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              payment_method_save: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              payment_method_save_usage: Schema.optional(
                Schema.Literals(["off_session", "on_session"]),
              ),
            }),
          ),
        }),
      ),
      pricing_table: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
        }),
      ),
    }),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/customer_sessions",
      contentType: "form-urlencoded",
    }),
  );
export type PostCustomerSessionsInput = typeof PostCustomerSessionsInput.Type;

// Output Schema
export const PostCustomerSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_secret: Schema.String,
    components: Schema.optional(
      Schema.Struct({
        buy_button: Schema.Struct({
          enabled: Schema.Boolean,
        }),
        customer_sheet: Schema.Struct({
          enabled: Schema.Boolean,
          features: Schema.Unknown,
        }),
        mobile_payment_element: Schema.Struct({
          enabled: Schema.Boolean,
          features: Schema.Unknown,
        }),
        payment_element: Schema.Struct({
          enabled: Schema.Boolean,
          features: Schema.Unknown,
        }),
        pricing_table: Schema.Struct({
          enabled: Schema.Boolean,
        }),
      }),
    ),
    created: Schema.Number,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    expires_at: Schema.Number,
    livemode: Schema.Boolean,
    object: Schema.Literals(["customer_session"]),
  });
export type PostCustomerSessionsOutput = typeof PostCustomerSessionsOutput.Type;

// The operation
/**
 * Create a Customer Session
 *
 * <p>Creates a Customer Session object that includes a single-use client secret that you can use on your front-end to grant client-side API access for certain customer resources.</p>
 */
export const PostCustomerSessions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostCustomerSessionsInput,
    outputSchema: PostCustomerSessionsOutput,
  }),
);
