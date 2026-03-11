import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetNetworkRestrictionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/network-restrictions" }),
  );
export type V1GetNetworkRestrictionsInput =
  typeof V1GetNetworkRestrictionsInput.Type;

// Output Schema
export const V1GetNetworkRestrictionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    entitlement: Schema.Literals(["disallowed", "allowed"]),
    config: Schema.Struct({
      dbAllowedCidrs: Schema.optional(Schema.Array(Schema.String)),
      dbAllowedCidrsV6: Schema.optional(Schema.Array(Schema.String)),
    }),
    old_config: Schema.optional(
      Schema.Struct({
        dbAllowedCidrs: Schema.optional(Schema.Array(Schema.String)),
        dbAllowedCidrsV6: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    status: Schema.Literals(["stored", "applied"]),
    updated_at: Schema.optional(Schema.String),
    applied_at: Schema.optional(Schema.String),
  });
export type V1GetNetworkRestrictionsOutput =
  typeof V1GetNetworkRestrictionsOutput.Type;

// The operation
/**
 * [Beta] Gets project's network restrictions
 *
 * @param ref - Project ref
 */
export const v1GetNetworkRestrictions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetNetworkRestrictionsInput,
    outputSchema: V1GetNetworkRestrictionsOutput,
  }),
);
