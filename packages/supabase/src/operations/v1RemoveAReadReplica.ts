import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RemoveAReadReplicaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    database_identifier: Schema.String,
  }).pipe(
    T.Http({ method: "POST", path: "/v1/projects/{ref}/read-replicas/remove" }),
  );
export type V1RemoveAReadReplicaInput = typeof V1RemoveAReadReplicaInput.Type;

// Output Schema
export const V1RemoveAReadReplicaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RemoveAReadReplicaOutput = typeof V1RemoveAReadReplicaOutput.Type;

// The operation
/**
 * [Beta] Remove a read replica
 *
 * @param ref - Project ref
 */
export const v1RemoveAReadReplica = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1RemoveAReadReplicaInput,
    outputSchema: V1RemoveAReadReplicaOutput,
  }),
);
