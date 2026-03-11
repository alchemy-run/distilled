import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpgradeGroupClusterTenantUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/clusters/tenantUpgrade",
    }),
  );
export type UpgradeGroupClusterTenantUpgradeInput =
  typeof UpgradeGroupClusterTenantUpgradeInput.Type;

// Output Schema
export const UpgradeGroupClusterTenantUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpgradeGroupClusterTenantUpgradeOutput =
  typeof UpgradeGroupClusterTenantUpgradeOutput.Type;

// The operation
/**
 * Upgrade One Shared-Tier Cluster
 *
 * Upgrades a shared-tier cluster to a Flex or Dedicated (M10+) cluster in the specified project. To use this resource, the requesting Service Account or API Key must have the Project Cluster Manager role. Each project supports up to 25 clusters.
 * This endpoint can also be used to upgrade Flex clusters that were created using the [Create Cluster](https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Clusters/operation/createCluster) API or former M2/M5 clusters that have been migrated to Flex clusters, using `instanceSizeName` to “M2” or “M5” until January 2026. This functionality will be available until January 22, 2026, after which it will only be available for M0 clusters. Please use the Upgrade Flex Cluster endpoint instead.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const upgradeGroupClusterTenantUpgrade =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpgradeGroupClusterTenantUpgradeInput,
    outputSchema: UpgradeGroupClusterTenantUpgradeOutput,
  }));
