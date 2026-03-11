import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetForwardingRequestsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/forwarding/requests",
      contentType: "form-urlencoded",
    }),
  );
export type GetForwardingRequestsInput = typeof GetForwardingRequestsInput.Type;

// Output Schema
export const GetForwardingRequestsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetForwardingRequestsOutput =
  typeof GetForwardingRequestsOutput.Type;

// The operation
/**
 * List all ForwardingRequests
 *
 * <p>Lists all ForwardingRequest objects.</p>
 *
 * @param created - Similar to other List endpoints, filters results based on created timestamp. You can pass gt, gte, lt, and lte timestamp values.
 * @param ending_before - A pagination cursor to fetch the previous page of the list. The value must be a ForwardingRequest ID.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A pagination cursor to fetch the next page of the list. The value must be a ForwardingRequest ID.
 */
export const GetForwardingRequests = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetForwardingRequestsInput,
    outputSchema: GetForwardingRequestsOutput,
  }),
);
