import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ProjectsByProjectIdComputeServicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.PathParam()),
    displayName: Schema.String,
    regionId: Schema.optional(
      Schema.Literals([
        "us-east-1",
        "us-west-1",
        "eu-west-3",
        "eu-central-1",
        "ap-northeast-1",
        "ap-southeast-1",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{projectId}/compute-services",
    }),
  );
export type PostV1ProjectsByProjectIdComputeServicesInput =
  typeof PostV1ProjectsByProjectIdComputeServicesInput.Type;

// Output Schema
export const PostV1ProjectsByProjectIdComputeServicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      url: Schema.String,
      name: Schema.String,
      region: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
      }),
      projectId: Schema.String,
      latestVersionId: Schema.NullOr(Schema.String),
      createdAt: Schema.String,
    }),
  });
export type PostV1ProjectsByProjectIdComputeServicesOutput =
  typeof PostV1ProjectsByProjectIdComputeServicesOutput.Type;

// The operation
/**
 * Create compute service
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Creates a new compute service under the specified project. The service is placed in the given region (or the default region if omitted).
 */
export const postV1ProjectsByProjectIdComputeServices =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1ProjectsByProjectIdComputeServicesInput,
    outputSchema: PostV1ProjectsByProjectIdComputeServicesOutput,
  }));
