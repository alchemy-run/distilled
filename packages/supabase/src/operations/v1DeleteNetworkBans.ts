import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteNetworkBansInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    ipv4_addresses: Schema.Array(Schema.String),
    requester_ip: Schema.optional(Schema.Boolean),
    identifier: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "DELETE", path: "/v1/projects/{ref}/network-bans" }),
  );
export type V1DeleteNetworkBansInput = typeof V1DeleteNetworkBansInput.Type;

// Output Schema
export const V1DeleteNetworkBansOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DeleteNetworkBansOutput = typeof V1DeleteNetworkBansOutput.Type;

// The operation
/**
 * [Beta] Remove network bans.
 *
 * @param ref - Project ref
 */
export const v1DeleteNetworkBans = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeleteNetworkBansInput,
  outputSchema: V1DeleteNetworkBansOutput,
}));
