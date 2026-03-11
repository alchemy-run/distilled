import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SetGroupLimitInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  limitName: Schema.Literals([
    "atlas.project.security.databaseAccess.users",
    "atlas.project.deployment.clusters",
    "atlas.project.deployment.serverlessMTMs",
    "atlas.project.security.databaseAccess.customRoles",
    "atlas.project.security.networkAccess.entries",
    "atlas.project.security.networkAccess.crossRegionEntries",
    "atlas.project.deployment.nodesPerPrivateLinkRegion",
    "dataFederation.bytesProcessed.query",
    "dataFederation.bytesProcessed.daily",
    "dataFederation.bytesProcessed.weekly",
    "dataFederation.bytesProcessed.monthly",
    "atlas.project.deployment.privateServiceConnectionsPerRegionGroup",
    "atlas.project.deployment.privateServiceConnectionsSubnetMask",
  ]).pipe(T.PathParam()),
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/api/atlas/v2/groups/{groupId}/limits/{limitName}",
  }),
);
export type SetGroupLimitInput = typeof SetGroupLimitInput.Type;

// Output Schema
export const SetGroupLimitOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SetGroupLimitOutput = typeof SetGroupLimitOutput.Type;

// The operation
/**
 * Set One Project Limit
 *
 * Sets the specified project limit. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 * **NOTE**: Increasing the following configuration limits might lead to slower response times in the MongoDB Cloud UI or increased user management overhead leading to authentication or authorization re-architecture. If possible, we recommend that you create additional projects to gain access to more of these resources for a more sustainable growth pattern.
 *
 * @param limitName - Human-readable label that identifies this project limit.

| Limit Name | Description | Default | API Override Limit |
| --- | --- | --- | --- |
| `atlas.project.deployment.clusters` | Limit on the number of clusters in this project | 25 | 100 |
| `atlas.project.deployment.nodesPerPrivateLinkRegion` | Limit on the number of nodes per Private Link region in this project | 50 | 90 |
| `atlas.project.security.databaseAccess.customRoles` | Limit on the number of custom roles in this project | 100 | 1400 |
| `atlas.project.security.databaseAccess.users` | Limit on the number of database users in this project | 100 | 100 |
| `atlas.project.security.networkAccess.crossRegionEntries` | Limit on the number of cross-region network access entries in this project | 40 | 220 |
| `atlas.project.security.networkAccess.entries` | Limit on the number of network access entries in this project | 200 | 20 |
| `dataFederation.bytesProcessed.query` | Limit on the number of bytes processed during a single Data Federation query | N/A | N/A |
| `dataFederation.bytesProcessed.daily` | Limit on the number of bytes processed across all Data Federation tenants for the current day | N/A | N/A |
| `dataFederation.bytesProcessed.weekly` | Limit on the number of bytes processed across all Data Federation tenants for the current week | N/A | N/A |
| `dataFederation.bytesProcessed.monthly` | Limit on the number of bytes processed across all Data Federation tenants for the current month | N/A | N/A |
| `atlas.project.deployment.privateServiceConnectionsPerRegionGroup` | Number of Private Service Connections per Region Group | 50 | 100|
| `atlas.project.deployment.privateServiceConnectionsSubnetMask` | Subnet mask for GCP PSC Networks. Has lower limit of 20. | 27 | 27|

 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const setGroupLimit = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SetGroupLimitInput,
  outputSchema: SetGroupLimitOutput,
}));
