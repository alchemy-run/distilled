import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllNetworkBansInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/network-bans/retrieve",
    }),
  );
export type V1ListAllNetworkBansInput = typeof V1ListAllNetworkBansInput.Type;

// Output Schema
export const V1ListAllNetworkBansOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    banned_ipv4_addresses: Schema.Array(Schema.String),
  });
export type V1ListAllNetworkBansOutput = typeof V1ListAllNetworkBansOutput.Type;

// The operation
/**
 * [Beta] Gets project's network bans
 *
 * @param ref - Project ref
 */
export const v1ListAllNetworkBans = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1ListAllNetworkBansInput,
    outputSchema: V1ListAllNetworkBansOutput,
  }),
);
