import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEntitlementsActiveEntitlementsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/entitlements/active_entitlements/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetEntitlementsActiveEntitlementsIdInput =
  typeof GetEntitlementsActiveEntitlementsIdInput.Type;

// Output Schema
export const GetEntitlementsActiveEntitlementsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    feature: Schema.Unknown,
    id: Schema.String,
    livemode: Schema.Boolean,
    lookup_key: Schema.String,
    object: Schema.Literals(["entitlements.active_entitlement"]),
  });
export type GetEntitlementsActiveEntitlementsIdOutput =
  typeof GetEntitlementsActiveEntitlementsIdOutput.Type;

// The operation
/**
 * Retrieve an active entitlement
 *
 * <p>Retrieve an active entitlement</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - The ID of the entitlement.
 */
export const GetEntitlementsActiveEntitlementsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetEntitlementsActiveEntitlementsIdInput,
    outputSchema: GetEntitlementsActiveEntitlementsIdOutput,
  }));
