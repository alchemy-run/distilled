import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListControlPlaneIpAddressesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/unauth/controlPlaneIPAddresses",
    }),
  );
export type ListControlPlaneIpAddressesInput =
  typeof ListControlPlaneIpAddressesInput.Type;

// Output Schema
export const ListControlPlaneIpAddressesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListControlPlaneIpAddressesOutput =
  typeof ListControlPlaneIpAddressesOutput.Type;

// The operation
/**
 * Return All Control Plane IP Addresses
 *
 * Returns all control plane IP addresses.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const listControlPlaneIpAddresses = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListControlPlaneIpAddressesInput,
    outputSchema: ListControlPlaneIpAddressesOutput,
  }),
);
