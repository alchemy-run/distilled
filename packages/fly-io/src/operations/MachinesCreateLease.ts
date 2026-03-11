import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesCreateLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    description: Schema.optional(Schema.String),
    ttl: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apps/{app_name}/machines/{machine_id}/lease",
    }),
  );
export type MachinesCreateLeaseInput = typeof MachinesCreateLeaseInput.Type;

// Output Schema
export const MachinesCreateLeaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.optional(Schema.String),
    expires_at: Schema.optional(Schema.Number),
    nonce: Schema.optional(Schema.String),
    owner: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  });
export type MachinesCreateLeaseOutput = typeof MachinesCreateLeaseOutput.Type;

// The operation
/**
 * Create Lease
 *
 * Create a lease for a specific Machine within an app using the details provided in the request body. Machine leases can be used to obtain an exclusive lock on modifying a Machine.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param fly-machine-lease-nonce - Existing lease nonce to refresh by ttl, empty or non-existent to create a new lease
 */
export const MachinesCreateLease = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesCreateLeaseInput,
  outputSchema: MachinesCreateLeaseOutput,
}));
