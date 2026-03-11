import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1PatchNetworkRestrictionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    add: Schema.optional(
      Schema.Struct({
        dbAllowedCidrs: Schema.optional(Schema.Array(Schema.String)),
        dbAllowedCidrsV6: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    remove: Schema.optional(
      Schema.Struct({
        dbAllowedCidrs: Schema.optional(Schema.Array(Schema.String)),
        dbAllowedCidrsV6: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/projects/{ref}/network-restrictions",
    }),
  );
export type V1PatchNetworkRestrictionsInput =
  typeof V1PatchNetworkRestrictionsInput.Type;

// Output Schema
export const V1PatchNetworkRestrictionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    entitlement: Schema.Literals(["disallowed", "allowed"]),
    config: Schema.Struct({
      dbAllowedCidrs: Schema.optional(
        Schema.Array(
          Schema.Struct({
            address: Schema.String,
            type: Schema.Literals(["v4", "v6"]),
          }),
        ),
      ),
    }),
    old_config: Schema.optional(
      Schema.Struct({
        dbAllowedCidrs: Schema.optional(
          Schema.Array(
            Schema.Struct({
              address: Schema.String,
              type: Schema.Literals(["v4", "v6"]),
            }),
          ),
        ),
      }),
    ),
    updated_at: Schema.optional(Schema.String),
    applied_at: Schema.optional(Schema.String),
    status: Schema.Literals(["stored", "applied"]),
  });
export type V1PatchNetworkRestrictionsOutput =
  typeof V1PatchNetworkRestrictionsOutput.Type;

// The operation
/**
 * [Alpha] Updates project's network restrictions by adding or removing CIDRs
 *
 * @param ref - Project ref
 */
export const v1PatchNetworkRestrictions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1PatchNetworkRestrictionsInput,
    outputSchema: V1PatchNetworkRestrictionsOutput,
  }),
);
