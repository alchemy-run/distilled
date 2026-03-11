import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClusterPerformanceAdvisorSuggestedIndexesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    processIds: Schema.optional(Schema.String),
    namespaces: Schema.optional(Schema.String),
    since: Schema.optional(Schema.Number),
    until: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/suggestedIndexes",
    }),
  );
export type ListGroupClusterPerformanceAdvisorSuggestedIndexesInput =
  typeof ListGroupClusterPerformanceAdvisorSuggestedIndexesInput.Type;

// Output Schema
export const ListGroupClusterPerformanceAdvisorSuggestedIndexesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClusterPerformanceAdvisorSuggestedIndexesOutput =
  typeof ListGroupClusterPerformanceAdvisorSuggestedIndexesOutput.Type;

// The operation
/**
 * Return All Suggested Indexes
 *
 * Returns the indexes that the Performance Advisor suggests. The Performance Advisor monitors queries that MongoDB considers slow and suggests new indexes to improve query performance. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param processIds - Process IDs from which to retrieve suggested indexes. A `processId` is a combination of host and port that serves the MongoDB process. The host must be the hostname, FQDN, IPv4 address, or IPv6 address of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests. To include multiple `processIds`, pass the parameter multiple times delimited with an ampersand (`&`) between each `processId`.
 * @param namespaces - Namespaces from which to retrieve suggested indexes. A namespace consists of one database and one collection resource written as `.`: `<database>.<collection>`. To include multiple namespaces, pass the parameter multiple times delimited with an ampersand (`&`) between each namespace. Omit this parameter to return results for all namespaces.
 * @param since - Date and time from which the query retrieves the suggested indexes. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you don't specify the **until** parameter, the endpoint returns data covering from the **since** value and the current time.
- If you specify neither the **since** nor the **until** parameters, the endpoint returns data from the previous 24 hours.
 * @param until - Date and time up until which the query retrieves the suggested indexes. This parameter expresses its value in the number of milliseconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).

- If you specify the **until** parameter, you must specify the **since** parameter.
- If you specify neither the **since** nor the **until** parameters, the endpoint returns data from the previous 24 hours.
 */
export const listGroupClusterPerformanceAdvisorSuggestedIndexes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupClusterPerformanceAdvisorSuggestedIndexesInput,
    outputSchema: ListGroupClusterPerformanceAdvisorSuggestedIndexesOutput,
  }));
