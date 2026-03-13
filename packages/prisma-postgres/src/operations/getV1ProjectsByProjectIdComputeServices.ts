import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ProjectsByProjectIdComputeServicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.PathParam()),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{projectId}/compute-services",
    }),
  );
export type GetV1ProjectsByProjectIdComputeServicesInput =
  typeof GetV1ProjectsByProjectIdComputeServicesInput.Type;

// Output Schema
export const GetV1ProjectsByProjectIdComputeServicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
    ),
    pagination: Schema.Struct({
      nextCursor: Schema.NullOr(Schema.String),
      hasMore: Schema.Boolean,
    }),
  });
export type GetV1ProjectsByProjectIdComputeServicesOutput =
  typeof GetV1ProjectsByProjectIdComputeServicesOutput.Type;

// The operation
/**
 * List compute services for a project
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns all compute services belonging to a project, ordered by creation time (oldest first). Supports cursor-based pagination.
 */
export const getV1ProjectsByProjectIdComputeServices =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1ProjectsByProjectIdComputeServicesInput,
    outputSchema: GetV1ProjectsByProjectIdComputeServicesOutput,
  }));
