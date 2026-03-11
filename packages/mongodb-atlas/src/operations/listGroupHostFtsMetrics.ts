import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupHostFtsMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    processId: Schema.String.pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics",
    }),
  );
export type ListGroupHostFtsMetricsInput =
  typeof ListGroupHostFtsMetricsInput.Type;

// Output Schema
export const ListGroupHostFtsMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupHostFtsMetricsOutput =
  typeof ListGroupHostFtsMetricsOutput.Type;

// The operation
/**
 * Return All Atlas Search Metric Types for One Process
 *
 * Returns all Atlas Search metric types available for one process in the specified project. You must have the Project Read Only or higher role to view the Atlas Search metric types.
 *
 * @param processId - Combination of hostname and IANA port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (mongod or mongos). The port must be the IANA port on which the MongoDB process listens for requests.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const listGroupHostFtsMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListGroupHostFtsMetricsInput,
    outputSchema: ListGroupHostFtsMetricsOutput,
  }),
);
