import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupProcessPerformanceAdvisorSlowQueryLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    duration: Schema.optional(Schema.Number),
    namespaces: Schema.optional(Schema.String),
    nLogs: Schema.optional(Schema.Number),
    since: Schema.optional(Schema.Number),
    includeMetrics: Schema.optional(Schema.Boolean),
    includeReplicaState: Schema.optional(Schema.Boolean),
    includeOpType: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/slowQueryLogs",
    }),
  );
export type ListGroupProcessPerformanceAdvisorSlowQueryLogsInput =
  typeof ListGroupProcessPerformanceAdvisorSlowQueryLogsInput.Type;

// Output Schema
export const ListGroupProcessPerformanceAdvisorSlowQueryLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupProcessPerformanceAdvisorSlowQueryLogsOutput =
  typeof ListGroupProcessPerformanceAdvisorSlowQueryLogsOutput.Type;

// The operation
/**
 * Return Slow Queries
 *
 * Returns log lines for slow queries that the Performance Advisor and Query Profiler identified. The Performance Advisor monitors queries that MongoDB considers slow and suggests new indexes to improve query performance. MongoDB Cloud bases the threshold for slow queries on the average time of operations on your cluster. This enables workload-relevant recommendations. To use this resource, the requesting Service Account or API Key must have any Project Data Access role or the Project Observability Viewer role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param duration - Length of time expressed during which the query finds slow queries among the managed namespaces in the cluster. This parameter expresses its value in milliseconds.

- If you don't specify the **since** parameter, the endpoint returns data covering the duration before the current time.
- If you specify neither the **duration** nor **since** parameters, the endpoint returns data from the previous 24 hours.
 * @param namespaces - Namespaces from which to retrieve slow queries. A namespace consists of one database and one collection resource written as `.`: `<database>.<collection>`. To include multiple namespaces, pass the parameter multiple times delimited with an ampersand (`&`) between each namespace. Omit this parameter to return results for all namespaces.
 * @param nLogs - Maximum number of lines from the log to return.
 * @param processId - Combination of host and port that serves the MongoDB process. The host must be the hostname, FQDN, IPv4 address, or IPv6 address of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests.
 * @param since - Date and time from which the query retrieves the slow queries. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you don't specify the **duration** parameter, the endpoint returns data covering from the **since** value and the current time.
- If you specify neither the **duration** nor the **since** parameters, the endpoint returns data from the previous 24 hours.
 * @param includeMetrics - Whether or not to include metrics extracted from the slow query log as separate fields.
 * @param includeReplicaState - Whether or not to include the replica state of the host when the slow query log was generated as a separate field.
 * @param includeOpType - Whether or not to include the operation type (read/write/command) extracted from the slow query log as a separate field.
 */
export const listGroupProcessPerformanceAdvisorSlowQueryLogs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupProcessPerformanceAdvisorSlowQueryLogsInput,
    outputSchema: ListGroupProcessPerformanceAdvisorSlowQueryLogsOutput,
  }));
