import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetForwardingRequestsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/forwarding/requests/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetForwardingRequestsIdInput =
  typeof GetForwardingRequestsIdInput.Type;

// Output Schema
export const GetForwardingRequestsIdOutput =
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
export type GetForwardingRequestsIdOutput =
  typeof GetForwardingRequestsIdOutput.Type;

// The operation
/**
 * Retrieve a ForwardingRequest
 *
 * <p>Retrieves a ForwardingRequest object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetForwardingRequestsId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetForwardingRequestsIdInput,
    outputSchema: GetForwardingRequestsIdOutput,
  }),
);
