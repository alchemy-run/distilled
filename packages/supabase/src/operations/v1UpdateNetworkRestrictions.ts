import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateNetworkRestrictionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    dbAllowedCidrs: Schema.optional(Schema.Array(Schema.String)),
    dbAllowedCidrsV6: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/network-restrictions/apply",
    }),
  );
export type V1UpdateNetworkRestrictionsInput =
  typeof V1UpdateNetworkRestrictionsInput.Type;

// Output Schema
export const V1UpdateNetworkRestrictionsOutput =
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
export type V1UpdateNetworkRestrictionsOutput =
  typeof V1UpdateNetworkRestrictionsOutput.Type;

// The operation
/**
 * [Beta] Updates project's network restrictions
 *
 * @param ref - Project ref
 */
export const v1UpdateNetworkRestrictions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateNetworkRestrictionsInput,
    outputSchema: V1UpdateNetworkRestrictionsOutput,
  }),
);
