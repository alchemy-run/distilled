import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEntitlementsActiveEntitlementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String,
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/entitlements/active_entitlements",
      contentType: "form-urlencoded",
    }),
  );
export type GetEntitlementsActiveEntitlementsInput =
  typeof GetEntitlementsActiveEntitlementsInput.Type;

// Output Schema
export const GetEntitlementsActiveEntitlementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        feature: Schema.Unknown,
        id: Schema.String,
        livemode: Schema.Boolean,
        lookup_key: Schema.String,
        object: Schema.Literals(["entitlements.active_entitlement"]),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetEntitlementsActiveEntitlementsOutput =
  typeof GetEntitlementsActiveEntitlementsOutput.Type;

// The operation
/**
 * List all active entitlements
 *
 * <p>Retrieve a list of active entitlements for a customer</p>
 *
 * @param customer - The ID of the customer.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetEntitlementsActiveEntitlements =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetEntitlementsActiveEntitlementsInput,
    outputSchema: GetEntitlementsActiveEntitlementsOutput,
  }));
