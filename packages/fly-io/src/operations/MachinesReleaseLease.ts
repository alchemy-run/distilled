import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesReleaseLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apps/{app_name}/machines/{machine_id}/lease",
    }),
  );
export type MachinesReleaseLeaseInput = typeof MachinesReleaseLeaseInput.Type;

// Output Schema
export const MachinesReleaseLeaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesReleaseLeaseOutput = typeof MachinesReleaseLeaseOutput.Type;

// The operation
/**
 * Release Lease
 *
 * Release the lease of a specific Machine within an app. Machine leases can be used to obtain an exclusive lock on modifying a Machine.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param fly-machine-lease-nonce - Existing lease nonce
 */
export const MachinesReleaseLease = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesReleaseLeaseInput,
    outputSchema: MachinesReleaseLeaseOutput,
  }),
);
