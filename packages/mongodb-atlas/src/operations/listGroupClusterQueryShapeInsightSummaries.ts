import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClusterQueryShapeInsightSummariesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    since: Schema.optional(Schema.Number),
    until: Schema.optional(Schema.Number),
    processIds: Schema.optional(Schema.String),
    namespaces: Schema.optional(Schema.String),
    commands: Schema.optional(Schema.String),
    nSummaries: Schema.optional(Schema.Number),
    series: Schema.optional(Schema.String),
    queryShapeHashes: Schema.optional(Schema.String),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapeInsights/summaries",
    }),
  );
export type ListGroupClusterQueryShapeInsightSummariesInput =
  typeof ListGroupClusterQueryShapeInsightSummariesInput.Type;

// Output Schema
export const ListGroupClusterQueryShapeInsightSummariesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClusterQueryShapeInsightSummariesOutput =
  typeof ListGroupClusterQueryShapeInsightSummariesOutput.Type;

// The operation
/**
 * Return Query Statistic Summaries
 *
 * Returns a list of query shape statistics summaries for a given cluster. Query shape statistics provide performance insights about MongoDB queries, helping users identify problematic query patterns and potential optimizations.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param since - Date and time from which to retrieve query shape statistics. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you don't specify the **until** parameter, the endpoint returns data covering from the **since** value and the current time.
- If you specify neither the **since** nor the **until** parameters, the endpoint returns data from the previous 24 hours.
 * @param until - Date and time up until which to retrieve query shape statistics. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you specify the **until** parameter, you must specify the **since** parameter.
- If you specify neither the **since** nor the **until** parameters, the endpoint returns data from the previous 24 hours.
 * @param processIds - Process IDs from which to retrieve query shape statistics. A `processId` is a combination of host and port that serves the MongoDB process. The host must be the hostname, FQDN, IPv4 address, or IPv6 address of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests. To include multiple `processId`, pass the parameter multiple times delimited with an ampersand (`&`) between each `processId`.
 * @param namespaces - Namespaces from which to retrieve query shape statistics. A namespace consists of one database and one collection resource written as `.`: `<database>.<collection>`. To include multiple namespaces, pass the parameter multiple times delimited with an ampersand (`&`) between each namespace. Omit this parameter to return results for all namespaces.
 * @param commands - Retrieve query shape statistics matching specified MongoDB commands. To include multiple commands, pass the parameter multiple times delimited with an ampersand (`&`) between each command. The currently supported parameters are find, distinct, and aggregate. Omit this parameter to return results for all supported commands.
 * @param nSummaries - Maximum number of query statistic summaries to return.
 * @param series - Query shape statistics data series to retrieve. A series represents a specific metric about query execution. To include multiple series, pass the parameter multiple times delimited with an ampersand (`&`) between each series. Omit this parameter to return results for all available series.
 * @param queryShapeHashes - A list of SHA256 hashes of desired query shapes, output by MongoDB commands like `$queryStats` and $explain or slow query logs. To include multiple series, pass the parameter multiple times delimited with an ampersand (`&`) between each series. Omit this parameter to return results for all available series.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const listGroupClusterQueryShapeInsightSummaries =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupClusterQueryShapeInsightSummariesInput,
    outputSchema: ListGroupClusterQueryShapeInsightSummariesOutput,
  }));
