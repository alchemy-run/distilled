import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1SetupAReadReplicaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    read_replica_region: Schema.Literals([
      "us-east-1",
      "us-east-2",
      "us-west-1",
      "us-west-2",
      "ap-east-1",
      "ap-southeast-1",
      "ap-northeast-1",
      "ap-northeast-2",
      "ap-southeast-2",
      "eu-west-1",
      "eu-west-2",
      "eu-west-3",
      "eu-north-1",
      "eu-central-1",
      "eu-central-2",
      "ca-central-1",
      "ap-south-1",
      "sa-east-1",
    ]),
  }).pipe(
    T.Http({ method: "POST", path: "/v1/projects/{ref}/read-replicas/setup" }),
  );
export type V1SetupAReadReplicaInput = typeof V1SetupAReadReplicaInput.Type;

// Output Schema
export const V1SetupAReadReplicaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1SetupAReadReplicaOutput = typeof V1SetupAReadReplicaOutput.Type;

// The operation
/**
 * [Beta] Set up a read replica
 *
 * @param ref - Project ref
 */
export const v1SetupAReadReplica = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1SetupAReadReplicaInput,
  outputSchema: V1SetupAReadReplicaOutput,
}));
