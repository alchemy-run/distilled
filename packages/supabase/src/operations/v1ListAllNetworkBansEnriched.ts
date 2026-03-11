import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllNetworkBansEnrichedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/network-bans/retrieve/enriched",
    }),
  );
export type V1ListAllNetworkBansEnrichedInput =
  typeof V1ListAllNetworkBansEnrichedInput.Type;

// Output Schema
export const V1ListAllNetworkBansEnrichedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    banned_ipv4_addresses: Schema.Array(
      Schema.Struct({
        banned_address: Schema.String,
        identifier: Schema.String,
        type: Schema.String,
      }),
    ),
  });
export type V1ListAllNetworkBansEnrichedOutput =
  typeof V1ListAllNetworkBansEnrichedOutput.Type;

// The operation
/**
 * [Beta] Gets project's network bans with additional information about which databases they affect
 *
 * @param ref - Project ref
 */
export const v1ListAllNetworkBansEnriched =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1ListAllNetworkBansEnrichedInput,
    outputSchema: V1ListAllNetworkBansEnrichedOutput,
  }));
