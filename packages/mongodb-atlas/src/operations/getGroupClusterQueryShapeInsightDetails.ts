import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupClusterQueryShapeInsightDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    queryShapeHash: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    since: Schema.optional(Schema.Number),
    until: Schema.optional(Schema.Number),
    processIds: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapeInsights/{queryShapeHash}/details",
    }),
  );
export type GetGroupClusterQueryShapeInsightDetailsInput =
  typeof GetGroupClusterQueryShapeInsightDetailsInput.Type;

// Output Schema
export const GetGroupClusterQueryShapeInsightDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupClusterQueryShapeInsightDetailsOutput =
  typeof GetGroupClusterQueryShapeInsightDetailsOutput.Type;

// The operation
/**
 * Return Query Shape Details
 *
 * Returns the metadata and statistics summary for a given query shape hash.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param since - Date and time from which to retrieve query shape statistics. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you don't specify the **until** parameter, the endpoint returns data covering from the **since** value and the current time.
- If you specify neither the **since** nor the **until** parameters, the endpoint returns data from the previous 24 hours.
 * @param until - Date and time up until which to retrieve query shape statistics. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you specify the **until** parameter, you must specify the **since** parameter.
- If you specify neither the **since** nor the **until** parameters, the endpoint returns data from the previous 24 hours.
 * @param processIds - Process IDs from which to retrieve query shape statistics. A `processId` is a combination of host and port that serves the MongoDB process. The host must be the hostname, FQDN, IPv4 address, or IPv6 address of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests. To include multiple `processIds`, pass the parameter multiple times delimited with an ampersand (`&`) between each `processId`.
 * @param queryShapeHash - A SHA256 hash of a query shape, output by MongoDB commands like `$queryStats` and `$explain` or slow query logs.
 */
export const getGroupClusterQueryShapeInsightDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupClusterQueryShapeInsightDetailsInput,
    outputSchema: GetGroupClusterQueryShapeInsightDetailsOutput,
  }));
