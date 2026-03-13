import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ComputeServicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    projectId: Schema.String,
  }).pipe(T.Http({ method: "POST", path: "/v1/compute-services" }));
export type PostV1ComputeServicesInput = typeof PostV1ComputeServicesInput.Type;

// Output Schema
export const PostV1ComputeServicesOutput =
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
export type PostV1ComputeServicesOutput =
  typeof PostV1ComputeServicesOutput.Type;

// The operation
/**
 * Create compute service
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Creates a new compute service under the specified project. The `projectId` is required in the request body. The service is placed in the given region (or the default region if omitted).
 */
export const postV1ComputeServices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV1ComputeServicesInput,
    outputSchema: PostV1ComputeServicesOutput,
  }),
);
