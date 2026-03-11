import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupDataFederationLimitInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    tenantName: Schema.String.pipe(T.PathParam()),
    limitName: Schema.Literals([
      "bytesProcessed.query",
      "bytesProcessed.daily",
      "bytesProcessed.weekly",
      "bytesProcessed.monthly",
    ]).pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}",
    }),
  );
export type GetGroupDataFederationLimitInput =
  typeof GetGroupDataFederationLimitInput.Type;

// Output Schema
export const GetGroupDataFederationLimitOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupDataFederationLimitOutput =
  typeof GetGroupDataFederationLimitOutput.Type;

// The operation
/**
 * Return One Federated Database Instance Query Limit for One Project
 *
 * Returns the details of one query limit for the specified federated database instance in the specified project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param tenantName - Human-readable label that identifies the federated database instance to which the query limit applies.
 * @param limitName - Human-readable label that identifies this data federation instance limit.

| Limit Name | Description | Default |
| --- | --- | --- |
| `bytesProcessed.query` | Limit on the number of bytes processed during a single data federation query | N/A |
| `bytesProcessed.daily` | Limit on the number of bytes processed for the data federation instance for the current day | N/A |
| `bytesProcessed.weekly` | Limit on the number of bytes processed for the data federation instance for the current week | N/A |
| `bytesProcessed.monthly` | Limit on the number of bytes processed for the data federation instance for the current month | N/A |

 */
export const getGroupDataFederationLimit = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupDataFederationLimitInput,
    outputSchema: GetGroupDataFederationLimitOutput,
  }),
);
