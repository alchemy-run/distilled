import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetConfirmationTokensConfirmationTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    confirmation_token: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/confirmation_tokens/{confirmation_token}",
      contentType: "form-urlencoded",
    }),
  );
export type GetConfirmationTokensConfirmationTokenInput =
  typeof GetConfirmationTokensConfirmationTokenInput.Type;

// Output Schema
export const GetConfirmationTokensConfirmationTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    expires_at: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    mandate_data: Schema.optional(Schema.Unknown),
    object: Schema.Literals(["confirmation_token"]),
    payment_intent: Schema.NullOr(Schema.String),
    payment_method_options: Schema.Unknown,
    payment_method_preview: Schema.Unknown,
    return_url: Schema.NullOr(Schema.String),
    setup_future_usage: Schema.NullOr(
      Schema.Literals(["off_session", "on_session"]),
    ),
    setup_intent: Schema.NullOr(Schema.String),
    shipping: Schema.Unknown,
    use_stripe_sdk: Schema.Boolean,
  });
export type GetConfirmationTokensConfirmationTokenOutput =
  typeof GetConfirmationTokensConfirmationTokenOutput.Type;

// The operation
/**
 * Retrieve a ConfirmationToken
 *
 * <p>Retrieves an existing ConfirmationToken object</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetConfirmationTokensConfirmationToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetConfirmationTokensConfirmationTokenInput,
    outputSchema: GetConfirmationTokensConfirmationTokenOutput,
  }));
