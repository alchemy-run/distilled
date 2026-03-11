import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesUncordonInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/machines/{machine_id}/uncordon",
  }),
);
export type MachinesUncordonInput = typeof MachinesUncordonInput.Type;

// Output Schema
export const MachinesUncordonOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesUncordonOutput = typeof MachinesUncordonOutput.Type;

// The operation
/**
 * Uncordon Machine
 *
 * “Cordoning” a Machine refers to disabling its services, so the Fly Proxy won’t route requests to it. In flyctl this is used by blue/green deployments; one set of Machines is started up with services disabled, and when they are all healthy, the services are enabled on the new Machines and disabled on the old ones.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesUncordon = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesUncordonInput,
  outputSchema: MachinesUncordonOutput,
}));
