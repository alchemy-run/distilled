import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostForwardingRequestsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    payment_method: Schema.String,
    replacements: Schema.Array(
      Schema.Literals([
        "card_cvc",
        "card_expiry",
        "card_number",
        "cardholder_name",
        "request_signature",
      ]),
    ),
    request: Schema.optional(
      Schema.Struct({
        body: Schema.optional(Schema.String),
        headers: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.String,
              value: Schema.String,
            }),
          ),
        ),
      }),
    ),
    url: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/forwarding/requests",
      contentType: "form-urlencoded",
    }),
  );
export type PostForwardingRequestsInput =
  typeof PostForwardingRequestsInput.Type;

// Output Schema
export const PostForwardingRequestsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.optional(
      Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    ),
    object: Schema.Literals(["forwarding.request"]),
    payment_method: Schema.String,
    replacements: Schema.Array(
      Schema.Literals([
        "card_cvc",
        "card_expiry",
        "card_number",
        "cardholder_name",
        "request_signature",
      ]),
    ),
    request_context: Schema.Unknown,
    request_details: Schema.Unknown,
    response_details: Schema.Unknown,
    url: Schema.NullOr(Schema.String),
  });
export type PostForwardingRequestsOutput =
  typeof PostForwardingRequestsOutput.Type;

// The operation
/**
 * Create a ForwardingRequest
 *
 * <p>Creates a ForwardingRequest object.</p>
 */
export const PostForwardingRequests = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostForwardingRequestsInput,
    outputSchema: PostForwardingRequestsOutput,
  }),
);
