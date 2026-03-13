/**
 * Azure Mariadb API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ServersStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMariaDB/servers/{serverName}/start",
  }),
);
export type ServersStartInput = typeof ServersStartInput.Type;

// Output Schema
export const ServersStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersStartOutput = typeof ServersStartOutput.Type;

// The operation
/**
 * Starts a stopped server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersStartInput,
  outputSchema: ServersStartOutput,
}));
// Input Schema
export const ServersStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMariaDB/servers/{serverName}/stop",
  }),
);
export type ServersStopInput = typeof ServersStopInput.Type;

// Output Schema
export const ServersStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersStopOutput = typeof ServersStopOutput.Type;

// The operation
/**
 * Stops a running server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServersStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersStopInput,
  outputSchema: ServersStopOutput,
}));
